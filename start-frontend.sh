#!/usr/bin/env bash

# Resolve project root directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/FE_Seperated_Increments"

echo "==================================================="
echo "Starting React Frontend Environment (Linux/macOS)"
echo "==================================================="

# Install node dependencies if missing
if [ ! -d "node_modules" ]; then
  echo "Installing frontend dependencies..."
  npm install
fi

# Start Vite development server
echo "Starting React Vite server on http://localhost:5173/ ..."
npm run dev
