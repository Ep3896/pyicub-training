FROM ubuntu:22.04

ARG ROBOTOLOGY_VER=v2024.08.0
ARG ROBOT_CODE="/usr/local/src/robot"
ARG ROBOTOLOGY_SUPERBUILD_SOURCE_DIR=${ROBOT_CODE}/robotology-superbuild
ARG ROBOTOLOGY_SUPERBUILD_INSTALL_DIR=/usr/local

ARG YCM_EP_ADDITIONAL_ARGS="-DENABLE_yarpcar_h264=ON \
                            -DENABLE_yarpcar_mjpeg=ON \
                            -DENABLE_yarpmod_grabber=ON \
                            -DENABLE_yarpmod_opencv_grabber=ON"

RUN echo "YCM_EP_ADDITIONAL_ARGS: " $YCM_EP_ADDITIONAL_ARGS

ARG ROBOTOLOGY_PARAMS="-DYCM_EP_INSTALL_DIR=${ROBOTOLOGY_SUPERBUILD_INSTALL_DIR} \
                       -DROBOTOLOGY_ENABLE_CORE=ON -DROBOTOLOGY_USES_GAZEBO=ON \
                       -DROBOTOLOGY_ENABLE_ICUB_BASIC_DEMOS=ON \
                       -DROBOTOLOGY_USES_PYTHON=ON"

RUN echo "ROBOTOLOGY_PARAMS: " $ROBOTOLOGY_PARAMS

ENV TZ=Europe/Rome
ENV DEBIAN_FRONTEND=noninteractive
ENV ROBOTOLOGY_SUPERBUILD_INSTALL_DIR=$ROBOTOLOGY_SUPERBUILD_INSTALL_DIR
ENV ROBOT_CODE=$ROBOT_CODE


RUN apt-get update
RUN apt-get install -y nfs-common python-tk libopencv-dev ntpdate ssh cmake-curses-gui

RUN mkdir -p $ROBOT_CODE

RUN apt-get update && apt-get install -y \
    curl wget git lsb-release locales \
    software-properties-common build-essential cmake cmake-curses-gui \
    libdc1394-dev libeigen3-dev libace-dev swig \
    python3 python3-dev python3-pip python3-setuptools \
    libopencv-dev nfs-common ntpdate openssh-server sshpass \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install gazebo
RUN apt-get update && apt-get install -y gnupg wget lsb-release && \
    echo "deb http://packages.osrfoundation.org/gazebo/ubuntu-stable $(lsb_release -cs) main" > /etc/apt/sources.list.d/gazebo-stable.list && \
    wget https://packages.osrfoundation.org/gazebo.key -O - | gpg --dearmor -o /etc/apt/trusted.gpg.d/gazebo.gpg && \
    apt-get update && apt-get install -y gazebo libgazebo-dev


RUN cd $ROBOT_CODE && \
    git clone https://github.com/robotology/robotology-superbuild -b $ROBOTOLOGY_VER && \
    cd robotology-superbuild && \
    bash ./scripts/install_apt_dependencies.sh

# Set up git (required by superbuild)
RUN git config --global user.name "GitHub Actions" && \
    git config --global user.email "actions@github.com"

RUN cd $ROBOTOLOGY_SUPERBUILD_SOURCE_DIR && \
    mkdir build && \
    cd build && \
    cmake .. $ROBOTOLOGY_PARAMS  \
            -DYCM_EP_ADDITIONAL_CMAKE_ARGS:STRING="${YCM_EP_ADDITIONAL_ARGS}" && \
    make -j$(nproc);

# Clean up git configuration
RUN git config --global --unset-all user.name && \
    git config --global --unset-all user.email

RUN echo "source ${ROBOTOLOGY_SUPERBUILD_INSTALL_DIR}/share/robotology-superbuild/setup.sh" >> /root/.bashrc
RUN echo "source /etc/profile.d/bash_completion.sh" >> /root/.bashrc

RUN apt-get install -y sshpass openssh-server

RUN mkdir -p /home/.vscode-server /home/.vscode-server-insiders

RUN mkdir -p /home/.config/yarp
