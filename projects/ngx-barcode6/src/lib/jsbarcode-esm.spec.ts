import originalJsBarcode from 'jsbarcode';
import esmJsBarcode from './vendor/jsbarcode';

const cases: [string, string][] = [
  ['CODE128', 'Example_128_1234567890'],
  ['CODE128A', 'EXAMPLE\n1234'],
  ['CODE128B', 'Example1234'],
  ['CODE128C', '12345678'],
  ['CODE39', 'CODE39 Barcode'],
  ['CODE93', 'CODE93'],
  ['EAN13', '5901234123457'],
  ['UPC', '123456789999'],
  ['EAN8', '96385074'],
  ['EAN5', '54495'],
  ['EAN2', '53'],
  ['ITF', '123456'],
  ['ITF14', '12345678901231'],
  ['MSI', '1234'],
  ['MSI10', '1234'],
  ['MSI11', '1234'],
  ['MSI1010', '1234'],
  ['MSI1110', '1234'],
  ['pharmacode', '1234'],
  ['codabar', '1234567890'],
];

function options(format: string) {
  return {
    format, width: 3, height: 72, displayValue: true,
    font: 'monospace', fontSize: 18, fontOptions: 'bold',
    textPosition: 'top', textAlign: 'left', textMargin: 5,
    marginTop: 4, marginBottom: 6, marginLeft: 8, marginRight: 10,
    lineColor: '#123456', background: '#eeeeee',
  };
}

function createElement(type: 'svg' | 'canvas' | 'img') {
  return type === 'svg'
    ? document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    : document.createElement(type);
}

describe('Совместимость ESM-упаковки JsBarcode 3.12.3', () => {
  it.each(cases)('данные кодирования %s совпадают с исходной версией', (format, value) => {
    const original: any = {};
    const esm: any = {};
    const settings = { ...options(format), valid: (_valid: boolean) => {} };
    originalJsBarcode(original, value, settings);
    esmJsBarcode(esm, value, settings);
    expect(esm.encodings).toEqual(original.encodings);
    expect(esm.encodings.length).toBeGreaterThan(0);
  });

  for (const type of ['svg', 'canvas', 'img'] as const) {
    it.each(cases)(`${type}: результат %s совпадает с исходной версией`, (format, value) => {
      const original = createElement(type);
      const esm = createElement(type);
      originalJsBarcode(original, value, options(format));
      esmJsBarcode(esm, value, options(format));
      expect(esm.outerHTML).toEqual(original.outerHTML);
      if (type === 'svg') {
        expect(esm.querySelectorAll('rect').length).toBeGreaterThan(1);
        expect(Array.from(esm.querySelectorAll('text')).map(node => node.textContent).join('')).toBeTruthy();
      } else if (type === 'canvas') {
        const rendered = (esm as HTMLCanvasElement).toDataURL();
        expect(rendered).toEqual((original as HTMLCanvasElement).toDataURL());
        expect(rendered).toMatch(/^data:image\/png;base64,/);
      } else {
        expect((esm as HTMLImageElement).src).toMatch(/^data:image\/png;base64,/);
      }
    });
  }

  it.each([['EAN13', 'abc'], ['CODE128C', 'abc'], ['ITF', '123'], ['pharmacode', '1']])(
    '%s отклоняет неверное значение без callback', (format, value) => {
      expect(() => esmJsBarcode({}, value, { format })).toThrow();
      expect(() => originalJsBarcode({}, value, { format })).toThrow();
    },
  );

  it('callback получает true/false как в исходной версии и не вызывает исключение', () => {
    for (const implementation of [originalJsBarcode, esmJsBarcode]) {
      const validations: boolean[] = [];
      const valid = (result: boolean) => { validations.push(result); };
      implementation({}, '5901234123457', { format: 'EAN13', valid });
      expect(() => implementation({}, 'abc', { format: 'EAN13', valid })).not.toThrow();
      expect(validations).toEqual([true, false]);
    }
  });

  it('повторный рендер заменяет SVG и сохраняет настройку текста', () => {
    const original = createElement('svg');
    const esm = createElement('svg');
    for (const value of ['12345', 'ABC123', '999']) {
      const settings = { ...options('CODE39'), text: 'Карта клуба' };
      originalJsBarcode(original, value, settings);
      esmJsBarcode(esm, value, settings);
      expect(esm.outerHTML).toEqual(original.outerHTML);
      expect(esm.querySelectorAll('text')).toHaveLength(1);
      expect(esm.querySelector('text')?.textContent).toBe('Карта клуба');
    }
  });

  it('сохраняет составной API options/blank/render', () => {
    const original = createElement('svg');
    const esm = createElement('svg');
    for (const [implementation, element] of [[originalJsBarcode, original], [esmJsBarcode, esm]] as const) {
      implementation(element).options({ displayValue: false }).CODE128('12345', {}).blank(8).CODE39('ABC', {}).render();
    }
    expect(esm.outerHTML).toEqual(original.outerHTML);
  });
});
