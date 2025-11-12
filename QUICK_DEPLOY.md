# ⚡ Quick Deploy Guide

## Overview
**Build Locally → Commit dist/ → GitHub Actions Deploys Automatically**

Your API token stays secure in your local `.env` file!

---

## First Time Setup (Do Once)

### 1. Enable GitHub Pages
1. Go to: https://github.com/menavneet/questionnaires-ui/settings/pages
2. Under "Build and deployment":
   - Source: Select **"GitHub Actions"**
3. Save

### 2. Configure .env File
Ensure you have `.env` in the project root:

```env
VITE_API_BASE_URL=https://api.devnet.icm.social/api
VITE_BACKDOOR_TOKEN=your_actual_token_here
```

---

## Deploy Commands

### Quick Deploy (Recommended)
```bash
npm run deploy
```

This will:
1. Build the app locally (using your `.env`)
2. Add `dist/` folder to git
3. Commit and push to GitHub
4. GitHub Actions deploys automatically

### Manual Deploy
```bash
# Build
npm run build

# Commit dist folder
git add dist/
git commit -m "Build: Update"
git push origin main
```

---

## Workflow

```
Your Machine          GitHub              GitHub Pages
───────────          ────────            ─────────────
                                      
npm run build    →                   
(uses .env)                          
                                      
git add dist/    →                   
git commit                           
git push         →  Receives push    
                                      
                    Detects dist/   
                    changes         
                                      
                    Triggers        →  Deploys!
                    GitHub Actions     
                                      
                                       ✅ Live Site
```

---

## Your URLs

**GitHub Repo:**  
https://github.com/menavneet/questionnaires-ui

**GitHub Actions:**  
https://github.com/menavneet/questionnaires-ui/actions

**Live Site:**  
https://menavneet.github.io/questionnaires-ui/

---

## Check Deployment Status

After pushing:

```bash
# Open Actions tab to watch deployment
open https://github.com/menavneet/questionnaires-ui/actions
```

Or visit manually and check the "Deploy to GitHub Pages" workflow.

---

## Troubleshooting

### No deployment triggered?
- Ensure `dist/` folder was committed
- Check `.gitignore` - `dist` should be commented out
- Verify you pushed to `main` branch

### Site not loading?
- Wait 2-3 minutes after deployment
- Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)
- Check browser console for errors

### Build fails?
- Check `.env` file exists and has correct token
- Run `npm install` to ensure dependencies are installed
- Try `rm -rf dist && npm run build`

---

## Common Tasks

### Update Site
```bash
# Make code changes, then:
npm run deploy
```

### Test Locally First
```bash
npm run build
npm run preview
# Visit http://localhost:4173
```

### Check What Will Be Committed
```bash
npm run build
git status
git diff dist/
```

---

## Important Notes

✅ **dist/ folder IS committed** (unlike typical projects)  
✅ **GitHub Actions only deploys** (doesn't build)  
✅ **API token stays local** (in your .env file)  
✅ **Fast deployments** (no build time in CI)  

---

## Next Steps

1. Ensure `.env` is configured
2. Run: `npm run deploy`
3. Go to Actions tab and watch deployment
4. Visit your live site!

That's it! 🚀

