#!/bin/bash

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

# Wait until icub head is reachable(ping icub-head), if timeout expires then exit with the err
YARP_FORWARD_LOG_ENABLE=0 yarpserver --write &
sleep 2

if ! $ICUB_SIMULATION; then
  sshpass -p icub ssh -o StrictHostKeyChecking=no icub@$ICUB_IP "yarprun --server /"$ICUB_NODE" --log &" &
fi

yarprun --server /$ICUBSRV_NODE --log &

yarpmanager --apppath ${ICUB_APPS}/applications --from ${ICUB_APPS}/applications/cluster-config.xml

if ! $ICUB_SIMULATION; then
  sshpass -p icub ssh -o StrictHostKeyChecking=no icub@$ICUB_IP "killall -9 yarprun"
  sshpass -p icub ssh -o StrictHostKeyChecking=no icub@$ICUB_IP "killall -9 yarpdev"
fi
