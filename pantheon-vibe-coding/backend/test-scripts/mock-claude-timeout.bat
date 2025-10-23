@echo off
REM Mock Claude CLI that simulates timeout by sleeping for a long time

REM Sleep for 120 seconds to trigger timeout (timeout is 60 seconds)
timeout /t 120 /nobreak >nul
echo This should never appear due to timeout
