#!/usr/bin/env bash

npm install
npm run build

export ELECTRON_MIRROR="http://npm.taobao.org/mirrors/electron/"

npx electron-builder --config ./electron-builder-sign.yml

mkdir --parents ./signed
mv ./out/Makeflow*.exe $_
mv ./out/latest*.yml $_
