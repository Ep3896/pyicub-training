#!/bin/bash
set -e

echo "[CI] Setting up environment..."

source ${ROBOTOLOGY_SUPERBUILD_INSTALL_DIR}/share/robotology-superbuild/setup.sh

ICUB_HOSTS_ENTRY="$ICUB_IP icub-head"

# Check if the entry already exists
if grep -Fxq "$ICUB_HOSTS_ENTRY" /etc/hosts; then
  echo "iCub entry already exists in /etc/hosts"
else
  # Add the entry to /etc/hosts
  echo "$ICUB_HOSTS_ENTRY" | tee -a /etc/hosts >/dev/null
  echo "iCub entry added to /etc/hosts"
fi

mv pyicub-training/ pyicub/

cd /workspace/pyicub|| exit 1
sleep 2


#Disable YARP logging to avoid clutter
YARP_FORWARD_LOG_ENABLE=0 yarpserver --write >/dev/null 2>&1 &

sleep 2

yarprun --server /$ICUBSRV_NODE --log >/dev/null 2>&1 &

sleep 2


echo "[CI] Starting Gazebo..."
gzserver /workspace/icub-apps/gazebo/icub-world.sdf >/dev/null 2>&1 &
sleep 4

echo "[CI] Launching yarprobotinterface..."
yarprobotinterface --context gazeboCartesianControl --config no_legs.xml --portprefix /iCubSim >/dev/null 2>&1 &

sleep 5 

yarp name list 

sleep 1 


echo "[CI] Setup complete"


echo "[CI] Launching iKinGazeCtrl..."
iKinGazeCtrl --context gazeboCartesianControl --from iKinGazeCtrl.ini >/dev/null 2>&1 &
sleep 2

echo "[CI] Running pytest..."
export PYTEST_ADDOPTS='-p no:cacheprovider'
pytest -v --junitxml=/workspace/results/result.xml



