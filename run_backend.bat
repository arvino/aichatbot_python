@echo off
echo Starting Backend Server...
echo.

REM Aktifkan virtual environment jika ada
if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
)

REM Jalankan backend server
python backend_chat.py

REM Jika terjadi error, tampilkan pesan
if errorlevel 1 (
    echo.
    echo Error: Backend server failed to start
    echo Please check the error message above
    pause
) 