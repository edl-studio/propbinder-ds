# Deployment Guide - Propbinder Design System

This guide covers how to deploy the Propbinder Design System to Vercel, which includes both the Storybook documentation and the Angular application shell preview.

## 🏗️ What Gets Deployed

The deployment includes:

1. **Storybook** (`/storybook/`) - Interactive component documentation
2. **Angular App Shell Preview** (`/app-shell-preview`) - Complete application shell
3. **Standalone Preview** (`/app-shell-standalone`) - Full-screen app shell
4. **Landing Page** (`/`) - Navigation hub for all resources

## 🚀 Quick Deployment

### Prerequisites

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

### Deploy to Vercel

1. **Build the deployment package:**
   ```bash
   npm run build:deploy
   ```

2. **Deploy to Vercel:**
   ```bash
   npm run deploy:vercel
   ```

   Or use Vercel CLI directly:
   ```bash
   vercel --prod
   ```

## 🧪 Local Testing

Before deploying, you can test the build locally:

```bash
# Build the deployment package
npm run build:deploy

# Start local preview server
npm run preview:local

# Open http://localhost:3000 in your browser
```

## 📁 Build Scripts

| Script | Description |
|--------|-------------|
| `build:deploy` | Complete deployment build (cleans, builds Angular app, builds Storybook, copies files) |
| `build:clean` | Removes the deploy folder |
| `build:app` | Builds Angular app in production mode |
| `build:copy` | Copies and organizes files for deployment |
| `preview:local` | Serves the deploy folder locally for testing |
| `deploy:vercel` | Deploys to Vercel production |

## 🔧 Configuration Files

### `vercel.json`
- Configures build command and output directory
- Sets up URL rewrites for SPA routing
- Adds security headers
- Handles routing for Storybook and app shell previews

### `scripts/build-deploy.js`
- Node.js script that combines Angular and Storybook builds
- Creates unified deployment structure
- Updates HTML file paths
- Generates navigation index page

## 🌐 URL Structure

After deployment, your site will have the following structure:

```
https://your-domain.vercel.app/
├── /                           # Landing page with navigation
├── /storybook/                 # Storybook documentation
├── /app-shell-preview          # App shell preview page
├── /app-shell-standalone       # Standalone app shell
└── /public/                    # Static assets (fonts, icons, etc.)
```

## 🐛 Troubleshooting

### Build Failures

1. **Angular build fails:**
   - Check for TypeScript errors: `npm run build`
   - Verify all components are properly imported

2. **Storybook build fails:**
   - Test Storybook locally: `npm run storybook`
   - Check for story configuration issues

3. **Deployment script fails:**
   - Ensure both Angular and Storybook builds completed successfully
   - Check file permissions on `scripts/build-deploy.js`

### Runtime Issues

1. **App shell preview not loading:**
   - Check browser console for JavaScript errors
   - Verify Angular app built correctly
   - Check that all assets are accessible

2. **Storybook not loading:**
   - Check for missing static assets
   - Verify Storybook built correctly

## 📊 Performance Notes

- The Angular app bundle is approximately 2.3MB (449KB gzipped)
- Storybook adds additional assets for documentation
- Consider enabling Vercel's Edge Caching for better performance
- Large bundle size is expected for a comprehensive design system

## 🔄 Continuous Deployment

To set up automatic deployments:

1. Connect your repository to Vercel
2. Configure build settings:
   - **Build Command:** `npm run build:deploy`
   - **Output Directory:** `deploy`
   - **Install Command:** `npm install`

3. Set up branch protection to trigger deployments on main branch pushes

## 📝 Environment Variables

No environment variables are required for basic deployment. If you need to customize the build:

- `NODE_ENV=production` (automatically set by Vercel)
- Custom API endpoints can be configured in Angular environment files

## 🎯 Next Steps

After successful deployment:

1. **Test all routes** - Verify Storybook, app shell previews work
2. **Performance audit** - Use Lighthouse to check performance
3. **Custom domain** - Configure your custom domain in Vercel
4. **Analytics** - Set up Vercel Analytics for usage insights
5. **Monitoring** - Configure error tracking and performance monitoring

## 📞 Support

If you encounter issues:

1. Check the [Vercel documentation](https://vercel.com/docs)
2. Review build logs in Vercel dashboard
3. Test locally using `npm run preview:local`
4. Check this repository's Issues section for known problems
