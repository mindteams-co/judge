#!/usr/bin/env bash

set -o nounset -o errexit

echo "ENV is $DJANGO_ENV"
if [ "$DJANGO_ENV" != 'development' ]; then
  echo 'Error: DJANGO_ENV is not set to "development".'
  echo 'Application will not start.'
  exit 1
fi

./src/manage.py collectstatic --noinput
./src/manage.py makemigrations
./src/manage.py migrate --noinput
./src/manage.py runserver 0.0.0.0:8000
