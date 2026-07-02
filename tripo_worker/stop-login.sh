#!/bin/bash
# Tear down the noVNC login session and put the worker back online.
pkill -f login-browser.mjs 2>/dev/null
pkill -f "websockify.*6080" 2>/dev/null
pkill -f x11vnc 2>/dev/null
pkill -f "Xvfb :99" 2>/dev/null
systemctl start tripo-worker
echo "worker restarted"
