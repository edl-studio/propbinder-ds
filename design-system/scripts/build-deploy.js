#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Build deployment script for Propbinder Design System
 * Combines Ionic App, Angular app, and Storybook static build into a single deployment folder
 */

const sourceDir = path.join(__dirname, '..');
const deployDir = path.join(sourceDir, 'deploy');
const distDir = path.join(sourceDir, 'dist', 'design-system', 'browser');
const storybookDir = path.join(sourceDir, 'storybook-static');
const ionicAppDir = path.join(sourceDir, 'ionic-app', 'dist', 'ionic-app', 'browser');

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

  // Backup Vercel config files before cleaning
  const vercelBackup = path.join(deployDir, '.vercel');
  const vercelJsonPath = path.join(deployDir, 'vercel.json');
  const packageJsonPath = path.join(deployDir, 'package.json');
  
  let vercelConfig = null;
  let vercelJson = null;
  let packageJson = null;
  
  if (fs.existsSync(vercelBackup)) {
    vercelConfig = fs.readFileSync(path.join(vercelBackup, 'project.json'), 'utf8');
  }
  if (fs.existsSync(vercelJsonPath)) {
    vercelJson = fs.readFileSync(vercelJsonPath, 'utf8');
  }
  if (fs.existsSync(packageJsonPath)) {
    packageJson = fs.readFileSync(packageJsonPath, 'utf8');
  }

  // Ensure deploy directory exists and is clean
  if (fs.existsSync(deployDir)) {
    fs.rmSync(deployDir, { recursive: true, force: true });
  }
  ensureDir(deployDir);
  
  // Restore Vercel config files
  if (vercelConfig) {
    ensureDir(vercelBackup);
    fs.writeFileSync(path.join(vercelBackup, 'project.json'), vercelConfig);
    fs.writeFileSync(path.join(vercelBackup, '.gitignore'), '*\n');
    console.log('✅ Restored Vercel project config');
  }
  if (vercelJson) {
    fs.writeFileSync(vercelJsonPath, vercelJson);
    console.log('✅ Restored vercel.json');
  }
  if (packageJson) {
    fs.writeFileSync(packageJsonPath, packageJson);
    console.log('✅ Restored package.json');
  }

  // Copy Ionic App build to root directory (main landing page)
  console.log('📱 Copying Ionic App build...');
  if (fs.existsSync(ionicAppDir)) {
    copyRecursive(ionicAppDir, deployDir);
    console.log('✅ Ionic App copied to root directory');
  } else {
    console.error('❌ Ionic App build not found. Run "cd ../ionic-app && npm run build" first.');
    console.error('   Expected path:', ionicAppDir);
    process.exit(1);
  }

  // Copy Angular app build to /app directory
  console.log('📦 Copying Angular app build to /app...');
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

  // Find the actual bundle file names in the /app directory
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
    // Copy to /public subdirectory for backup
    const publicDestDir = path.join(deployDir, 'public');
    copyRecursive(publicDir, publicDestDir);
    
    // Copy public assets to root level (excluding HTML files to avoid overwriting)
    const entries = fs.readdirSync(publicDir, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(publicDir, entry.name);
      const destPath = path.join(deployDir, entry.name);
      
      // Skip HTML files to avoid overwriting index.html and other important files
      if (entry.isFile() && entry.name.endsWith('.html')) {
        console.log(`  ⏭️  Skipping ${entry.name} to preserve existing file`);
        continue;
      }
      
      if (entry.isDirectory()) {
        copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
    console.log('✅ Public assets copied to both /public and root level (HTML files excluded from root)');
  }

  // Copy source files that might be referenced
  console.log('📂 Copying source files...');
  const srcSourceDir = path.join(sourceDir, 'src');
  if (fs.existsSync(srcSourceDir)) {
    const srcDestDir = path.join(deployDir, 'src');
    copyRecursive(srcSourceDir, srcDestDir);
    console.log('✅ Source files copied successfully');
  }

  // Ionic App is the main landing page
  console.log('✅ Ionic App is the main landing page at /');

  // Create _redirects file for better SPA routing
  console.log('🔄 Creating redirects configuration...');
  const redirectsContent = `# Storybook routes - serve storybook files directly
/storybook /storybook/index.html 200
/storybook/* /storybook/:splat 200

# Design System app routes
/app /app/index.html 200
/app/* /app/:splat 200

# App shell routes
/app-shell-preview /app-shell-preview.html 200

# Ionic App routes (fallback to index.html for SPA routing)
# This catch-all must be last
/* /index.html 200`;

  fs.writeFileSync(path.join(deployDir, '_redirects'), redirectsContent);
  console.log('✅ Redirects configuration created');

  // Generate deployment info
  const deployInfo = {
    buildTime: new Date().toISOString(),
    version: require('../package.json').version,
    landingPage: 'Ionic App (Mobile SPA)',
    components: {
      ionicApp: fs.existsSync(ionicAppDir),
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
  console.log('  • Ionic App as main landing page (/)');
  console.log('  • Storybook documentation (/storybook/)');
  console.log('  • Design System app (/app/)');
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
