+++
title = "Implementing trap"
date = 2025-12-04
description = "Implementation guide for POSIX-compliant signal ignoring in Oils shell"

[taxonomies]
notet= ["oils"]
+++


Issue :: [Implement trap '' in OSH and trap --ignore in YSH - should be SIG_IGN #2476](https://github.com/oils-for-unix/oils/issues/2476)


`trap` lets you run a command when your script gets a signal from the operating system. Like, when you hit `Ctrl+C`, that sends a `SIGINT` signal to your script. Normally, that would just kill it, but `trap` lets you catch it and do some cleanup before you exit.

E.g.

```bash
#!/bin/bash

trap 'echo "Interrupted!"; exit 1' SIGINT

while true; do
    echo "Running..."
    sleep 2
done

```

This is commonly used in installers, backup scripts, and other tools where interruption could leave the system in a bad state.


## The Problem: `trap ''` is Special

Here's the thing about `trap ''` - it's not intuitive at first glance. You might think an empty string means "do nothing," which sounds like it should behave the same as `trap ' '` (a space) or `trap '# comment'`. But it doesn't!

In POSIX shells, `trap ''` has a very specific meaning: it tells the OS to ignore the signal entirely by setting it to `SIG_IGN`. This is fundamentally different from running an empty command:

- **`trap '' SIGINT`** → Sets signal to `SIG_IGN` (kernel ignores it)
- **`trap ' ' SIGINT`** → Wakes up the shell to execute a space (does nothing, but still wakes up!)
- **`trap '# comment' SIGINT`** → Wakes up the shell to execute a comment

The difference matters for performance and correctness. When a signal is set to `SIG_IGN`, the kernel drops it immediately. When you have a trap handler (even an empty one), the shell has to wake up, check what to do, execute the handler, and resume.

You can verify this by checking `/proc/self/status`. Here's a demo from the Oils test suite:

**Without trap:**
```bash
$ bash test/signal-report.sh report
PID 1339837
SigIgn: QUIT(3)
SigCgt: INT(2) CHLD(17)
```

**With `trap '' SIGUSR2`:**
```bash
$ bash test/signal-report.sh report T
PID 1339865
trap -- '' SIGUSR2

SigIgn: QUIT(3) USR2(12)
SigCgt: HUP(1) INT(2) ILL(4) TRAP(5) ... CHLD(17) ...
```

See how `USR2(12)` appears under `SigIgn` (ignored), not under `SigCgt` (caught)? That's because `trap ''` sets the signal to `SIG_IGN` at the kernel level. This is fundamentally different from catching the signal and executing an empty handler.

### Why Add `trap --ignore`?

While `trap ''` is POSIX-compliant, it's not very clear what it means just by reading the code. Is it ignoring the signal? Resetting it? Setting a default handler?

YSH's `trap --ignore` makes the intent explicit:

```bash
trap --ignore INT  # Clear: we're ignoring the signal (SIG_IGN)
trap '' INT        # Less clear: empty string means... ignore?
```

This explicitness helps future readers understand that we're setting `SIG_IGN`, which is different from `SIG_DFL` (the default handler you get with `trap - INT`).


## The Design Choice: Why command.NoOp?

Once we understand that `trap ''` should set `SIG_IGN`, the question becomes: how do we represent this in the codebase?

### The Evolution

The implementation went through several iterations:

**1. Initial approach: Special handling everywhere**

My first attempt added separate branches for ignored signals throughout the codebase:
- Special branches in `_AddTheRest()` for the ignore case
- Duplicated logic in `AddItem()` to track ignored signals differently
- Custom printing code in `_PrintTrapEntry()`

This worked, but created a lot of duplication. The code got longer and harder to follow.

**2. Using `command.NoOp`**

Andy suggested representing ignored signals as `command.NoOp` from the AST. This made the code much shorter! Instead of special handling everywhere, we just check `if handler.tag() == command_e.NoOp` at the critical points. The existing code paths mostly just worked.

Why does this work? The shell already has `command.NoOp` for representing "do nothing" commands like `sh -c ''` (an empty command). Reusing it for ignored traps seemed natural.

**3. The bug with `command.IgnoredTrap`**

At one point, we tried `command.IgnoredTrap` instead - the reasoning being that we shouldn't use the same enum for two different things (`command.NoOp` for both empty commands and ignored traps).

But this introduced a bug! In some code paths, we would try to execute `command.IgnoredTrap` as if it were a normal command. Using the same type for two semantically different things caused confusion.

**4. Final solution: `trap_action.Ignored`**

The final refactoring introduced a new algebraic data type `trap_action`:

```python
trap_action =
  Ignored           # SIG_IGN
  | Command(command c)
```

This makes it explicit in the type system: a trap action is either "ignored" or "runs a command." No confusion possible! The type system enforces that we handle both cases correctly.

{% note(header="Note") %}
This post describes the implementation using `command.NoOp` (PR #2586), but the code has since been refactored to use `trap_action.Ignored` - see commit 6f1c64891. The refactoring makes the intent even clearer in the type system.
{% end %}

### Why Algebraic Data Types?

This evolution shows why Oils uses algebraic data types (ADTs) extensively. Instead of having `if` statements scattered throughout the code checking "is this an ignored trap?", we put that distinction into the data representation itself.

As Andy puts it: "the if statements are in data, rather than code" - which makes the code shorter and harder to misuse. The type checker enforces that you handle both `Ignored` and `Command(c)` cases, preventing bugs like the `command.IgnoredTrap` issue above.



## How It Works Under the Hood

### The Core Logic

Here's what happens in `TrapState.AddUserTrap()` when you set a trap:

```python
def AddUserTrap(self, sig_num, handler):
    # type: (int, command_t) -> None
    """ e.g. SIGUSR1 """
    self.traps[sig_num] = handler

    if handler.tag() == command_e.NoOp:
        # trap '' SIGINT - ignore the signal (SIG_IGN)
        # For signal_safe, this is handled the same as trap -
        if sig_num == SIGINT:
            self.signal_safe.SetSigIntTrapped(False)
        elif sig_num == SIGWINCH:
            self.signal_safe.SetSigWinchCode(iolib.UNTRAPPED_SIGWINCH)
        else:
            iolib.sigaction(sig_num, SIG_IGN)  # Actually set SIG_IGN!
    else:
        # Normal trap handler
        if sig_num == SIGINT:
            self.signal_safe.SetSigIntTrapped(True)
        elif sig_num == SIGWINCH:
            self.signal_safe.SetSigWinchCode(SIGWINCH)
        else:
            iolib.RegisterSignalInterest(sig_num)
```

The key insight: I check if the handler is a NoOp, and if so, call `iolib.sigaction(sig_num, SIG_IGN)` to actually ignore the signal at the OS level.

### Why SIGINT and SIGWINCH Are Special

SIGINT and SIGWINCH need special handling because the shell interpreter itself cares about them:

- **SIGINT** - For handling Ctrl-C / KeyboardInterrupt
  - CPython has built-in handling for this
  - mycpp runtime calls `RegisterSignalInterest(SIGINT)` and polls with `PollSigInt()` in the main loop

- **SIGWINCH** - For terminal resize events that affect line editing

Here's something interesting: when you do `trap '' SIGINT`, the `signal_safe` calls look the same as `trap - SIGINT` (both call `SetSigIntTrapped(False)`). But the behavior is different:
- `trap -` removes the entry from `self.traps` → signal reverts to SIG_DFL
- `trap ''` stores NoOp in `self.traps` → signal set to SIG_IGN

The shell needs to track SIGINT/SIGWINCH separately from user traps, so this dual handling makes sense.

### Displaying Trap State

When you run `trap -p`, I modified `_PrintTrapEntry()` to show ignored signals correctly:

```python
def _PrintTrapEntry(self, handler, name):
    if handler.tag() == command_e.NoOp:
        print("trap -- '' %s" % name)  # Show as empty string
    else:
        code = self._GetCommandSourceCode(handler)
        print("trap -- %s %s" % (j8_lite.ShellEncode(code), name))
```

This way `trap -p` shows `trap -- '' SIGINT` for ignored signals, which you can copy-paste to restore the same state.

## What I Added

The implementation required changes in a few key places:

**1. Empty string detection** (builtin/trap_osh.py:420):

When the first argument to `trap` is an empty string, treat it as a signal to ignore:

```python
if len(first_arg) == 0:
    return self._AddTheRest(arg_r, command.NoOp)
```

**2. YSH `--ignore` flag** (builtin/trap_osh.py:378):

For the more explicit YSH syntax, I added a `--ignore` flag that does the same thing:

```python
if arg.ignore:  # trap --ignore
    return self._AddTheRest(arg_r, command.NoOp, allow_legacy=False)
```


## Demo

Try it in OSH (POSIX-compatible):

```bash
$ bin/osh -c "trap '' INT; trap -p"
trap -- '' SIGINT

$ bin/osh -c "trap '' USR1 USR2; trap -p"
trap -- '' SIGUSR1
trap -- '' SIGUSR2
```

Or in YSH (modern syntax):

```bash
$ bin/ysh -c "trap --ignore INT; trap -p"
trap -- '' SIGINT
```

Pull request :: [link](https://github.com/oils-for-unix/oils/pull/2586)

