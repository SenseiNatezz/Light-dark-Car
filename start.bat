@echo off
REM ── Apex Motors launcher ──────────────────────────────────────────
REM Double-click this file to start the website and open it in your browser.
REM Requires Node.js (https://nodejs.org). Keep this window open while using
REM the site — closing it stops the local server.

cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo  Node.js is not installed. Get it from https://nodejs.org then try again.
  echo.
  pause
  exit /b 1
)

if not exist node_modules (
  echo  First-time setup: installing dependencies, please wait...
  call npm install
)

echo.
echo  Starting Apex Motors... your browser will open automatically.
echo  Leave this window open while you use the site.
echo.
call npm run dev -- --open
