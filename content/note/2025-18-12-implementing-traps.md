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


## The Design Choice: Why command.NoOp?

The implementation uses `command.NoOp` from the AST to represent ignored signals.

In my initial approach, I tried to add separate handling for ignored signals throughout the codebase - special branches in `_AddTheRest()` for the ignore case, duplicated logic in `AddItem()` to track ignored signals differently, and custom printing code in `_PrintTrapEntry()`. This led to a lot of duplication and made the code harder to follow.

Andy suggested using `command.NoOp` to represent ignored signals, which meant the existing code paths just worked with minimal changes - just check `if handler.tag() == command_e.NoOp` at the critical points. Much simpler! This is a good example of how the right data representation can make the implementation much cleaner.


{% note(header="Note") %}
The code has since been refactored to use `trap_action.Ignored` instead of `command.NoOp` - see commit 6f1c64891.
{% end %}



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

Pull request :: [Solved](https://github.com/oils-for-unix/oils/pull/2586)

