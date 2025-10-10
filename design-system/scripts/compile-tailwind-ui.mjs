// scripts/compile-tailwind-ui.mjs
import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const ROOT = path.join(process.cwd());
const LIB_UI = path.join(ROOT, 'projects', 'design-system-lib', 'src', 'ui');
const TAILWIND_CONFIG = path.join(ROOT, 'tailwind.config.js');

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

async function compileFile(file) {
  const cssIn = fs.readFileSync(file, 'utf8');

  // PostCSS pipeline: Tailwind + Autoprefixer
  const result = await postcss([
    tailwindcss(TAILWIND_CONFIG),
    autoprefixer(),
  ]).process(cssIn, {
    from: file,
    to: file,
    map: false,
  });

  fs.writeFileSync(file, result.css, 'utf8');
  console.log('✓ Compiled', path.relative(ROOT, file));
}

async function main() {
  if (!fs.existsSync(LIB_UI)) {
    console.error('UI directory not found:', LIB_UI);
    process.exit(1);
  }

  const files = Array.from(walk(LIB_UI))
    .filter(f => /[\\/](ds-[^/]+)\.css$/i.test(f)); // kun komponent-CSS

  if (files.length === 0) {
    console.warn('No component CSS files found under', LIB_UI);
    return;
  }

  for (const f of files) {
    await compileFile(f);
  }

  console.log('\nAll component CSS compiled with Tailwind. 🎉');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
