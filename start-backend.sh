#!/usr/bin/env bash

# Resolve project root directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/project"

echo "==================================================="
echo "Starting Django Backend Environment (Linux/macOS)"
echo "==================================================="

# Create virtual environment if missing
if [ ! -d "venv" ]; then
  echo "Creating Python virtual environment in project/venv..."
  python3 -m venv venv || python -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install requirements
echo "Checking backend requirements..."
pip install -r requirements.txt

# Run migrations (SQLite fallback is used if PostgreSQL is not active)
echo "Checking / applying database migrations..."
python manage.py migrate

# Start Django development server
echo "Starting Django development server on http://127.0.0.1:8000/ ..."
python manage.py runserver
