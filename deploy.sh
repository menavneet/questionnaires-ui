#!/bin/bash

# GitHub Pages Deployment Script
# This script builds locally and pushes to main branch
# GitHub Actions will then deploy the dist folder

set -e  # Exit on error

echo "🚀 Starting local build for GitHub Pages..."

# Check if git is initialized
if [ ! -d ".git" ]; then
  echo "❌ Error: Not a git repository. Initialize git first."
  exit 1
fi

# Check for uncommitted changes (excluding dist)
if [ -n "$(git status --porcelain | grep -v '^?? dist/')" ]; then
  echo "⚠️  Warning: You have uncommitted changes (excluding dist/)."
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

echo "📦 Building application..."
npm run build

if [ ! -d "dist" ]; then
  echo "❌ Error: Build failed - dist directory not found."
  exit 1
fi

echo "✅ Build successful!"
echo "📝 Adding dist folder to git..."
git add dist/

# Check if there are changes to commit
if git diff --staged --quiet; then
  echo "ℹ️  No changes in dist folder to commit."
  echo "💡 Tip: Your site is already up to date!"
else
  echo "💾 Committing build..."
  git commit -m "Build: Update dist folder - $(date '+%Y-%m-%d %H:%M:%S')"
  
  echo "🔗 Pushing to main branch..."
  git push origin main
  
  echo "✅ Deployment initiated!"
  echo "🌐 GitHub Actions will deploy your site to: https://menavneet.github.io/questionnaires-ui/"
  echo "⏰ Check the Actions tab to monitor deployment progress."
fi

