#!/bin/bash

SOURCE="${BASH_SOURCE[0]}"
ROOT_DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
BACK_DIR="$ROOT_DIR/back"
BUILD_DIR="$ROOT_DIR/build"

echo -e "\e[45m[BUILD]\e[49m Porject directory:   \e[32m$ROOT_DIR\e[39m"

# Check directory exist and clean previous build
if [ ! -d "$BUILD_DIR" ]; then
	echo -e "\e[45m[BUILD]\e[49m \e[32mCreate directory for build.\e[39m"
	mkdir -p "$BUILD_DIR"
fi

# Build back end
echo -e "\n\e[45m[BUILD]\e[49m Back-end directory:  \e[32m$BACK_DIR\e[39m"
cd "$BACK_DIR"
go build -o "$BUILD_DIR/run_server"

