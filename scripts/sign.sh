#!/usr/bin/env bash

yarn
yarn build

export ELECTRON_MIRROR="http://npm.taobao.org/mirrors/electron/"

yarn electron-builder --config ./electron-builder-sign.yml

mkdir --parents ./signed
mv ./out/Makeflow*.exe $_
mv ./out/latest*.yml $_
