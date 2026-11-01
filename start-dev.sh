#!/usr/bin/env bash

# Resolve project root directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "==================================================="
echo "Starting TP_IGL Development Environments (Linux/macOS)"
echo "==================================================="

# Trap SIGINT (Ctrl+C) and terminate background processes
cleanup() {
  echo ""
  echo "Shutting down servers..."
  kill $(jobs -p) 2>/dev/null
  wait $(jobs -p) 2>/dev/null
  echo "All servers stopped."
  exit 0
}
trap cleanup SIGINT SIGTERM

# Start Django Backend
echo "Starting Django backend on http://127.0.0.1:8000..."
(
  cd "$SCRIPT_DIR/project"
  if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment in project/venv..."
    python3 -m venv venv || python -m venv venv
  fi
  source venv/bin/activate
  pip install -r requirements.txt
  python manage.py runserver
) &
DJANGO_PID=$!

# Start React Frontend
echo "Starting React frontend (Vite) on http://localhost:5173..."
(
  cd "$SCRIPT_DIR/FE_Seperated_Increments"
  if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies first..."
    npm install
  fi
  npm run dev
) &
REACT_PID=$!

echo ""
echo "Development servers running in the background."
echo "Press [Ctrl+C] to stop all servers."
echo ""

# Wait for background jobs
wait
