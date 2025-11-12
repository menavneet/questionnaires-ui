# 🚀 GitHub Pages Deployment Guide

This guide explains how to deploy your Questionnaires UI app to GitHub Pages.

## Prerequisites

- GitHub repository: `git@github.com:menavneet/questionnaires-ui.git`
- Node.js and npm installed
- Git configured with GitHub

## Deployment Methods

### Method 1: Automatic Deployment (Recommended)

The app will automatically deploy to GitHub Pages on every push to the `main` branch.

#### Setup Steps:

1. **Add GitHub Secrets:**
   - Go to your GitHub repository
   - Navigate to: `Settings` → `Secrets and variables` → `Actions`
   - Click `New repository secret`
   - Add the following secrets:
     - `VITE_BACKDOOR_TOKEN`: Your API backdoor token
     - `VITE_API_BASE_URL`: `https://api.devnet.icm.social/api` (optional, has default)

2. **Enable GitHub Pages:**
   - Go to `Settings` → `Pages`
   - Under "Build and deployment":
     - Source: Select `GitHub Actions`
   - Save

3. **Push Your Code:**
   ```bash
   git add .
   git commit -m "Initial commit with deployment setup"
   git push origin main
   ```

4. **Monitor Deployment:**
   - Go to the `Actions` tab in your repository
   - Watch the deployment workflow run
   - Once complete, your site will be live!

#### Your Live URL:
```
https://menavneet.github.io/questionnaires-ui/
```

---

### Method 2: Manual Deployment

Use this method if you want to manually deploy.

#### Steps:

1. **Make the deploy script executable:**
   ```bash
   chmod +x deploy.sh
   ```

2. **Run the deployment:**
   ```bash
   npm run deploy
   ```

   Or directly:
   ```bash
   ./deploy.sh
   ```

3. **Wait for deployment:**
   The script will build and push to the `gh-pages` branch.

---

## GitHub Actions Workflow

The workflow file `.github/workflows/deploy.yml` does the following:

1. ✅ Checks out the code
2. ✅ Sets up Node.js
3. ✅ Installs dependencies
4. ✅ Builds the application with environment variables
5. ✅ Deploys to GitHub Pages

### Workflow Triggers:

- **Automatic:** On push to `main` branch
- **Manual:** Via the Actions tab (workflow_dispatch)

---

## Important Configuration

### Base URL Configuration

The `vite.config.js` is configured with:
```javascript
base: '/questionnaires-ui/'
```

This ensures all assets load correctly on GitHub Pages.

### Environment Variables

**For GitHub Actions (Production):**
- Set via GitHub Secrets (secure)
- `VITE_BACKDOOR_TOKEN` - Your API token
- `VITE_API_BASE_URL` - API endpoint

**For Local Development:**
- Set via `.env` file (local only, not committed)

---

## Troubleshooting

### Issue: 404 on deployment
**Solution:** 
- Check that GitHub Pages is enabled in Settings
- Verify the source is set to "GitHub Actions"
- Ensure the workflow completed successfully

### Issue: Assets not loading (blank page)
**Solution:**
- Check browser console for errors
- Verify `base: '/questionnaires-ui/'` in vite.config.js
- Clear browser cache

### Issue: API authentication fails
**Solution:**
- Add `VITE_BACKDOOR_TOKEN` secret in GitHub Settings
- Ensure the secret name matches exactly
- Re-run the deployment workflow

### Issue: Workflow fails
**Solution:**
- Check the Actions tab for error details
- Verify `package-lock.json` is committed
- Ensure all dependencies are in `package.json`

---

## File Structure

```
questionnaires-ui/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── dist/                       # Build output (generated)
├── src/                        # Source code
├── deploy.sh                   # Manual deployment script
├── vite.config.js             # Vite config with base path
└── package.json               # NPM scripts
```

---

## Manual Deployment Steps (Alternative)

If you prefer complete manual control:

```bash
# 1. Build the project
npm run build

# 2. Navigate to dist
cd dist

# 3. Initialize git (if needed)
git init
git add -A
git commit -m "Deploy"

# 4. Push to gh-pages branch
git push -f git@github.com:menavneet/questionnaires-ui.git HEAD:gh-pages

# 5. Go back
cd ..
```

---

## Updating the Deployment

### To update the live site:

**With GitHub Actions (Automatic):**
```bash
# Just push your changes
git add .
git commit -m "Your changes"
git push origin main
```

**With Manual Script:**
```bash
npm run deploy
```

---

## Security Notes

⚠️ **Important:**

1. **Never commit `.env` file** - It's in `.gitignore`
2. **Use GitHub Secrets** for sensitive data in Actions
3. **The backdoor token** is only for internal/admin use
4. **Consider adding authentication** for production deployments

---

## Verification

After deployment, verify:

1. ✅ Site is accessible at: https://menavneet.github.io/questionnaires-ui/
2. ✅ All assets load correctly (check browser console)
3. ✅ API calls work (check Network tab)
4. ✅ Filters and pagination work
5. ✅ Modal opens when clicking cards

---

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public/` folder:
   ```
   your-domain.com
   ```

2. Configure DNS settings with your domain provider

3. In GitHub Settings → Pages, add your custom domain

---

## Monitoring Deployments

- **Actions Tab:** View all deployment runs
- **Environments:** See deployment history under "github-pages"
- **Pages Settings:** View current deployment status

---

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

**Questions?** Check the main README.md or open an issue on GitHub.

🎉 **Happy Deploying!**

