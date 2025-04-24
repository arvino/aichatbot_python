@echo off
echo Starting Frontend Client...
echo.

REM Aktifkan virtual environment jika ada
if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
)

REM Jalankan frontend client
python frontend_chat.py

REM Jika terjadi error, tampilkan pesan
if errorlevel 1 (
    echo.
    echo Error: Frontend client failed to start
    echo Please check the error message above
    pause
) 