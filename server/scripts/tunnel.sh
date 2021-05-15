#!/bin/bash
echo "$(date) Running server"
ssh -o ServerAliveInterval=50 -R 8080:localhost:22 root@188.166.247.136
