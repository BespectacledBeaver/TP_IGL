@echo off
setlocal

REM Get repository root directory
set "ROOT_DIR=%~dp0"
cd /d "%ROOT_DIR%"

echo ===================================================
echo Starting React Frontend Environment (Windows)
echo ===================================================

cd /d "%ROOT_DIR%FE_Seperated_Increments"

REM Install node_modules if missing
if not exist node_modules (
    echo Installing node dependencies...
    npm install
)

REM Start Vite development server
echo Starting React Vite server on http://localhost:5173/ ...
npm run dev

pause
