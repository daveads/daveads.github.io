+++
title = "Implementing GLOBIGNORE"
date = 2026-01-26
description = "Implementation guide for bash-compatible GLOBIGNORE in Oils shell"

[taxonomies]
notet= ["oils"]
+++


Issue :: [Implement GLOBIGNORE #609](https://github.com/oils-for-unix/oils/issues/609)


`GLOBIGNORE` is a bash-specific variable that lets you exclude files from glob expansion. It contains a colon-separated list of patterns - any file matching these patterns gets filtered out of glob results.

E.g.

```bash
GLOBIGNORE='*.o:*.tmp'
echo *   # Shows all files except .o and .tmp files
```

This is useful for build directories, ignoring compiled files, or filtering out backup files from shell expansions.


## The Problem: Glob Results Need Filtering

When you write `echo *` in a shell, it expands to all files in the current directory. But sometimes you want to exclude certain patterns - like object files in a build directory, or backup files ending in `~`.

Bash solves this with `GLOBIGNORE`. When set:

1. Glob patterns automatically include dotfiles (like `dotglob` option)
2. Files matching any `GLOBIGNORE` pattern are filtered out
3. `.` and `..` are always filtered (even if they don't match a pattern)

```bash
$ GLOBIGNORE='*.txt'
$ echo *        # No .txt files in output
$ echo .*       # Shows .hidden but not . or ..
```


## The Implementation

### Where the Code Lives

The implementation is in `osh/glob_.py` in the `Globber` class. The key changes:

1. **Parse GLOBIGNORE patterns** - Split the colon-separated string into individual patterns
2. **Filter glob results** - After libc's `glob()` returns matches, filter out anything matching GLOBIGNORE
3. **Enable dotglob implicitly** - When GLOBIGNORE is set, dotfiles are included in glob expansion

### Parsing GLOBIGNORE

The tricky part: colons inside bracket expressions like `[[:alnum:]]` shouldn't be treated as separators. I handle this by tracking bracket depth:

```python
def _GetGlobIgnorePatterns(self):
    # type: () -> Optional[List[str]]
    """Get GLOBIGNORE patterns as a list, or None if not set."""

    val = self.mem.GetValue('GLOBIGNORE', scope_e.GlobalOnly)
    if val.tag() != value_e.Str:
        return None

    globignore = cast(value.Str, val).s  # type: str
    if len(globignore) == 0:
        return None

    # Check cache first
    if globignore in self._globignore_cache:
        return self._globignore_cache[globignore]

    # Split by colon, but not inside bracket expressions
    patterns = []  # type: List[str]
    current = []  # type: List[str]
    in_bracket = False

    for c in globignore:
        if c == '[':
            in_bracket = True
            current.append(c)
        elif c == ']':
            in_bracket = False
            current.append(c)
        elif c == ':' and not in_bracket:
            if len(current):
                patterns.append(''.join(current))
                del current[:]
        else:
            current.append(c)

    if len(current):
        patterns.append(''.join(current))

    self._globignore_cache[globignore] = patterns
    return patterns
```

### Caching for Performance

Andy suggested caching the parsed patterns. Since GLOBIGNORE doesn't change often during script execution, we avoid re-parsing the same string:

```python
self._globignore_cache = {}  # type: Dict[str, List[str]]
```

The cache maps the raw GLOBIGNORE string to its parsed pattern list.

### Filtering Results

After `glob()` returns matches, I filter them. This is a module-level helper function:

```python
def _StringMatchesAnyPattern(s, patterns):
    # type: (str, List[str]) -> bool
    """Check if string matches any pattern in the list.

    Returns True if s matches any pattern, or if s is . or ..
    (which are always filtered when GLOBIGNORE is set).
    """
    basename = os_path.basename(s)
    if basename in ('.', '..'):
        return True

    flags = 0
    for pattern in patterns:
        if libc.fnmatch(pattern, s, flags):
            return True

    return False
```

In `_Glob()`, the filtering has two branches - one for when GLOBIGNORE is set, and one for the default behavior:

```python
if globignore_patterns is not None:
    filtered = []  # type: List[str]
    for s in results:
        if not _StringMatchesAnyPattern(s, globignore_patterns):
            filtered.append(s)
    results = filtered
    n = len(results)
else:
    # Default behavior: just filter . and ..
    dotfile_filtered = []  # type: List[str]
    for s in results:
        if s not in ('.', '..'):
            dotfile_filtered.append(s)
    results = dotfile_filtered
    n = len(results)

out.extend(results)
return n
```

### Implicit dotglob

When GLOBIGNORE is set, bash enables dotglob automatically. I replicate this:

```python
if self.exec_opts.dotglob() or globignore_patterns is not None:
    flags |= GLOB_PERIOD
```



## Test Coverage

The spec test file `spec/globignore.test.sh` went from `oils_failures_allowed: 14` to `oils_failures_allowed: 1` - meaning 13 previously-failing test cases now pass.

I also added a new test case to verify that `.` and `..` are always filtered when GLOBIGNORE is set:

```bash
#### . and .. always filtered when GLOBIGNORE is set
# When GLOBIGNORE is set to any non-null value, . and .. are always filtered
# even if they don't match the patterns
shopt -u globskipdots
touch .hidden
GLOBIGNORE=*.txt
echo .*
## STDOUT:
.hidden
## END
```


## Running the Tests

To verify the implementation:

```bash
# Run GLOBIGNORE spec tests
test/spec.sh globignore

# Run type checking
test/typecheck.sh

# Run in C++ mode (after building)
test/spec.sh globignore --oils-cpp-bin-sh
```


## Demo

```bash
$ bin/osh
osh$ touch foo.txt bar.txt hello.py
osh$ GLOBIGNORE='*.txt'
osh$ echo *
hello.py

osh$ touch .hidden
osh$ echo .*
.hidden

osh$ GLOBIGNORE='*.o:*.h'
osh$ touch main.c main.o main.h
osh$ echo main*
main.c
```


Pull request :: [#2505](https://github.com/oils-for-unix/oils/pull/2505)
