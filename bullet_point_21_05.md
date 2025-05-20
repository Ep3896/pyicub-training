
## **Part 1 – Theoretical Overview: Continuous Integration and Our Strategy**


---

### 1. **Introduction**

* Goal of Continuous Integration (CI)
* Importance in collaborative robotics software development


### 2. **Standard CI Workflow**

* Pull request → CI runs → merge if successful
* Centralized validation via platforms (e.g., GitHub Actions, Jenkins)
* Benefits: automated checks, shared visibility, reduced integration bugs


### 3. **Limitations in Our Context**

* YARP's complexity:

  * Hardware-dependence
  * Real-time communication
  * System-level constraints (e.g., `/dev`, multicast)
* Incompatibility with GitHub-hosted runners
* Why cloud CI was not feasible for us

### 4. **Our CI Approach**

* Dockerized local development and testing environment
* Use of Git pre-push hooks to enforce tests before integration
* Shared `test.sh` script for standardized test execution
* Local CI as an alternative to centralized CI

### 5. **What We’ve Achieved So Far**

* Consistent test environment via Docker
* Automatic test enforcement via pre-push hook
* Clear structure for local testing before code integration
* Team-wide reproducibility and code hygiene

### 6. **Next Steps**

* Plan for enforcing tests before pull request

  * Ideas: developer-side checklist, manual test log submission, tag-based testing
* Possible future: self-hosted CI runners in lab with YARP installed
* Goal: hybrid CI model with test coverage and traceability

---

## **Part 2 – Practical Walkthrough: Contribution and Integration Process**

### 1. **Initial Setup**

* Cloning the repository
* Entering the Docker container
* Installing dependencies and setting up the environment

### 2. **Development Process**

* Creating a new feature or fix branch
* Writing/modifying code
* Running local tests inside Docker

### 3. **Pre-Push Verification**

* Git pre-push hook triggers test script
* Push is blocked if tests fail
* Ensures tested code only is pushed

### 4. **Preparing for Pull Request**

* Manually running full test suite if needed
* Preparing the pull request with test results or log
* Team review based on test traceability

### 5. **Merging the Contribution**

* Verification checklist (manual, for now)
* Merge only if test traceability is satisfied
* Tagging and documenting the integration result

---

