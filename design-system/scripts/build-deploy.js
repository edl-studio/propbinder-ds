#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Build deployment script for Propbinder Design System
 * Combines Angular app build and Storybook static build into a single deployment folder
 */

const sourceDir = path.join(__dirname, '..');
const deployDir = path.join(sourceDir, 'deploy');
const distDir = path.join(sourceDir, 'dist', 'design-system', 'browser');
const storybookDir = path.join(sourceDir, 'storybook-static');

// Utility functions
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`Warning: Source directory ${src} does not exist`);
    return;
  }

  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function updateHtmlPaths(filePath, basePath = '') {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Update relative paths to work from the new base path
  if (basePath) {
    content = content.replace(/href="(?!http|\/\/|\/[^\/])/g, `href="${basePath}/`);
    content = content.replace(/src="(?!http|\/\/|\/[^\/])/g, `src="${basePath}/`);
  }
  
  fs.writeFileSync(filePath, content);
}

async function main() {
  console.log('🚀 Building deployment package...');

  // Ensure deploy directory exists and is clean
  if (fs.existsSync(deployDir)) {
    fs.rmSync(deployDir, { recursive: true, force: true });
  }
  ensureDir(deployDir);

  // Copy Angular app build to /app directory
  console.log('📦 Copying Angular app build...');
  if (fs.existsSync(distDir)) {
    const appDir = path.join(deployDir, 'app');
    copyRecursive(distDir, appDir);
    console.log('✅ Angular app copied to /app directory');
  } else {
    console.error('❌ Angular app build not found. Run "npm run build:app" first.');
    process.exit(1);
  }

  // Copy Storybook build
  console.log('📚 Copying Storybook build...');
  if (fs.existsSync(storybookDir)) {
    const storybookDestDir = path.join(deployDir, 'storybook');
    copyRecursive(storybookDir, storybookDestDir);
    
    // Create index.html from storybook.html for proper routing
    const storybookHtmlPath = path.join(storybookDestDir, 'storybook.html');
    const indexHtmlPath = path.join(storybookDestDir, 'index.html');
    
    if (fs.existsSync(storybookHtmlPath)) {
      fs.copyFileSync(storybookHtmlPath, indexHtmlPath);
      console.log('✅ Created index.html from storybook.html for routing');
    }
    
    console.log('✅ Storybook copied successfully');
  } else {
    console.error('❌ Storybook build not found. Run "npm run build-storybook" first.');
    process.exit(1);
  }

  // Copy standalone HTML files and update script references
  console.log('🏗️ Copying standalone preview files...');
  const standaloneFiles = [
    'app-shell-preview.html',
    'app-shell-standalone.html'
  ];

  // Find the actual bundle file names in the app directory
  const appDir = path.join(deployDir, 'app');
  const mainJsFile = fs.readdirSync(appDir).find(file => file.startsWith('main-') && file.endsWith('.js'));
  const polyfillsJsFile = fs.readdirSync(appDir).find(file => file.startsWith('polyfills-') && file.endsWith('.js'));

  for (const file of standaloneFiles) {
    const srcPath = path.join(sourceDir, file);
    const destPath = path.join(deployDir, file);
    
    if (fs.existsSync(srcPath)) {
      let content = fs.readFileSync(srcPath, 'utf8');
      
      // Update script references with actual bundle names
      if (mainJsFile) {
        content = content.replace('/app/main-PYKPKHBU.js', `/app/${mainJsFile}`);
      }
      if (polyfillsJsFile) {
        content = content.replace('/app/polyfills-B6TNHZQ6.js', `/app/${polyfillsJsFile}`);
      }
      
      // Update other paths in HTML files to work with the new structure
      fs.writeFileSync(destPath, content);
      updateHtmlPaths(destPath);
      console.log(`✅ ${file} copied and updated with bundle references`);
    }
  }

  // Copy public assets
  console.log('🎨 Copying public assets...');
  const publicDir = path.join(sourceDir, 'public');
  if (fs.existsSync(publicDir)) {
    const publicDestDir = path.join(deployDir, 'public');
    copyRecursive(publicDir, publicDestDir);
    console.log('✅ Public assets copied successfully');
  }

  // Copy source files that might be referenced
  console.log('📂 Copying source files...');
  const srcSourceDir = path.join(sourceDir, 'src');
  if (fs.existsSync(srcSourceDir)) {
    const srcDestDir = path.join(deployDir, 'src');
    copyRecursive(srcSourceDir, srcDestDir);
    console.log('✅ Source files copied successfully');
  }

  // Use Angular app as the main landing page
  console.log('🏠 Using Angular app as main index.html...');
  
  // Copy Angular app files to root level
  const angularIndexPath = path.join(deployDir, 'app', 'index.html');
  if (fs.existsSync(angularIndexPath)) {
    const angularIndexContent = fs.readFileSync(angularIndexPath, 'utf8');
    fs.writeFileSync(path.join(deployDir, 'index.html'), angularIndexContent);
    console.log('✅ Angular app index.html copied as main index.html');
    
    // Copy Angular app JS and CSS files to root level for proper loading
    const appDir = path.join(deployDir, 'app');
    const files = fs.readdirSync(appDir);
    
    files.forEach(file => {
      if (file.endsWith('.js') || file.endsWith('.css')) {
        const srcFile = path.join(appDir, file);
        const destFile = path.join(deployDir, file);
        fs.copyFileSync(srcFile, destFile);
        console.log(`✅ Copied ${file} to root`);
      }
    });
  } else {
    console.error('❌ Angular app index.html not found at:', angularIndexPath);
  }

  // Create _redirects file for better SPA routing
  console.log('🔄 Creating redirects configuration...');
  const redirectsContent = `# App shell routes
/app-shell-preview /app-shell-preview.html 200

# Angular app routes (fallback to index.html for SPA routing)
# Note: Storybook routes are handled by vercel.json to avoid conflicts
/* /index.html 200`;

  fs.writeFileSync(path.join(deployDir, '_redirects'), redirectsContent);
  console.log('✅ Redirects configuration created');

  // Generate deployment info
  const deployInfo = {
    buildTime: new Date().toISOString(),
    version: require('../package.json').version,
    landingPage: 'Angular App (SPA)',
    components: {
      angular: fs.existsSync(distDir),
      storybook: fs.existsSync(storybookDir),
      appShellPreview: fs.existsSync(path.join(deployDir, 'app-shell-preview.html'))
    }
  };

  fs.writeFileSync(path.join(deployDir, 'deploy-info.json'), JSON.stringify(deployInfo, null, 2));
  console.log('✅ Deployment info generated');

  console.log('\n🎉 Deployment package created successfully!');
  console.log(`📁 Output directory: ${deployDir}`);
  console.log('\n📋 Deployment contents:');
  console.log('  • Angular app as main landing page (/)');
  console.log('  • Storybook documentation (/storybook/)');
  console.log('  • App Shell Preview (/app-shell-preview)');
  console.log('  • Public assets (/public/)');
  console.log('\n🚀 Ready for deployment to Vercel!');
  console.log('   Run: npm run deploy:vercel');
  console.log('   Or: npm run preview:local (for local testing)');
}

main().catch(error => {
  console.error('❌ Build failed:', error);
  process.exit(1);
});
