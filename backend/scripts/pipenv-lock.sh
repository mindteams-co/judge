#!/usr/bin/env bash

echo "Generating a Pipfile.lock for this project..."

# I have to change directory due to https://github.com/pypa/pipenv/issues/2210
docker run -it -v ${PWD}/backend:/backend python:3.7.4 \
 sh -c "cd backend; pip install --upgrade pip && pip install pipenv && pipenv lock"
