// scripts/patch-dist-exports.js
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const DIST_ROOT = path.join(__dirname, '..', 'dist', 'design-system-lib');
const DIST_PKG  = path.join(DIST_ROOT, 'package.json');
const FESM_DIR  = path.join(DIST_ROOT, 'fesm2022');
const NG_PKG    = path.join(__dirname, '..', 'projects', 'design-system-lib', 'ng-package.json');

if (!fs.existsSync(DIST_PKG)) {
  console.error('dist/design-system-lib/package.json not found. Build the lib first.');
  process.exit(1);
}

// ---------- 1) Patch package.json (sideEffects + exports) ----------
const pkg = JSON.parse(fs.readFileSync(DIST_PKG, 'utf8'));

// CSS må ikke tree-shakes væk
pkg.sideEffects = Array.from(new Set([
  ...(pkg.sideEffects || []),
  './styles/**/*.css',
  './ui/**/*.css',
]));

// Find korrekt FESM-fil
let flatBase = 'design-system'; // ønsket modulbasenavn
try {
  const ngPkg = JSON.parse(fs.readFileSync(NG_PKG, 'utf8'));
  if (ngPkg?.lib?.flatModuleFile) flatBase = ngPkg.lib.flatModuleFile;
} catch (_) {}

let defaultFesm = `./fesm2022/${flatBase}.mjs`;
let candidates = [];
if (fs.existsSync(FESM_DIR)) {
  candidates = fs.readdirSync(FESM_DIR).filter(f => f.endsWith('.mjs'));
}

if (candidates.includes(`${flatBase}.mjs`)) {
  defaultFesm = `./fesm2022/${flatBase}.mjs`;
} else if (candidates.includes('design-system-lib.mjs')) {
  // fallback hvis flatModuleFile ikke er sat endnu
  defaultFesm = './fesm2022/design-system-lib.mjs';
} else if (candidates.length === 1) {
  defaultFesm = `./fesm2022/${candidates[0]}`;
} else if (candidates.length > 1) {
  candidates.sort();
  defaultFesm = `./fesm2022/${candidates[0]}`;
} else {
  console.warn('⚠️ Ingen .mjs fundet i fesm2022 — tjek ng-packagr output.');
}

// Root export (.) — sæt types + default (bevar andet hvis til stede)
pkg.exports = pkg.exports || {};
pkg.exports['.'] = pkg.exports['.'] || {};
pkg.exports['.'].types   = './index.d.ts';
pkg.exports['.'].default = defaultFesm;

// (valgfrit men anbefalet) top-level types for editor tooling
pkg.types = './index.d.ts';

// Subpath-exports til CSS og assets
pkg.exports['./styles/*']            = pkg.exports['./styles/*']            || { default: './styles/*' };
pkg.exports['./styles/globals.css']  = pkg.exports['./styles/globals.css']  || { default: './styles/globals.css' };
pkg.exports['./ui/*']                = pkg.exports['./ui/*']                || { default: './ui/*' };
pkg.exports['./assets/*']            = pkg.exports['./assets/*']            || { default: './assets/*' };
pkg.exports['./package.json']        = pkg.exports['./package.json']        || { default: './package.json' };

// Skriv package.json tilbage
fs.writeFileSync(DIST_PKG, JSON.stringify(pkg, null, 2));
console.log('✅ Patched exports ->', pkg.exports['.'].default);

// ---------- 2) Kopiér README.md ind i dist ----------
const SRC_README_LIB  = path.join(__dirname, '..', 'projects', 'design-system-lib', 'README.md');
const SRC_README_ROOT = path.join(__dirname, '..', 'README.md');
const DEST_README     = path.join(DIST_ROOT, 'README.md');

if (fs.existsSync(SRC_README_LIB)) {
  fs.copyFileSync(SRC_README_LIB, DEST_README);
  console.log('📄 Copied README.md from lib -> dist/');
} else if (fs.existsSync(SRC_README_ROOT)) {
  fs.copyFileSync(SRC_README_ROOT, DEST_README);
  console.log('📄 Copied README.md from root -> dist/');
} else {
  console.warn('⚠️ README.md not found in lib or root — nothing copied.');
}
