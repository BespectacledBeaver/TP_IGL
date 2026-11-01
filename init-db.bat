@echo off
setlocal

REM Get repository root directory
set "ROOT_DIR=%~dp0"
cd /d "%ROOT_DIR%"

echo ===================================================
echo Running Database Initialization (Windows)
echo ===================================================

python init_db.py

pause
