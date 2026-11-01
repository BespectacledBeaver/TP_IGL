@echo off
setlocal

REM Get repository root directory
set "ROOT_DIR=%~dp0"
cd /d "%ROOT_DIR%"

echo ===================================================
echo Starting TP_IGL Full Stack (Backend + Frontend)
echo ===================================================

REM 1. Start Django Backend in a new terminal window
echo Launching Django Backend in a separate window...
start "Django Backend Server" "%ROOT_DIR%start-backend.bat"

REM 2. Start React Frontend in a new terminal window
echo Launching React Frontend in a separate window...
start "React Frontend (Vite)" "%ROOT_DIR%start-frontend.bat"

echo.
echo Both services have been launched in separate terminal windows!
echo - Django Backend: http://127.0.0.1:8000/
echo - React Frontend: http://localhost:5173/
echo.
