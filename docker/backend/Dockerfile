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

#ARG DOCKER_SRC=ubuntu:latest
#FROM $DOCKER_SRC


# ─── BASE IMAGE ─────────────────────────────────────────────────────
FROM robot-base:latest

# ─── GUI ENV VARIABLES ─────────────────────────────────────────────
ENV QT_X11_NO_MITSHM=1
ENV DISPLAY=:0
# Disable audio for OpenAL (used by Gazebo)
RUN echo "drivers=null" > /etc/openal/alsoft.conf
ENV ALSOFT_CONF=/etc/openal/alsoft.conf

# ─── GAZEBO GUI DEPENDENCIES ───────────────────────────────────────
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1-mesa-glx \
    libgl1-mesa-dri \
    x11-xserver-utils \
    libx11-xcb1 \
    libxcb1 \
    libxcb-util1 \
    libxcb-xinerama0 \
    libxrender1 \
    libxkbcommon-x11-0 \
    libfontconfig1 \
    libfreetype6 \
    libxext6 \
    terminator \
    qtchooser \
    qt5-qmake \
    qtbase5-dev-tools \
    qtbase5-dev && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# ─── SSH ACCESS ──────────────────────────────────────────
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssh-server sshpass && \
    apt-get clean && rm -rf /var/lib/apt/lists/*


ENV PATH=$PATH:/root/.local/bin

# ─── CLONE & INSTALL pyicub ─────────────────────────────────────────
ARG PYICUB_URL=https://github.com/s4hri/pyicub
ARG PYICUB_BRANCH=master
ARG PYICUB_VERSION=master

RUN cd /root && \
    git clone ${PYICUB_URL} -b ${PYICUB_BRANCH} && \
    cd pyicub && \
    if [ "${PYICUB_URL}" = "https://github.com/s4hri/pyicub" ]; then \
        git checkout ${PYICUB_VERSION}; \
    fi && \
    pip3 install -r requirements.txt && \
    pip3 install -U pytest pytest-cov

# ─── CLONE pyicub-apps ─────────────────────────────────────────────
ARG PYICUB_APPS_URL=https://github.com/s4hri/pyicub-apps
ARG PYICUB_APPS_BRANCH=master
ARG PYICUB_APPS_VERSION=master

RUN cd /root && \
    git clone ${PYICUB_APPS_URL} -b ${PYICUB_APPS_BRANCH} && \
    cd pyicub-apps && \
    git checkout ${PYICUB_APPS_VERSION}

# ─── PYTHONPATH ────────────────────────────────────────────────────
ENV PYTHONPATH=/root/pyicub:/workdir

# ─── DEFAULT WORKDIR ───────────────────────────────────────────────
WORKDIR /workspace
CMD ["bash"]
