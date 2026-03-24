@echo off
setlocal

set BACKEND_PORT=3000

echo Step 1: Installing dependencies...
call npm install --prefix backend
if errorlevel 1 exit /b 1

call npm install --prefix frontend
if errorlevel 1 exit /b 1

echo Step 2: Starting backend in new window...
start "Backend" cmd /k "npm start --prefix backend"

echo Waiting for backend to be ready on port %BACKEND_PORT%...

:waitloop
timeout /t 2 >nul

REM Check if port is listening
netstat -an | find ":%BACKEND_PORT%" | find "LISTENING" >nul
if errorlevel 1 (
    echo Still waiting for backend...
    goto waitloop
)

echo Backend is up ✅

echo Step 3: Starting frontend in new window...
start "Frontend" cmd /k "npm start --prefix frontend"

echo All services started successfully 🚀

endlocal