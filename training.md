# Pyicub Team Development Meeting: CI and Recap of What We Have Achieved So Far

## **Structure of the Meeting**:

1. **Theoretical Part**:   
   1.1 Quick recap
   
   1.2 CI workflow 

2. **Practical Part**: 
   2.1 CI in action!

This **won't** be a practical and interactive session, so please enjoy your coffee! :)

--- 

### Quick Recap

1. **Branching Strategy**

    We follow a trunk-based development model, where master is the main production branch.

    All new work is done in short-lived branches derived from master, using clear naming conventions:

        feature/* for new features

        bugfix/* for bug fixes

        vX.Y for major version lines if divergence is needed

    This strategy keeps the main branch stable and simplifies integration.

    Each branch is isolated, focused on a single task, and deleted after being merged to keep the repository clean.

--- 

2. **Pull Request Workflow**

    Every contribution is integrated through a pull request (PR) to master.

    The standard process includes:

        Creating a feature or bugfix branch

        Writing meaningful commit messages (ideally following the Conventional Commits spec)

        Opening a PR with a clear description and test status

        Assigning a reviewer and addressing feedback

    Even if GitHub Actions is not used, the PR is treated as a formal checkpoint:

        Developers are expected to run tests locally before submitting

        A shared PR template ensures consistency, traceability, and code quality

---

3. **Development Environment**

    - The project uses a Docker-based environment to isolate dependencies and ensure consistency across machines.

    - All development and testing is performed inside the container, which includes the full YARP and Pyicub stack.

    - The container runs as root to simplify access to simulation tools, device interfaces, and YARP ports.

    - This setup guarantees that all contributors work in the same environment, avoiding configuration drift and system-specific issues.

    - Testing and automation scripts (e.g., runTests.sh) are integrated directly into the container and executed as part of the local CI process.

---

### CI workflow 

1. **Introduction**

    Continuous Integration (CI) is a development practice that automates the testing and validation of code before it's merged into a shared repository.

    It helps teams detect issues early, maintain code quality, and streamline collaboration.

    In this presentation, we review what CI is, how we've applied it to our project, and how it is implemented in our PyiCub workflow.

---
2. **Standard CI Workflow**

    A typical CI pipeline is triggered on every code change, often via a pull request to a main branch.

    The pipeline automatically:

        1) Install dependencies 
   
        2) Runs tests

        3) Enforces coding standards

    If the pipeline passes, the code is considered safe to merge.

    This process ensures that all contributions are validated in a consistent, isolated environment, reducing integration errors and improving software reliability.

    Tools like GitHub Actions, GitLab CI, and Jenkins are commonly used to implement this model in cloud-hosted environments.

---

4. **Limitations in Our Context**

    Despite following best practices for containerization, we were unable to use cloud-based CI systems like GitHub Actions.

    This limitation stems from YARP’s reliance on system-level features such as real-time communication, network services, and device access, which are typically restricted or unavailable in hosted CI environments.

    As a result, we opted for a local CI workflow, leveraging Docker and Git hooks to enforce testing before code integration.

---

5. **Our CI Approach**

    We implemented a local Continuous Integration strategy tailored to our constraints.

    All development occurs inside a Docker container, ensuring a consistent environment across contributors.

    A Git pre-push hook runs the test suite automatically before any code is pushed to the repository.

    This guarantees that only tested code reaches the remote repository, enforcing quality without relying on cloud-based CI platforms.

    The test logic is centralized in a script (scripts/test.sh), making the process reproducible and easy to maintain.

---

6. **What We’ve Achieved So Far**

    - Established a consistent and reproducible development environment using Docker.

    - Automated the execution of tests through a pre-push Git hook, ensuring code is verified before integration.

    - Enabled team-wide alignment on testing practices without relying on external CI infrastructure.

    - Reduced integration issues by enforcing local validation before any contribution reaches the shared repository.
  


------------


## Practical Part: CI Contribution Demo 



1. Start the Docker development container

    - Launch using the go script or docker compose with the appropriate profile (e.g., backend).

    ```bash
    bash go 
    ```

    - Enter the workspace at /workspace/pyicub.

2. Pull the latest changes from master

    - Ensure the container environment is working with the latest version of the main branch.

3. Create a new feature or bugfix branch

    - Name it following the convention (e.g., feature/fix-log-path or bugfix/timeout-handler).

4. Make a small code contribution

    - Edit the code inside the container.

    - Apply best practices for modularity, style, and documentation.

5. Run tests locally (inside Docker)

    - Use scripts/test.sh or pytest to validate functionality.

    - Confirm no regressions were introduced.

6. Commit your changes

    - Write a clear, descriptive commit message following the Conventional Commits format.

7. Push the branch to remote

    - The Git pre-push hook will execute test.sh before allowing the push.

    - If tests pass, the push proceeds.

8. Open a Pull Request

    - Fill in the PR template: summary, test logs, documentation.

    - Assign reviewers and respond to feedback.

9. Merge the branch into master

    - Once reviewed and approved, the change is merged by a maintainer.

    - Branch is deleted after merge to keep history clean.