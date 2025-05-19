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
cd pyicub/
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
    print(f"pyicub version: {__version__}")
```

### 3.3 Follow coding conventions:

At the beginning, please install the following packages:

```bash 
pip3 install flake8 mypy
```

Then these linters inside the container:

```bash
flake8 pyicub/
mypy pyicub/
```

Ensure your code is clean, typed, and correctly formatted.

### 3.4 Commit your changes:

Warning!: GitHub access is not configured, so please check the [Appendix](#appendix-configure-github-ssh-access-inside-the-container) to configure it in the container.

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
    import pyicub
    pyicub.print_version()
    captured = capsys.readouterr()
    assert pyicub.__version__ in captured.out
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

Then if the test is passed, add and commit (try by yourself).

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
git add .
git commit -m "Feature: add print_version utility test"
```
This block stages all changes in the current directory and commits them with a descriptive message. It ensures that your changes are saved locally in the Git history.

```bash
git pull --rebase origin feature/add-print-version
```
This command fetches the latest changes from the remote branch and rebases your local branch on top of it. It helps to integrate the latest updates while maintaining a clean commit history.

### 5.3 Push your feature branch:

```bash
git push origin feature/add-print-version --force-with-lease
```
This command force-pushes your rebased branch to the remote repository while ensuring no unexpected changes are overwritten. It is used to update the remote branch after a rebase.


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

this is an [example](https://github.com/moveit/moveit/blob/master/moveit_core/CHANGELOG.rst) of how to structure it

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

## Appendix: Configure GitHub SSH Access Inside the Container

Follow these steps **inside the Docker container**:


### 1. Configure Git User Id 

```bash
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"
```

### 2. Generate SSH Key
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Press Enter through the prompts to use the default location.

### 3. Start SSH Agent and Add the Key
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### 4. Copy Your Public Key
```bash
cat ~/.ssh/id_ed25519.pub
```

Copy the output.

### 5. Add the Key to GitHub
- Go to [GitHub → Settings → SSH and GPG keys](https://github.com/settings/keys)
- Click **New SSH key**
- Paste the copied key and save

### 6. Switch Remote to SSH
```bash
git remote set-url origin git@github.com:Ep3896/pyicub-training.git
```

### 7. Test Access (Optional)
```bash
ssh -T git@github.com
```

You should see a success message. Now you can push without entering a username/password.
