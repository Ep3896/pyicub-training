#!/bin/bash
set -e

# --------- 1. Install Docker if missing ----------
if ! command -v docker &>/dev/null; then
    echo "[INFO] Docker not found. Installing Docker (using get.docker.com)..."
    curl -fsSL https://get.docker.com | sudo sh
    sudo usermod -aG docker $USER
    echo "[INFO] Docker installed. Please log out and back in, or reboot, for group changes to take effect."
    exit 0
else
    echo "[OK] Docker found: $(docker --version)"
fi

# --------- 2. Install Docker Compose V2 if missing ----------
if ! docker compose version &>/dev/null; then
    echo "[INFO] Docker Compose V2 not found. Installing docker-compose-plugin..."
    sudo apt-get update
    sudo apt-get install -y docker-compose-plugin
    echo "[INFO] Docker Compose V2 installed."
else
    echo "[OK] Docker Compose found: $(docker compose version)"
fi

# --------- 3. Install NVIDIA Container Toolkit if missing ----------
if ! command -v nvidia-container-toolkit &>/dev/null; then
    echo "[INFO] NVIDIA Container Toolkit not found. Installing..."
    distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
    # Install GPG key
    curl -s -L https://nvidia.github.io/libnvidia-container/gpgkey | sudo apt-key add -
    # Add repository
    curl -s -L https://nvidia.github.io/libnvidia-container/$distribution/libnvidia-container.list | \
      sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
    sudo apt-get update
    sudo apt-get install -y nvidia-container-toolkit
    sudo systemctl restart docker
    echo "[INFO] NVIDIA Container Toolkit installed. Please ensure you have the NVIDIA GPU drivers installed as well."
else
    echo "[OK] NVIDIA Container Toolkit found: $(nvidia-container-cli --version 2>/dev/null || echo 'version check not available')"
fi

echo "[SUCCESS] All required dependencies are installed and ready!"
