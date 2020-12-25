#!/usr/bin/env bash

VERSION=$1

if [ -z "$VERSION" ]; then
  echo "'version' not set! try running 'yarn release -- <your version>'"
  exit 1
fi

yarn version "$VERSION"

if [ 0 -ne $? ]; then
  exit 1
fi

git add package.json yarn.lock
git commit -m "release $VERSION"

TAG="v$VERSION"

# git tag "$TAG"
git push
git push origin "$TAG"
