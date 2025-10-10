// scripts/sync-public-api.js
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const R = (...p) => path.join(__dirname, '..', ...p);

// Kilder
const SRC_UI     = R('src', 'app', 'components', 'ui');
const SRC_LIB    = R('src', 'app', 'lib');
const SRC_STYLES = R('src', 'app', 'styles'); // indeholder globals.css

// Fonte – første der findes bruges (hvis I har dem i repoet)
const FONT_CANDIDATES = [
  R('src', 'app', 'styles', 'Brockmann'),
  R('public', 'Brockmann'),
];

// Destination (library source)
const DST_ROOT   = R('projects', 'design-system-lib', 'src');
const DST_UI     = path.join(DST_ROOT, 'ui');
const DST_LIB    = path.join(DST_ROOT, 'lib');
const DST_STYLES = path.join(DST_ROOT, 'styles');
const DST_FONTS  = path.join(DST_ROOT, 'assets', 'fonts');
const PUBLIC_API = path.join(DST_ROOT, 'public-api.ts');

// Utils
const exists = (p) => fs.existsSync(p);
const rmrf   = (p) => { try { fs.rmSync(p, { recursive: true, force: true }); } catch (_) {} };
const mkdir  = (p) => fs.mkdirSync(p, { recursive: true });

function copyDir(src, dest, { filter } = {}) {
  if (!exists(src)) return 0;
  let count = 0;
  mkdir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (filter && !filter(s, entry)) continue;
    if (entry.isDirectory()) count += copyDir(s, d, { filter });
    else { fs.copyFileSync(s, d); count++; }
  }
  return count;
}

// 0) Clean
[ DST_UI, DST_LIB, DST_STYLES, DST_FONTS ].forEach(rmrf);

// 1) Copy ui/lib/styles (styles kopieres 1:1)
const skipStory = (p) => !/(\.stories\.ts|\.story\.ts|\.spec\.ts|\.mdx)$/i.test(p);

const copiedUi   = copyDir(SRC_UI,     DST_UI,     { filter: (p,e)=> e.isDirectory() || (/\.(ts|css)$/i.test(p) && skipStory(p)) });
const copiedLib  = copyDir(SRC_LIB,    DST_LIB,    { filter: (p,e)=> e.isDirectory() || /\.ts$/i.test(p) });
const copiedStls = copyDir(SRC_STYLES, DST_STYLES, { filter: () => true }); // ALT i styles kopieres uændret

// 1b) Omskriv font-URLs i kopieret globals.css til lib-assets
(function rewriteGlobalsFontUrls() {
  const globalsPath = path.join(DST_STYLES, 'globals.css');
  if (!exists(globalsPath)) return;

  let css = fs.readFileSync(globalsPath, 'utf8');

  // /Brockmann/<fil>  →  ../assets/fonts/<fil>
  css = css.replace(
    /url\((['"]?)\/Brockmann\/([^'")]+)\1\)/gi,
    (_m, q, f) => `url(${q}../assets/fonts/${f}${q})`
  );

  // relative app-stier → ../assets/fonts/<fil>
  css = css.replace(
    /url\((['"]?)\.?\.?\/?app\/styles\/Brockmann\/([^'")]+)\1\)/gi,
    (_m, q, f) => `url(${q}../assets/fonts/${f}${q})`
  );

  fs.writeFileSync(globalsPath, css, 'utf8');
})();

// 2) Copy fonts → src/assets/fonts (hvis fundet)
const SRC_FONTS = FONT_CANDIDATES.find(exists);
const copiedFonts = SRC_FONTS
  ? copyDir(SRC_FONTS, DST_FONTS, { filter: (p,e)=> e.isDirectory() || /\.(woff2?|ttf|eot|otf|txt|md|pdf)$/i.test(p) })
  : 0;

// 3) Normaliser @import til globals i ALLE kopierede UI-css-filer
(function fixCssImports(root) {
  if (!exists(root)) return;
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const p = path.join(root, entry.name);
    if (entry.isDirectory()) { fixCssImports(p); continue; }
    if (!p.toLowerCase().endsWith('.css')) continue;

    let css = fs.readFileSync(p, 'utf8');
    const before = css;

    // Peg konsekvent på ../../styles/globals.css
    css = css.replace(
      /@import\s+['"][^'"]*styles\/globals\.css['"];\s*/gi,
      "@import '../../styles/globals.css';\n"
    );

    if (css !== before) fs.writeFileSync(p, css, 'utf8');
  }
})(DST_UI);

// 4) Scrub KUN komponent-CSS (DST_UI):
//    - fjern lokale @font-face for 'Brockmann'
//    - omskriv absolutte /Brockmann/* og app/styles/Brockmann/* til ../assets/fonts/*
//    - konverter .otf → .woff2 (kun endelsen)
(function scrubComponentCss(root) {
  if (!exists(root)) return;

  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) { walk(p); continue; }
      if (!p.toLowerCase().endsWith('.css')) continue;

      let css = fs.readFileSync(p, 'utf8');
      const before = css;

      // Fjern @font-face blokke for Brockmann
      css = css.replace(/@font-face\s*\{[^}]*?\bfont-family\s*:\s*['"]Brockmann['"][^}]*\}/gis, '');

      // Omskriv absolutte stier til lib-assets
      css = css.replace(
        /url\((['"]?)\/Brockmann\/([^'")]+)\1\)/gi,
        (_m, q, f) => `url(${q}../assets/fonts/${f}${q})`
      );
      css = css.replace(
        /url\((['"]?)\.?\.?\/?app\/styles\/Brockmann\/([^'")]+)\1\)/gi,
        (_m, q, f) => `url(${q}../assets/fonts/${f}${q})`
      );

      // Konverter .otf → .woff2
      css = css.replace(/(\.\.\/assets\/fonts\/[^'")]+)\.otf(\b)/gi, (_m, base, tail) => `${base}.woff2${tail}`);

      // Ryd evt. dobbelte kommaer/semikolon
      css = css.replace(/,\s*,/g, ',').replace(/,\s*;+/g, ';');

      if (css !== before) fs.writeFileSync(p, css, 'utf8');
    }
  };

  walk(root);
})(DST_UI);

// 5) Fix TS-importer fra lib/
(function fixTsLibImports(root) {
  if (!exists(root)) return;
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const p = path.join(root, entry.name);
    if (entry.isDirectory()) { fixTsLibImports(p); continue; }
    if (!p.toLowerCase().endsWith('.ts')) continue;

    let ts = fs.readFileSync(p, 'utf8');
    const before = ts;

    ts = ts
      .replace(/from\s+(['"])\.\.\/\.\.\/\.\.\/lib\/([^'"]+)\1/g, (_m,q,r)=>`from ${q}../../lib/${r}${q}`)
      .replace(/from\s+(['"])\.\.\/\.\.\/\.\.\/\.\.\/lib\/([^'"]+)\1/g, (_m,q,r)=>`from ${q}../../lib/${r}${q}`)
      .replace(/from\s+(['"])\.\.\/\.\.\/src\/app\/lib\/([^'"]+)\1/g,       (_m,q,r)=>`from ${q}../../lib/${r}${q}`);

    if (ts !== before) fs.writeFileSync(p, ts, 'utf8');
  }
})(DST_UI);

// 6) Remove legacy aggregated CSS to avoid global leakage
try {
  const outFile = path.join(DST_UI, 'index.css');
  fs.rmSync(outFile, { force: true });
  console.log('Removed legacy', path.relative(process.cwd(), outFile));
} catch {}

// 7) public API (kun ui/index.ts eksporteres – CSS tages via package exports)
mkdir(DST_ROOT);
fs.writeFileSync(
  PUBLIC_API,
  `/* Auto-generated. Do not edit. */\nexport * from './ui/index';\n`,
  'utf8'
);

// Log
console.log(`Synced:
- UI     -> ${path.relative(process.cwd(), DST_UI)} (${copiedUi} files)
- lib    -> ${path.relative(process.cwd(), DST_LIB)} (${copiedLib} files)
- styles -> ${path.relative(process.cwd(), DST_STYLES)} (${copiedStls} files)
- fonts  -> ${path.relative(process.cwd(), DST_FONTS)} (${copiedFonts} files)`);
