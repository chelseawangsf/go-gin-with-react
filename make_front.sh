#!/bin/bash

SOURCE="${BASH_SOURCE[0]}"
ROOT_DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
FRONT_DIR="$ROOT_DIR/front"
BUILD_DIR="$ROOT_DIR/build"

echo -e "\e[45m[BUILD]\e[49m Porject directory:   \e[32m$ROOT_DIR\e[39m"

# Check directory exist and clean previous build
if [ ! -d "$BUILD_DIR" ]; then
	echo -e "\e[45m[BUILD]\e[49m \e[32mCreate directory for build.\e[39m"
	mkdir -p "$BUILD_DIR"
else
	echo -e "\e[45m[BUILD]\e[49m \e[32mBuild directory exists, Clean old build.\e[39m"
	rm -rf "$BUILD_DIR/front"
fi

# Build front end
echo -e "\n\e[45m[BUILD]\e[49m Front-end directory: \e[32m$FRONT_DIR\e[39m"
cd "$FRONT_DIR"
yarn build
echo -e "\e[45m[BUILD]\e[49m Move \e[32m$FRONT_DIR/build\e[39m"
echo -e "\e[45m[BUILD]\e[49m To   \e[32m$BUILD_DIR/front\e[39m"
mv build "$BUILD_DIR/front"
