#!/usr/bin/env bash

# Resolve project root directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "==================================================="
echo "Running Database Initialization (Linux/macOS)"
echo "==================================================="

python3 init_db.py || python init_db.py
