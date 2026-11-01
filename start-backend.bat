@echo off
setlocal

REM Get repository root directory
set "ROOT_DIR=%~dp0"
cd /d "%ROOT_DIR%"

echo ===================================================
echo Starting Django Backend Environment (Windows)
echo ===================================================

cd /d "%ROOT_DIR%project"

REM Create virtual environment if it does not exist
if not exist venv (
    echo Creating Python virtual environment in project\venv...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Ensure dependencies are installed
echo Checking backend requirements...
pip install -r requirements.txt

REM Run migrations (SQLite fallback is used if PostgreSQL is not active)
echo Checking / applying database migrations...
python manage.py migrate

REM Start Django development server
echo Starting Django development server on http://127.0.0.1:8000/ ...
python manage.py runserver

pause
