import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { build } from 'esbuild';

const root = fileURLToPath(new URL('../', import.meta.url));
const distribution = path.join(root, 'dist/ngx-barcode6');
const pkg = JSON.parse(await readFile(path.join(distribution, 'package.json'), 'utf8'));
assert.equal(pkg.type, 'module');
const workspace = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
assert.equal(pkg.version, workspace.version);
assert.equal(pkg.peerDependencies.jsbarcode, undefined);
assert.equal(pkg.dependencies.jsbarcode, undefined);
const types = await readFile(path.join(distribution, pkg.typings), 'utf8');
assert.doesNotMatch(types, /from ['"]jsbarcode['"]|import\(['"]jsbarcode['"]\)/);
const license = await readFile(path.join(distribution, 'THIRD_PARTY_LICENSES.txt'), 'utf8');
assert.match(license, /Copyright \(c\) 2016 Johan Lindell/);
assert.match(license, /Permission is hereby granted/);
const result = await build({
  absWorkingDir: root,
  entryPoints: [path.join(distribution, pkg.module)],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  external: ['@angular/*', 'tslib'],
  write: false,
  metafile: true,
});
assert.ok(Object.values(result.metafile.inputs).every(input => input.format !== 'cjs'));
const imports = Object.values(result.metafile.outputs).flatMap(output => output.imports);
assert.ok(imports.every(entry => entry.path.startsWith('@angular/') || entry.path === 'tslib'));
assert.doesNotMatch(result.outputFiles[0].text, /module\.exports|__commonJS|require\(['"]jsbarcode/);
await import('@angular/compiler');
const exported = await import(new URL('../dist/ngx-barcode6/fesm2022/ngx-barcode6.mjs', import.meta.url));
assert.equal(typeof exported.NgxBarcode6, 'function');
console.log('Готовый пакет: ESM, типы, лицензия и импорт без DOM проверены; CommonJS отсутствует.');
