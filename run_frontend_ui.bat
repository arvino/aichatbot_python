@echo off
echo Starting Frontend UI Server...
echo.

REM Pindah ke direktori frontend
cd frontend

REM Install dependencies jika belum
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

REM Jalankan server
echo Starting Node.js server...
call npm start

REM Jika terjadi error, tampilkan pesan
if errorlevel 1 (
    echo.
    echo Error: Frontend UI server failed to start
    echo Please check the error message above
    pause
) 