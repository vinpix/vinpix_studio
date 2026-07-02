#!/bin/bash
# One-time Tripo login. Starts a visible Chromium (same profile the worker
# uses) inside Xvfb, exposed through noVNC so you can log in from your own
# browser. Run:  bash /root/tripo-worker/login.sh
# Then open:     http://125.212.218.24:6080/vnc.html   (VNC password in .env)
# When you are logged in to studio.tripo3d.ai, press Ctrl+C here (or run
# bash stop-login.sh) — the worker restarts automatically.
set -e
cd /root/tripo-worker
set -a; source ./.env; set +a

systemctl stop tripo-worker 2>/dev/null || true
pkill -f "Xvfb :99" 2>/dev/null || true
pkill -f x11vnc 2>/dev/null || true
pkill -f "websockify.*6080" 2>/dev/null || true
sleep 1

Xvfb :99 -screen 0 1440x900x24 &
XVFB_PID=$!
sleep 1
x11vnc -display :99 -passwd "$VNC_PASS" -forever -shared -bg -quiet -noxdamage
websockify --web /usr/share/novnc 0.0.0.0:6080 localhost:5900 >/dev/null 2>&1 &
WS_PID=$!

cleanup() {
  kill $WS_PID 2>/dev/null || true
  pkill -f x11vnc 2>/dev/null || true
  kill $XVFB_PID 2>/dev/null || true
  systemctl start tripo-worker 2>/dev/null || true
  echo "login session closed — tripo-worker restarted"
}
trap cleanup EXIT INT TERM

echo "============================================================"
echo " Mở:  http://125.212.218.24:6080/vnc.html"
echo " VNC password: $VNC_PASS"
echo " Đăng nhập studio.tripo3d.ai (Google: vinpix7@gmail.com)"
echo " Xong thì bấm Ctrl+C ở đây."
echo "============================================================"

DISPLAY=:99 HEADLESS=0 node login-browser.mjs
