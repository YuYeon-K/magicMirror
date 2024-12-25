#!/bin/bash
function startMirror() {
    wget -q --spider https://google.com
    if [ $? -eq 0 ]; then
        wg-quick up wg0 && ping -c 4 10.253.0.1
        midori https://se101-magicmirror-dashboard-next.vercel.app &
        sleep 60 && xdotool key F11
    else
        sleep 60
        startMirror
    fi
}
xrandr -o left
startMirror > /tmp/mirror.log
