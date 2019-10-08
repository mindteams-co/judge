#!/usr/bin/env bash

echo "Creating .env file..."
cp ./backend/config/.env.dev ./backend/config/.env

echo "Starting containers..."
make build && make start

echo "Loading fixtures"
make run-fixtures

echo "Setup complete."
echo ""
