+++
title = "UV Python Manager"
date = 2025-10-10
[taxonomies]
notec = ["Learned"]
+++


## Setting Python Versions
---
<br>

### Create venv with specific Python version
```bash
uv venv .venv --python 3.11.6
```

### Pin Python version for project
```bash
uv python pin 3.12
```

### Set global default Python version
```bash
uv python pin --global 3.12
```

### Run script with specific version (one-off)
```bash
uv run --python 3.12 -- python my_script.py
```
<br>


## Adding UV To An Existing Projects

### Initialize UV in existing project
```bash
uv init
```

### Create and activate virtual environment
```bash
uv venv .venv
source .venv/bin/activate  # Linux/macOS
# .venv\Scripts\activate   # Windows
```

### Install dependencies from requirements.txt
```bash
uv add -r requirements.txt
```

### Sync dependencies (pyproject.toml)
```bash
uv sync
```

## Package Management
---

### List installed packages
```bash
uv pip list
```

### Add new package
```bash
uv add package-name
```

### Add dev dependency
```bash
uv add --dev package-name
```

### Remove package
```bash
uv remove package-name
```

### Update packages
```bash
uv lock --upgrade
uv sync
```

## Python Version Management
---

### Install Python version
```bash
uv python install 3.12
```

### List available Python versions
```bash
uv python list
```

### List installed Python versions
```bash
uv python list --only-installed
```

## Running Commands
---

### Run command in venv without activating
```bash
uv run python script.py
uv run pytest
uv run uvicorn main:app --reload
```

### Create new project from scratch
```bash
uv init my-project
cd my-project
uv add requests pandas numpy
```

## Quick Reference
---

| Task | Command |
|------|---------|
| New project | `uv init project-name` |
| Add package | `uv add package-name` |
| Install deps | `uv sync` |
| Run script | `uv run python script.py` |
| Pin Python | `uv python pin 3.12` |
| List packages | `uv pip list` |
| Update all | `uv lock --upgrade && uv sync` |


## Others
---

```bash
# Create isolated tool environments
uv tool install ruff
uv tool install black

# Export requirements.txt from pyproject.toml
uv pip compile pyproject.toml -o requirements.txt
```
