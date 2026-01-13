#!/bin/bash
# Push to GitHub - Interactive Script

echo "========================================"
echo "Push Pro Teleprompter to GitHub"
echo "========================================"
echo ""

# Get GitHub username
read -p "Enter your GitHub username: " username

echo ""
echo "Preparing to push to: https://github.com/$username/pro-teleprompter.git"
echo ""
echo "Commands to run:"
echo "1. git branch -M main"
echo "2. git remote add origin https://github.com/$username/pro-teleprompter.git"
echo "3. git push -u origin main"
echo ""

read -p "Continue? (Y/N): " confirm
if [[ ! $confirm =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 1
fi

echo ""
echo "========================================"
echo "Step 1: Renaming branch to main..."
echo "========================================"
git branch -M main

echo ""
echo "========================================"
echo "Step 2: Adding remote repository..."
echo "========================================"
git remote add origin https://github.com/$username/pro-teleprompter.git

echo ""
echo "========================================"
echo "Step 3: Pushing to GitHub..."
echo "========================================"
echo ""
echo "You may be prompted for authentication."
echo "Use your GitHub Personal Access Token as the password."
echo ""
git push -u origin main

echo ""
echo "========================================"
if [ $? -eq 0 ]; then
    echo "SUCCESS! Repository pushed to GitHub!"
    echo ""
    echo "Your repository is now live at:"
    echo "https://github.com/$username/pro-teleprompter"
    echo ""
    echo "Next steps:"
    echo "1. Visit your repository"
    echo "2. Add topics in Settings"
    echo "3. Enable GitHub Pages (optional)"
else
    echo ""
    echo "Push failed. Common issues:"
    echo "- Authentication failed: Generate a Personal Access Token"
    echo "- Remote already exists: Run 'git remote remove origin' first"
    echo ""
    echo "See PUSH_TO_GITHUB.md for detailed help."
fi
echo "========================================"
echo ""
