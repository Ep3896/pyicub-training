# MIT License
#
# Copyright (c) 2022 Social Cognition in Human-Robot Interaction
#                    Author: Davide De Tommaso (davide.detommaso@iit.it)
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.


# ─── BASE IMAGE ─────────────────────────────────────────────────────
ARG DOCKER_SRC=ubuntu:latest
FROM $DOCKER_SRC


# ─── Git Credential Manager installation ──────────────────────────

ARG GIT_USER_NAME
ARG GIT_USER_EMAIL

RUN apt update && apt install -y \
     curl \
     gnupg \
     libsecret-1-0 \
     libsecret-1-dev \
  && curl -LO https://github.com/GitCredentialManager/git-credential-manager/releases/download/v2.4.1/gcm-linux_amd64.2.4.1.deb \
  && apt install -y ./gcm-linux_amd64.2.4.1.deb \
  && git-credential-manager configure \
  && git config --global credential.credentialStore plaintext

# ─── Configure git ─────────────────────────────────────────────
RUN if [ -n "$GIT_USER_NAME" ] && [ -n "$GIT_USER_EMAIL" ]; then \
      git config --global user.name "$GIT_USER_NAME" && \
      git config --global user.email "$GIT_USER_EMAIL"; \
    fi

WORKDIR /workspace 

ENV PATH=$PATH:/root/.local/bin

# ─── CLONE & INSTALL pyicub ─────────────────────────────────────────
ARG PYICUB_URL=https://github.com/s4hri/pyicub
ARG PYICUB_BRANCH=master
ARG PYICUB_VERSION=master

RUN git clone ${PYICUB_URL} -b ${PYICUB_BRANCH} && \
    cd pyicub-training && \
    if [ "${PYICUB_URL}" = "https://github.com/s4hri/pyicub" ]; then \
        git checkout ${PYICUB_VERSION}; \
    fi && \
    pip3 install -r requirements.txt

# ─── CLONE pyicub-apps ─────────────────────────────────────────────
ARG PYICUB_APPS_URL=https://github.com/s4hri/pyicub-apps
ARG PYICUB_APPS_BRANCH=master
ARG PYICUB_APPS_VERSION=master

RUN git clone ${PYICUB_APPS_URL} -b ${PYICUB_APPS_BRANCH} && \
    cd pyicub-apps && \
    git checkout ${PYICUB_APPS_VERSION}

# ─── PYTHONPATH ────────────────────────────────────────────────────
ENV PYTHONPATH=/workspace/pyicub

COPY ./icub-apps /workspace/icub-apps
COPY ./scripts /workspace/scripts

CMD ["bash"]
