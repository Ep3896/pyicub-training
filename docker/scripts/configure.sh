#!/bin/bash

sed -i '/^LOCAL_USER_UID=/d' ../.env
sed -i '/^LOCAL_USER_GID=/d' ../.env

# Then append fresh values:
echo "LOCAL_USER_UID=$(id -u)" >> ../.env
echo "LOCAL_USER_GID=$(id -g)" >> ../.env
