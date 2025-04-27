
#!/bin/bash
set -e


# --------- 0. Install curl and sudo if missing ----------
if ! command -v curl &>/dev/null; then
    apt-get update && apt-get install -y curl sudo gnupg
fi


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

# --- Install NVIDIA Container Toolkit (robust for most Ubuntu/Debian) ---
if ! command -v nvidia-container-toolkit &>/dev/null; then
    echo "[INFO] NVIDIA Container Toolkit not found. Installing (using generic .deb repo)..."
    sudo apt-get update
    sudo apt-get install -y ca-certificates curl gnupg lsb-release
    curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | \
      sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg
    echo "deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://nvidia.github.io/libnvidia-container/stable/deb/ $(lsb_release -cs) main" | \
      sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
    sudo apt-get update
    sudo apt-get install -y nvidia-container-toolkit
    sudo systemctl restart docker
    echo "[INFO] NVIDIA Container Toolkit installed."
else
    echo "[OK] NVIDIA Container Toolkit found: $(nvidia-container-cli --version 2>/dev/null || echo 'version check not available')"
fi
