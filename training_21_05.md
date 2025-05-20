## Pyicub Team Development Meeting: CI and Recap of What We Have Achieved So Far

---

### **Structure of the Meeting**:

1. **Theoretical Part**: 1 hour  
2. **Practical Part**: 30 minutes  

This **won't** be a practical and interactive session, so please enjoy your coffee! :)

---

### **Theoretical Session**

#### **What is CI?**
- **Definition**:  
  Continuous Integration (CI) is a software development practice where developers integrate code into a shared repository frequently, ideally several times a day. Each integration is verified by an automated build and test process.

- **Key Principles of CI**:
  - Frequent commits to the shared repository.
  - Automated builds and tests triggered on every commit.
  - Early detection of integration issues.

- **Why is CI Important?**
  - Ensures that the codebase is always in a deployable state.
  - Reduces the risk of integration problems.
  - Encourages collaboration and accountability among team members.

---

#### **Why Do We Need CI in Our Project?**
- **Challenges Without CI**:
  - Manual testing is time-consuming and error-prone.
  - Integration issues often arise late in the development cycle.
  - Difficult to maintain code quality across a growing team.

- **Benefits of CI for Pyicub**:
  - **Automated Testing**: Ensures that new code doesn’t break existing functionality.
  - **Faster Feedback**: Developers are notified immediately if their changes cause issues.
  - **Improved Collaboration**: Encourages frequent integration and communication among team members.
  - **Code Quality**: Enforces coding standards and best practices through automated checks.
  - **Scalability**: Makes it easier to manage contributions from multiple developers.

---

#### **How Does CI Work?**
1. **Code Commit**:  
   Developers commit code to a shared repository (e.g., GitHub).

2. **Trigger CI Pipeline**:  
   Every commit triggers an automated pipeline that includes:
   - **Build**: Compiling the code (if applicable).
   - **Test**: Running unit tests, integration tests, and other checks.
   - **Static Analysis**: Linting and code quality checks.

3. **Feedback Loop**:  
   - If the pipeline succeeds: The code is ready for further review or deployment.
   - If the pipeline fails: Developers receive immediate feedback to fix the issues.


---

#### **Testing Pull Requests Without GitHub Actions**

##### **1. Test Locally Before Merging**
- **Steps**:
  1. Pull the feature branch locally:
     ```bash
     git fetch origin feature-branch
     git checkout feature-branch
     ```
  2. Merge the branch into `main` locally:
     ```bash
     git checkout main
     git pull origin main
     git merge feature-branch
     ```
  3. Run your test suite locally:
     ```bash
     pytest  # Or your preferred testing command
     ```
  4. If tests pass, push the merged branch to `main`:
     ```bash
     git push origin main
     ```

---

##### **3. Use Pre-Merge Hooks**
- Use a **pre-merge hook** to enforce testing before merging:
  - Write a custom script that runs tests automatically when merging a pull request.
  - Example:
    ```bash
    # pre-merge.sh
    git checkout main
    git pull origin main
    git merge --no-commit feature-branch
    pytest  # Run tests
    if [ $? -eq 0 ]; then
        git commit -m "Merge feature-branch into main"
        git push origin main
    else
        echo "Tests failed. Aborting merge."
        git merge --abort
    fi
    ```

---

##### **5. Use a Staging Branch**
- Create a `staging` branch as an intermediary step before merging to `main`.
- Test pull requests by merging them into `staging` first:
  1. Merge the pull request into `staging`.
  2. Run tests on the `staging` branch.
  3. If tests pass, merge `staging` into `main`.

---

##### **6. Manual Code Review and Testing**
- If automation is not possible, enforce a manual process:
  - Review the code in the pull request.
  - Test the changes manually in a local or staging environment.
  - Approve and merge the pull request only if all tests pass.

---

#### **Best Practices for CI**
- Commit code frequently and in small increments.
- Write meaningful commit messages.
- Ensure that all tests pass locally before pushing code.
- Use feature branches for new developments.
- Review and update the CI pipeline regularly to adapt to project changes.

---

#### **CI in Action for Pyicub**
- **Current Workflow**:
  - Developers create feature branches for new functionality.
  - Code is pushed to GitHub, triggering the CI pipeline.
  - Automated tests and checks are run on every pull request.
  - Code is reviewed and merged into the `main` branch only if all checks pass.

- **Future Improvements**:
  - Add more comprehensive test coverage.
  - Implement performance testing in the CI pipeline.
  - Automate deployment to staging environments.

---

#### **Summary of the Theoretical Session**
- CI is a critical practice for modern software development.
- It ensures code quality, reduces integration issues, and improves team collaboration.

---

### **Practical Session**
- Setting up a basic CI workflow manually.
- Writing and running a simple test case for the Pyicub library.
- Demonstrating the CI pipeline in action.

---