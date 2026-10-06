import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import path from 'node:path';
import { build } from 'esbuild';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
const packagePath = require.resolve('jsbarcode/package.json');
const packageRoot = path.dirname(packagePath);
const upstream = JSON.parse(await readFile(packagePath, 'utf8'));
if (upstream.version !== '3.12.3') {
  throw new Error('ESM-упаковка проверена только для JsBarcode 3.12.3');
}
const entry = path.join(packageRoot, 'src/JsBarcode.js');
const source = await readFile(entry, 'utf8');
const expectedHash = '397836e73cab5d69f19343677913dd240408a262a00b62c19347af53614d8771';
if (createHash('sha256').update(source).digest('hex') !== expectedHash) {
  throw new Error('Исходный файл JsBarcode изменился: требуется проверка преобразования');
}
const commonJsExport = 'module.exports = JsBarcode;';
if (source.split(commonJsExport).length !== 2) {
  throw new Error('Не найден единственный ожидаемый экспорт JsBarcode');
}
const destination = path.join(root, 'projects/ngx-barcode6/src/lib/vendor/jsbarcode.ts');
const result = await build({
  absWorkingDir: root,
  entryPoints: [entry],
  outfile: destination,
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  charset: 'utf8',
  legalComments: 'none',
  write: false,
  metafile: true,
  banner: { js: '/*! JsBarcode 3.12.3 — Copyright (c) 2016 Johan Lindell. MIT; см. THIRD_PARTY_LICENSES.txt. */' },
  plugins: [{
    name: 'jsbarcode-esm',
    setup(builder) {
      builder.onLoad({ filter: /[\\/]src[\\/]JsBarcode\.js$/ }, ({ path: inputPath }) => {
        if (inputPath !== entry) return;
        return { contents: source.replace(commonJsExport, 'export default JsBarcode;'), loader: 'js', resolveDir: path.dirname(entry) };
      });
    },
  }],
});
if (Object.values(result.metafile.inputs).some(input => input.format === 'cjs') ||
    Object.values(result.metafile.outputs).some(output => output.imports.length !== 0)) {
  throw new Error('ESM-упаковка содержит CommonJS или внешние зависимости');
}
await mkdir(path.dirname(destination), { recursive: true });
const code = result.outputFiles[0].text;
const exportBlock = /export \{\s*JsBarcode_default as default\s*\};?\s*$/;
if (!exportBlock.test(code)) throw new Error('Неожиданный экспорт сгенерированного ESM');
const typedExport = `type BarcodeFunction = {
  (element: any): any;
  (element: any, value: string, options?: any): void;
};
const barcode: BarcodeFunction = JsBarcode_default;
export default barcode;
`;
await writeFile(destination, '// @ts-nocheck\n// Сгенерировано из JsBarcode 3.12.3; изменять нужно scripts/build-jsbarcode.mjs.\n' + code.replace(exportBlock, typedExport));
const license = await readFile(path.join(packageRoot, 'MIT-LICENSE.txt'), 'utf8');
await writeFile(path.join(root, 'projects/ngx-barcode6/THIRD_PARTY_LICENSES.txt'),
  'JsBarcode 3.12.3\nhttps://github.com/lindell/JsBarcode/tree/v3.12.3\n\n' + license.replace(/\r\n/g, '\n'));
console.log('JsBarcode 3.12.3: ESM без CommonJS и внешних зависимостей; лицензия сохранена.');
