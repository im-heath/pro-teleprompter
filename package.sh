#!/bin/bash
# Pro Teleprompter - Mac/Linux Packaging Script
# This script creates a distribution ZIP file

echo "========================================"
echo "Pro Teleprompter - Package Creator"
echo "========================================"
echo ""

# Check if files exist
if [ ! -f "index.html" ]; then
    echo "ERROR: index.html not found!"
    exit 1
fi

if [ ! -f "styles.css" ]; then
    echo "ERROR: styles.css not found!"
    exit 1
fi

if [ ! -f "script.js" ]; then
    echo "ERROR: script.js not found!"
    exit 1
fi

# Create distribution folder
echo "Creating distribution folder..."
rm -rf dist
mkdir -p dist

# Copy files
echo "Copying files..."
cp index.html dist/
cp styles.css dist/
cp script.js dist/

if [ -f "README.md" ]; then
    cp README.md dist/
fi

if [ -f "USERGUIDE.md" ]; then
    cp USERGUIDE.md dist/
fi

# Create ZIP
echo "Creating ZIP file..."
cd dist
zip -r ../ProTeleprompter.zip * > /dev/null 2>&1
cd ..

if [ -f "ProTeleprompter.zip" ]; then
    echo ""
    echo "========================================"
    echo "SUCCESS! Package created successfully."
    echo "========================================"
    echo ""
    echo "File: ProTeleprompter.zip"
    echo "Location: $(pwd)"
    echo ""
    echo "You can now share this ZIP file with your friends and testers!"
    echo ""
else
    echo ""
    echo "ERROR: Failed to create ZIP file."
    echo ""
    exit 1
fi

# Cleanup
echo "Cleaning up..."
rm -rf dist

echo "Done!"
