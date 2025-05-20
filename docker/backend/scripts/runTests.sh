#!/bin/bash

echo "PyTest ..."

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

if [ -d "pyicub-training" ]; then
  mv pyicub-training/ pyicub/
fi

cd /workspace/pyicub || exit 1
sleep 2

#Disable YARP logging to avoid clutter
YARP_FORWARD_LOG_ENABLE=0 yarpserver --write >/dev/null 2>&1 &

sleep 2

yarprun --server /$ICUBSRV_NODE --log >/dev/null 2>&1 &

sleep 2

echo "gazebo ..."
gzserver /workspace/icub-apps/gazebo/icub-world.sdf >/dev/null 2>&1 &
sleep 2

echo "yarprobot interface ..."
yarprobotinterface --context gazeboCartesianControl --config no_legs.xml --portprefix /iCubSim >/dev/null 2>&1 &

sleep 4

iKinGazeCtrl --context gazeboCartesianControl --from iKinGazeCtrl.ini >/dev/null 2>&1 &

sleep 4

#run tests
PYTEST_ADDOPTS="-p no:cacheprovider" pytest -v --html=report.html --self-contained-html
#--junitxml=./results.xml
PYTEST_EXIT_CODE=$?

sleep 1

# Clean up: kill all background jobs
kill $(jobs -p) >/dev/null 2>&1
wait >/dev/null 2>&1

# Exit with pytest's exit code
exit $PYTEST_EXIT_CODE >/dev/null 2>&1
