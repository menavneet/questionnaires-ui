# 🚀 GitHub Pages Deployment Guide

This guide explains how to deploy your Questionnaires UI app to GitHub Pages.

## Deployment Strategy

**Build Locally → Commit dist/ → GitHub Actions Deploys**

This approach:
- ✅ Builds on your machine (with your local `.env` file)
- ✅ Commits the `dist/` folder to the repository
- ✅ GitHub Actions automatically deploys when `dist/` changes
- ✅ No need to add API secrets to GitHub

## Prerequisites

- GitHub repository: `git@github.com:menavneet/questionnaires-ui.git`
- Node.js and npm installed
- Git configured with GitHub
- `.env` file configured locally with your API token

---

## Quick Start

### 1. Setup GitHub Pages (One-time)

Go to your GitHub repository settings:

1. Navigate to: `Settings` → `Pages`
2. Under "Build and deployment":
   - **Source:** Select `GitHub Actions`
3. Save

### 2. Configure Local Environment

Ensure your `.env` file exists with:

```env
VITE_API_BASE_URL=https://api.devnet.icm.social/api
VITE_BACKDOOR_TOKEN=your_actual_token_here
```

### 3. Build and Deploy

Run the deployment script:

```bash
npm run deploy
```

Or manually:

```bash
./deploy.sh
```

**What happens:**
1. 🏗️ Builds the app locally (using your `.env` file)
2. 📦 Adds the `dist/` folder to git
3. 💾 Commits the changes
4. 🚀 Pushes to GitHub
5. ⚡ GitHub Actions automatically deploys

### 4. Monitor Deployment

- Go to the **Actions** tab in your GitHub repository
- Watch the "Deploy to GitHub Pages" workflow
- Once complete, your site is live!

**Your Live URL:**
```
https://menavneet.github.io/questionnaires-ui/
```

---

## Manual Deployment Steps

If you prefer step-by-step control:

### Step 1: Build locally
```bash
npm run build
```

### Step 2: Add and commit dist folder
```bash
git add dist/
git commit -m "Build: Update dist folder"
```

### Step 3: Push to GitHub
```bash
git push origin main
```

### Step 4: GitHub Actions deploys automatically
The workflow will trigger and deploy your site!

---

## How It Works

### Local Build Process
1. You run `npm run build` locally
2. Vite builds the app using your `.env` file
3. Output goes to `dist/` folder
4. `dist/` is NOT in `.gitignore` (unlike typical setups)

### GitHub Actions Workflow
The `.github/workflows/deploy.yml` file:
1. Triggers on push to `main` branch when `dist/**` changes
2. Checks out the repository
3. Verifies `dist/` folder exists
4. Uploads `dist/` contents to GitHub Pages
5. Deploys to your site

**Key difference:** GitHub Actions DOES NOT build - it only deploys the pre-built files!

---

## File Configuration

### `.gitignore`
```bash
node_modules
# dist - Committed for GitHub Pages deployment
dist-ssr
*.local
```
Note: `dist` is commented out, so it WILL be committed.

### `vite.config.js`
```javascript
base: '/questionnaires-ui/'  // GitHub Pages base path
```

### `package.json`
```json
"scripts": {
  "deploy": "npm run build && ./deploy.sh"
}
```

---

## Advantages of This Approach

✅ **Security:** No need to add API tokens to GitHub Secrets  
✅ **Simplicity:** Build with your local environment  
✅ **Control:** You see exactly what's being deployed  
✅ **Fast:** No build time in GitHub Actions  
✅ **Debugging:** Easy to test locally before pushing  

---

## Workflow Diagram

```
┌─────────────────┐
│  Local Machine  │
│                 │
│  1. Edit code   │
│  2. npm build   │ ← Uses .env file
│  3. git commit  │ ← Commits dist/
│  4. git push    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     GitHub      │
│                 │
│  5. Receives    │
│     push event  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ GitHub Actions  │
│                 │
│  6. Detects     │
│     dist/ change│
│  7. Deploys     │
│     dist/ folder│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  GitHub Pages   │
│                 │
│  8. Site Live!  │
│  ✅ Published   │
└─────────────────┘
```

---

## Common Workflows

### Updating Your Site

```bash
# 1. Make changes to your code
vim src/App.jsx

# 2. Build and deploy
npm run deploy

# Done! GitHub Actions will deploy automatically
```

### Check Deployment Status

```bash
# After pushing, check GitHub
# Go to: https://github.com/menavneet/questionnaires-ui/actions
```

### Test Build Before Deploying

```bash
# Build locally
npm run build

# Preview the build
npm run preview

# If satisfied, commit and push
git add dist/
git commit -m "Build: Update"
git push origin main
```

---

## Troubleshooting

### Issue: GitHub Actions fails with "dist folder not found"
**Cause:** The dist folder wasn't committed  
**Solution:**
```bash
# Ensure dist is not in .gitignore
git add dist/ -f
git commit -m "Add dist folder"
git push origin main
```

### Issue: Site shows 404 or blank page
**Cause:** Base path mismatch  
**Solution:** Verify in `vite.config.js`:
```javascript
base: '/questionnaires-ui/'  // Must match repo name
```

### Issue: API calls fail on GitHub Pages
**Cause:** Build didn't use correct environment variables  
**Solution:** 
1. Check your `.env` file locally
2. Rebuild: `npm run build`
3. Commit and push the new dist folder

### Issue: Changes not appearing on site
**Cause:** Browser cache or GitHub Pages cache  
**Solution:**
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Wait 2-3 minutes for GitHub Pages cache to clear
3. Check Actions tab to ensure deployment completed

### Issue: Deploy script permission denied
**Cause:** Script not executable  
**Solution:**
```bash
chmod +x deploy.sh
```

---

## Advanced: Manual Control

If you want full manual control without the script:

```bash
# 1. Build
npm run build

# 2. Check what changed
git status

# 3. Add dist folder
git add dist/

# 4. Commit
git commit -m "Build: Update dist"

# 5. Push
git push origin main

# 6. Monitor at https://github.com/menavneet/questionnaires-ui/actions
```

---

## Updating Environment Variables

To change API tokens or URLs:

1. **Update `.env` locally:**
   ```bash
   vim .env  # Update VITE_BACKDOOR_TOKEN
   ```

2. **Rebuild:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   ```bash
   git add dist/
   git commit -m "Build: Update with new API token"
   git push origin main
   ```

---

## GitHub Actions Workflow Triggers

The workflow triggers when:
- ✅ You push to `main` branch
- ✅ Changes are detected in `dist/**` folder
- ✅ Manual trigger via Actions tab (workflow_dispatch)

The workflow does NOT trigger when:
- ❌ You only change source files (without updating dist/)
- ❌ You push to other branches

---

## Security Notes

### ✅ This approach is secure because:
- API tokens stay in your local `.env` file
- Tokens are NOT in GitHub Secrets
- Tokens are NOT in source code
- `.env` is in `.gitignore`

### ⚠️ Important:
- The **built files** in `dist/` contain your API endpoint URLs
- Anyone can see the API URL (it's in the JavaScript bundle)
- Your **API token** is also visible in the JavaScript (it's used by the browser)
- **This is expected for client-side apps**
- For production, consider:
  - A backend proxy to hide the token
  - Token-based authentication with user login
  - Rate limiting on the API

---

## Comparison: Build Locally vs GitHub Actions Build

| Aspect | Build Locally (This Setup) | Build in GitHub Actions |
|--------|---------------------------|------------------------|
| API Token Location | Local `.env` file | GitHub Secrets |
| Build Speed | Your machine | GitHub servers |
| Build Time in CI | None (just deploy) | 1-3 minutes |
| Easy to debug | ✅ Yes | ❌ Harder |
| Requires local setup | ✅ Yes | ❌ No |
| Token in GitHub | ❌ No | ✅ Yes |
| CI/CD complexity | ⭐ Simple | ⭐⭐ Medium |

---

## Monitoring

### Check Deployment Status

**GitHub Actions Tab:**
```
https://github.com/menavneet/questionnaires-ui/actions
```

**GitHub Pages Settings:**
```
https://github.com/menavneet/questionnaires-ui/settings/pages
```

**Live Site:**
```
https://menavneet.github.io/questionnaires-ui/
```

---

## Rollback

To rollback to a previous version:

```bash
# 1. Find the commit with the working build
git log --oneline dist/

# 2. Checkout that version of dist
git checkout <commit-hash> -- dist/

# 3. Commit the rollback
git commit -m "Rollback: Restore previous build"

# 4. Push
git push origin main
```

---

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

## Quick Reference Commands

```bash
# Full deployment
npm run deploy

# Just build
npm run build

# Preview build locally
npm run preview

# Manual deployment
git add dist/ && git commit -m "Build: Update" && git push origin main

# Check git status
git status

# View GitHub Actions
open https://github.com/menavneet/questionnaires-ui/actions

# View live site
open https://menavneet.github.io/questionnaires-ui/
```

---

**Questions?** Check the main README.md or open an issue on GitHub.

🎉 **Happy Deploying!**
