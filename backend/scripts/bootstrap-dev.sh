#!/usr/bin/env bash

echo "Creating .env file..."
cp ./backend/config/.env.dev ./backend/config/.env

echo "Starting containers..."
make build && make start


echo "Setup complete."
echo ""
