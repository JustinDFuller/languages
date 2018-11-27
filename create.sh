# /usr/bin/bash

mkdir "$1"
touch "$1/Main.java"
touch "$1/index.js"
touch "$1/main.py"
touch "$1/main.hs"
touch "$1/main.sh"
touch "$1/expected"
touch "$1/input"
chmod +x "$1/main.sh"

