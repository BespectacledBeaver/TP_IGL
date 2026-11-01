#!/usr/bin/env python3
"""
TP_IGL PostgreSQL & Database Initialization Script
==================================================
This script initializes the PostgreSQL database (or local database) and populates
it with the required initial schema tables and seed content.

Can be run standalone by anyone cloning the repository:
    python init_db.py
Or with custom PostgreSQL credentials:
    DB_NAME=project DB_USER=postgres DB_PASSWORD=tpigl6mhdi DB_HOST=localhost DB_PORT=5432 python init_db.py
"""

import os
import sys
import subprocess
from pathlib import Path

# Resolve project directories
BASE_DIR = Path(__file__).resolve().parent
PROJECT_DIR = BASE_DIR / "project"

# Virtual environment python binary
if sys.platform == "win32":
    VENV_PYTHON = PROJECT_DIR / "venv" / "Scripts" / "python.exe"
    VENV_PIP = PROJECT_DIR / "venv" / "Scripts" / "pip.exe"
else:
    VENV_PYTHON = PROJECT_DIR / "venv" / "bin" / "python"
    VENV_PIP = PROJECT_DIR / "venv" / "bin" / "pip"


def run_cmd(cmd, cwd=PROJECT_DIR, check=True):
    """Executes a command and streams output."""
    print(f"\n>> Running: {' '.join(str(c) for c in cmd)}")
    result = subprocess.run(cmd, cwd=cwd)
    if check and result.returncode != 0:
        print(f"Error: Command failed with exit code {result.returncode}")
        sys.exit(result.returncode)
    return result.returncode


def setup_venv():
    """Ensure virtual environment and dependencies are installed."""
    if not VENV_PYTHON.exists():
        print(f"Creating Python virtual environment in {PROJECT_DIR / 'venv'}...")
        subprocess.run([sys.executable, "-m", "venv", str(PROJECT_DIR / "venv")], check=True)
    
    print("Installing/verifying required dependencies from requirements.txt...")
    run_cmd([str(VENV_PIP), "install", "-r", "requirements.txt"])


def try_create_postgres_database():
    """Attempts to connect to PostgreSQL and create the database if it doesn't exist."""
    db_name = os.environ.get("DB_NAME", "project")
    db_user = os.environ.get("DB_USER", "postgres")
    db_password = os.environ.get("DB_PASSWORD", "tpigl6mhdi")
    db_host = os.environ.get("DB_HOST", "localhost")
    db_port = os.environ.get("DB_PORT", "5432")

    print("\n---------------------------------------------------")
    print(f"Checking PostgreSQL connection on {db_host}:{db_port}...")
    print("---------------------------------------------------")

    check_code = f"""
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

try:
    conn = psycopg2.connect(
        dbname='postgres',
        user='{db_user}',
        password='{db_password}',
        host='{db_host}',
        port='{db_port}',
        connect_timeout=3
    )
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cur = conn.cursor()
    cur.execute("SELECT 1 FROM pg_database WHERE datname = %s;", ('{db_name}',))
    exists = cur.fetchone()
    if not exists:
        cur.execute('CREATE DATABASE "{db_name}";')
        print(f"PostgreSQL database '{db_name}' created successfully.")
    else:
        print(f"PostgreSQL database '{db_name}' already exists.")
    cur.close()
    conn.close()
    print("SUCCESS")
except Exception as e:
    print(f"PostgreSQL note: {{e}}")
    print("UNAVAILABLE")
"""

    result = subprocess.run(
        [str(VENV_PYTHON), "-c", check_code],
        cwd=PROJECT_DIR,
        capture_output=True,
        text=True
    )
    output = result.stdout + result.stderr
    print(output.strip())

    if "SUCCESS" in output:
        print("[+] PostgreSQL is online and database is ready.")
        return True
    else:
        print("[!] PostgreSQL server is not currently reachable or running locally.")
        print("    Django will initialize and seed using the SQLite database (db.sqlite3).")
        print("    (Once you start PostgreSQL, rerun this script to initialize PostgreSQL!)")
        return False


def main():
    print("===================================================")
    print("TP_IGL - Database Setup & Content Initialization")
    print("===================================================")

    # 1. Prepare environment
    setup_venv()

    # 2. Check and initialize PostgreSQL if accessible
    has_postgres = try_create_postgres_database()

    # 3. Run database migrations to create all tables
    print("\n---------------------------------------------------")
    print("Applying Django migrations to create tables...")
    print("---------------------------------------------------")
    run_cmd([str(VENV_PYTHON), "manage.py", "migrate"])

    # 4. Seed initial content (Users, Moderators, Articles, Favorites)
    print("\n---------------------------------------------------")
    print("Seeding initial data (Articles, Users, Moderators)...")
    print("---------------------------------------------------")
    run_cmd([str(VENV_PYTHON), "manage.py", "seed_db"])

    print("\n===================================================")
    print("[SUCCESS] Database initialization completed successfully!")
    print("===================================================")
    print("Initial Credentials seeded:")
    print(" - Django Admin:    admin / admin123")
    print(" - App Admin:       admin / password123")
    print(" - App Moderator:   moderator / modpass123")
    print(" - App User:        user1 / userpass123")
    print("===================================================\n")


if __name__ == "__main__":
    main()
