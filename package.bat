@echo off
REM Pro Teleprompter - Windows Packaging Script
REM This script creates a distribution ZIP file

echo ========================================
echo Pro Teleprompter - Package Creator
echo ========================================
echo.

REM Check if files exist
if not exist "index.html" (
    echo ERROR: index.html not found!
    pause
    exit /b 1
)

if not exist "styles.css" (
    echo ERROR: styles.css not found!
    pause
    exit /b 1
)

if not exist "script.js" (
    echo ERROR: script.js not found!
    pause
    exit /b 1
)

REM Create distribution folder
echo Creating distribution folder...
if exist "dist" rmdir /s /q dist
mkdir dist

REM Copy files
echo Copying files...
copy index.html dist\ >nul
copy styles.css dist\ >nul
copy script.js dist\ >nul

if exist "README.md" copy README.md dist\ >nul
if exist "USERGUIDE.md" copy USERGUIDE.md dist\ >nul

REM Create ZIP using PowerShell
echo Creating ZIP file...
powershell -Command "Compress-Archive -Path 'dist\*' -DestinationPath 'ProTeleprompter.zip' -Force"

if exist "ProTeleprompter.zip" (
    echo.
    echo ========================================
    echo SUCCESS! Package created successfully.
    echo ========================================
    echo.
    echo File: ProTeleprompter.zip
    echo Location: %CD%
    echo.
    echo You can now share this ZIP file with your friends and testers!
    echo.
) else (
    echo.
    echo ERROR: Failed to create ZIP file.
    echo.
)

REM Cleanup
echo Cleaning up...
rmdir /s /q dist

echo.
echo Press any key to exit...
pause >nul
