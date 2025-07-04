# GitHub Pages Deployment Guide

## Setup Instructions

1. **Update Repository Name**: In `package.json`, update the homepage URL:
   ```json
   "homepage": "https://yourusername.github.io/your-repo-name"
   ```

2. **Update Vite Config**: The `vite.config.ts` is already configured to use the correct base path for production.

3. **Enable GitHub Pages**: 
   - Go to your repository settings on GitHub
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"

## Manual Deployment

To deploy manually from your local machine:

```bash
npm run deploy
```

This will:
1. Build the project (`npm run build`)
2. Deploy the `dist` folder to the `gh-pages` branch

## Automatic Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
1. Build and test the project on every push to `main`
2. Deploy to GitHub Pages if tests pass
3. Make your game available at: `https://yourusername.github.io/your-repo-name`

## Local Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build locally
```

## Health Heart SVG

The new 3D health heart is available at:
- New: `/sprites/loot/health_heart_3d.svg` - Proper 3D RPG-style heart
- Original: `/sprites/loot/health_heart.svg` - Original balloon-like heart

To use the new heart in your components, update the sprite paths to use `health_heart_3d.svg`.
