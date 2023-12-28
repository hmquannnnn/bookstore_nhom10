#!/bin/bash

curl https://sh.rustup.rs -sSf | sh

cd frontend
npm run build

rm -rf ../backend/dist
mv dist ../backend/dist
