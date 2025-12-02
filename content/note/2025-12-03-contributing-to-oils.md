+++
title = "Contributing to Oils0"
date = 2025-11-15
description = "A simple guide to understanding the Oils project."
+++


This guide gives you a clear and lightweight overview on Oils, and how to get started contributing without getting overwhelmed.


## Table of Contents

* [Prerequisites](#prerequisites)
* [Learning](#learning)
* [Resource](#Resources)


## What is Oils ?

**Oils** is an upgrade path from bash to a better language and runtime.  
It comes in **two shells**, each built for a different kind of user:

<br>


### What are OSH and YSH? 

OSH runs your existing shell scripts. 

**What it does:** 

- **Drop-in replacement** for bash/POSIX shells 
- **Runs existing scripts** without modification 
- **POSIX compatibility** 
- follows bash/dash/mksh behavior 

**Gradual migration path** 
- use it today for your existing bash scripts **Target users:** 
- System administrators with existing shell scripts 
- DevOps engineers maintaining legacy bash code 
- Anyone with a large corpus of shell scripts 
- Projects that need bash compatibility 

**Example:**

```bash
#!/usr/bin/env osh
# Your existing bash script works as-is!
for file in *.txt; do

if [[ -f "$file" ]]; then

echo "Processing $file"
cat "$file" | grep pattern
fi
done
```



### YSH - Yaks Shell (Modern Shell Language) 

YSH has a a faimilar syntax similar with python/javascript so you should have no problem if you are conversant with any of those langugages. 



**What it does:** 
- **Modern shell language** with clean syntax 
- **Data structures** - lists, dicts (not just strings) 
- **Type safety** - reduce errors with static types 
- **Better error handling** - explicit try/catch 
- **Expression-oriented** 
- **Block syntax** - { } for cleaner code organization 

**Target users:** 
- People who find bash syntax confusing 

**Example:**

```bash
#!/usr/bin/env ysh

echo 'Variable and Expressions'
const name = 'YSH User'
var x = 10
setvar x = x * 2 + 5

echo "Hello $name!"
echo "x + 10 = $[x + 10]"
echo "Command sub: $(echo hi)"
echo ''


echo 'Data Structures (Lists & Dicts)'
var mylist = [x, 'foo', 'bar']
var person = {name: 'Alice', age: 30}

for i, item in (mylist) {
  echo "  List[$i]: $item"
}
echo ''


echo 'Expression-based Control Flow'
if (person.age > 20 and x > 20) {
  echo "  $[person.name] is over 20 and x is over 20."
}
echo ''


echo 'Shell-like proc (Procedure)'
proc greet (name_str) {
  echo "  Proc says: Hello, $name_str"
}
greet 'World'
echo ''


echo 'Python-like func (Function)'
func multiply (a, b) {
  return (a * b)
}
echo "  Func says: 5 * 7 = $[multiply(5, 7)]"
echo ''



echo "$[ENV.PWD]"
echo ''


echo 'Built-in JSON Handling'
echo "  Writing 'person' dict to JSON:"
json write (person)
```



## Prerequisites 

Oils is written in Python, and you'll be reading/writing Python code daily.

- [] A good understanding of python
- [] A Good understanding of how Lexers, parsers, and interpreters works in a practical context


### Learning
- Book: "Crafting Interpreters" by Robert Nystrom - Best intro to parsers
- Tutorial: [Let's Build a Simple Interpreter](https://ruslanspivak.com/lsbasi-part1/)
- Book: "The Linux Programming Interface" - Unix process management



### Getting Started: The 5-Minute Setup

### installation

You'll need:
- Python2
- Git
- Basic command-line knowledge
- A Linux machine (or WSL on Windows)


### Quick Setup

```bash
# 1. Clone the repository
git clone https://github.com/oils-for-unix/oils.git
cd oils

# Install system dependencies (choose your distro)
build/deps.sh wedge-deps-debian   # Ubuntu/Debian (uses sudo apt-get)
# OR
build/deps.sh wedge-deps-alpine   # Alpine Linux
# OR
build/deps.sh wedge-deps-fedora   # Fedora/RHEL

# Download and build custom tools
build/deps.sh fetch               # Download source tarballs
                                
build/deps.sh install-wedges      # Build and install tools (takes 5-10 min)

# Every time you git pull
. build/dev-shell.sh              # Update PATH with custom Python
build/py.sh all                   # Regenerate Python code (lexer, help, etc.)


# 3. Try it out!
bin/osh -c 'echo "Hello from OSH!"'
bin/ysh -c 'echo "Hello from YSH!"'

# 4. Test it works
test/spec.sh builtin-echo
```

If this doesn't work, ask on [Zulip](https://oilshell.zulipchat.com/) - we're friendly!



## Understanding the Codebase

### The Big Picture: How Shells Work

Every shell follows this pipeline:

```
Input → Lexer → Parser → AST → Evaluator → Output
  ↓       ↓        ↓      ↓        ↓         ↓
stdin  Tokens  Syntax  Tree  Execution   stdout
```

Let's trace `echo $USER`:

1. **Input**: User types `echo $USER`
2. **Lexer** breaks it into tokens: `[echo]` `[$USER]`
3. **Parser** builds an AST: `Simple(words=['echo', VarSub('USER')])`
4. **Evaluator** looks up `USER` → `'alice'`, then runs `echo alice`
5. **Output**: `alice` printed to stdout

### Directory Structure

The codebase is organized logically:

```
oils/
├── frontend/      # Lexing, tokens (both OSH & YSH)
├── osh/           # OSH-specific parsing & evaluation
├── ysh/           # YSH-specific parsing & evaluation
├── core/          # Shared runtime (process management, state)
├── builtin/       # Built-in commands (cd, echo, trap, etc.)
├── spec/          # Tests comparing Oils to other shells
└── _devbuild/gen/ # Generated code (don't edit!)
```

<br>

**Important**: Universal code (like process management) lives in `core/`. Shell-specific code is in `osh/` or `ysh/`.

<br>

### Key Files to Know

| What | Where |
|------|-------|
| Lexer | `frontend/lexer.py` |
| OSH Parser | `osh/cmd_parse.py`, `osh/word_parse.py` |
| YSH Parser | `ysh/expr_parse.py` |
| Evaluator | `osh/cmd_eval.py`, `osh/word_eval.py` |
| Builtins | `builtin/*.py` |
| Tests | `spec/*.test.sh` |


This is crucial for contributing effectively:

### Universal Code (Both Shells)

- **Location**: `core/`, `frontend/`
- **Purpose**: Process management, lexing, core runtime
- **Example**: `core/process.py` - waiting for child processes

### OSH-Specific Code

- **Location**: `osh/`
- **Purpose**: POSIX compatibility, bash-like syntax
- **Example**: `osh/word_eval.py` - `$var` expansion

### YSH-Specific Code

- **Location**: `ysh/`
- **Purpose**: Modern syntax, new features
- **Example**: `ysh/expr_eval.py` - `var x = 42` expressions



## Resources

### Documentation
- [Main Documentation](https://oils.pub/)
- [GitHub Wiki](https://github.com/oils-for-unix/oils/wiki)
- [Contributing Guide](https://github.com/oils-for-unix/oils/wiki/Contributing)
- [Spec Tests Explained](https://github.com/oils-for-unix/oils/wiki/Spec-Tests)

### Community
- [Zulip Chat](https://oilshell.zulipchat.com/) - Ask questions here!
- [GitHub Issues](https://github.com/oils-for-unix/oils/issues)
- [Blog](https://oils.pub/blog/) - Design discussions and updates


You don't need deep compiler knowledge - just Python skills, curiosity, and willingness to dive deep and learn.

**Ready to contribute?**

1. Join [Zulip](https://oilshell.zulipchat.com/)
2. Check [good first issues](https://github.com/oils-for-unix/oils/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
3. Clone the repo and run setup
4. Ask questions and have fun! 🎉