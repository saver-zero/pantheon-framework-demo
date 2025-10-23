@echo off
REM Mock Claude CLI that fails with stderr output and non-zero exit code

echo Error: API rate limit exceeded. Please try again later. 1>&2
exit /b 1
