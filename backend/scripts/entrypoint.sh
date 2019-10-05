#!/usr/bin/env sh

set -o errexit
CMD="$*"

postgres_ready() {
    if [ "$POSTGRES_HOST" = "" ] || [ "$POSTGRES_PORT" = "" ]; then
        echo 'Error: POSTGRES_HOST or POSTGRES_PORT is not set'
        exit 1
    fi

    sh "./scripts/wait-for-command.sh" -t 5 -s 0 52 -c "curl $POSTGRES_HOST:$POSTGRES_PORT"
    sleep 2
}

until postgres_ready; do
    >&2 echo "Postgres is unavailable"
done

>&2 echo "Postgres is up - continuing..."


if [ "$DJANGO_ENV" = 'development' ]; then
    sh "./scripts/dev-server.sh"
elif [ "$DJANGO_ENV" = 'production' ]; then
    sh "./scripts/prod-server.sh"
fi
