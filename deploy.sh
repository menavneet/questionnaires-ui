#!/bin/bash

# GitHub Pages Deployment Script
# This script builds and deploys the app to GitHub Pages

set -e  # Exit on error

echo "🚀 Starting deployment to GitHub Pages..."

# Check if dist directory exists
if [ ! -d "dist" ]; then
  echo "❌ Error: dist directory not found. Run 'npm run build' first."
  exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
  echo "❌ Error: Not a git repository. Initialize git first."
  exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)

echo "📦 Building application..."
npm run build

echo "📁 Navigating to dist directory..."
cd dist

# Initialize git in dist folder
if [ ! -d ".git" ]; then
  git init
fi

echo "📝 Adding files to git..."
git add -A

echo "💾 Creating commit..."
git commit -m "Deploy to GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')"

echo "🔗 Pushing to gh-pages branch..."
# Force push to gh-pages branch
git push -f git@github.com:menavneet/questionnaires-ui.git HEAD:gh-pages

cd ..

echo "✅ Deployment complete!"
echo "🌐 Your site will be available at: https://menavneet.github.io/questionnaires-ui/"
echo "⏰ Note: It may take a few minutes for changes to appear."

