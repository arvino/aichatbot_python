@echo off
echo Starting AI Chatbot Application...
echo.

REM Jalankan backend di jendela baru
start "Backend Server" cmd /k run_backend.bat

REM Tunggu sebentar untuk memastikan backend sudah berjalan
timeout /t 5 /nobreak > nul

REM Jalankan frontend di jendela baru
start "Frontend Client" cmd /k run_frontend.bat

echo.
echo Application started successfully!
echo Backend and Frontend are running in separate windows.
echo.
echo Press any key to close all windows...
pause > nul

REM Tutup semua jendela cmd
taskkill /FI "WINDOWTITLE eq Backend Server*" /F
taskkill /FI "WINDOWTITLE eq Frontend Client*" /F 