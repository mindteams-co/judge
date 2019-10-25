#!/usr/bin/env bash

set -o nounset -o errexit

echo "ENV is $DJANGO_ENV"
if [ "$DJANGO_ENV" != 'production' ]; then
  echo 'Error: DJANGO_ENV is not set to "production".'
  echo 'Application will not start.'
  exit 1
fi

./src/manage.py collectstatic --noinput
./src/manage.py migrate --noinput
./src/manage.py check --deploy

uwsgi --http :8000 --chdir ./src --wsgi-file ../src/judge/wsgi.py
