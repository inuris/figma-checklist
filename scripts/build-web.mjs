import { copyFileSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import * as esbuild from 'esbuild';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const docs = join(root, 'docs');

mkdirSync(docs, { recursive: true });
copyFileSync(join(root, 'web', 'index.html'), join(docs, 'index.html'));
writeFileSync(join(docs, '.nojekyll'), '');

await esbuild.build({
  entryPoints: [join(root, 'web', 'app.ts')],
  bundle: true,
  outfile: join(docs, 'app.js'),
  target: 'es2016',
});

console.log('Web build: docs/index.html + docs/app.js');
