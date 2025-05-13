# Pyicub Team Development Workshop: Complete Group Training Exercise

This workshop is designed to simulate a **complete contribution cycle** to the `pyicub` project. Each team member will actively participate in replicating a full development pipeline:

* Working in a **Dockerized development environment**.
* Making changes on a new branch.
* Writing tests and running them in simulation.
* Opening and reviewing a **Pull Request**.
* Merging to `main`, tagging a release, and updating documentation.

---

## 1. Introduction (5 minutes)

### Objective:

Understand the goals and workflow of this workshop.

* Repository URL: `https://github.com/Ep3896/pyicub-training`
* Each participant will:

  1. Clone the repo and build the dev container.
  2. Create and switch to a new feature branch.
  3. Implement a simple function.
  4. Write tests for it.
  5. Submit a pull request.
  6. Merge and tag a release.

---

## 2. Docker Development Environment (15 minutes)

### Step-by-step:

1. **Clone the repository**:

```bash
git clone https://github.com/Ep3896/pyicub-training.git
cd pyicub-training/docker
```

2. **Build and Run the environment using the provided script**:


```bash
bash build
```

```bash
bash go
```

This script will:

* Configure display variables for GUI support.
* Build all services (backend/frontend).
* Run `docker compose up` with the appropriate profiles.

3. **Inside the container**, you’ll be dropped into:

```
/workspace/
├── icub-apps/
├── pyicub/
├── pyicub-apps/
└── scripts/
```

4. **Validate setup**:

```bash
cd /workspace/pyicub
pytest -m smoke
```

You should see tests passing, confirming your container is functional.

---

## 3. Code Contribution Workflow (20 minutes)

### 3.1 Create a new feature branch:

```bash
git checkout -b feature/add-print-version
```

### 3.2 Add a feature in `pyicub/__init__.py`:

```python
def print_version():
    """Prints the current version of the library."""
    print("pyicub version: 0.3.0")
```

### 3.3 Follow coding conventions:

Run these linters inside the container:

```bash
flake8 pyicub/
mypy pyicub/
```

Ensure your code is clean, typed, and correctly formatted.

### 3.4 Commit your changes:

```bash
git add pyicub/__init__.py
git commit -m "Feature: add print_version utility function"
```

---

## 4. Writing and Running Tests (20 minutes)

### 4.1 Add a smoke test in `tests/test_version.py`:

```python
import pytest

@pytest.mark.smoke
def test_print_version(capsys):
    from pyicub import print_version
    print_version()
    captured = capsys.readouterr()
    assert "pyicub version: 0.3.0" in captured.out
```

### 4.2 Run your test:

```bash
pytest -m smoke
```

### 4.3 Optional: Run integration tests

Ensure `Gazebo` is running with the full simulation profile. Then:

```bash
pytest -m integration
```

---

## 5. Rebasing, Commit Hygiene & Merging (10 minutes)

### 5.1 Sync with master:

```bash
git checkout master
git pull origin master
```

### 5.2 Rebase your branch:

```bash
git checkout feature/add-print-version
git rebase master
```

Resolve conflicts if necessary. Then:

```bash
git push --force-with-lease
```

### 5.3 Push your feature branch:

```bash
git push origin feature/add-print-version
```

---

## 6. Open a Pull Request & Review (10 minutes)

Go to GitHub and open a new Pull Request:

* Title: `Feature: Add print_version utility`
* Use the PR template from `Pull_request.md`.

Assign reviewers. Reviewers will:

* Check code structure and docstrings.
* Run tests locally.
* Validate code formatting with `flake8`, `mypy`.
* Approve or request changes.

---

## 7. Documentation & Release (10 minutes)

### 7.1 Update the changelog:

* Add an entry to `CHANGELOG.md`:

```md
## [0.3.1] - YYYY-MM-DD
### Added
- `print_version()` utility function to display the current library version.
```

### 7.2 Merge the PR

Once approved, let the maintainer merge it to `main`.

### 7.3 Tag the release:

```bash
git checkout master
git pull origin master
git tag -a v0.3.1 -m "Release v0.3.1: add print_version"
git push origin --tags
```

---

## 8. Recap and Q\&A (15 minutes)

Discuss:

* Challenges faced with Docker or testing.
* Common mistakes found in PR reviews.
* Suggestions for streamlining the workflow.

Optional Reflection Topics:

* How containers simplified the dev process.
* Advantages of CI workflows and structured testing.

---

This document serves as the backbone of your workshop. Each section is meant to be followed hands-on by every participant, ensuring they walk away with a solid grasp of the real `pyicub` dev lifecycle.
