# ngx-barcode6

Компонент Angular 22 для построения одномерных штрихкодов на основе [JsBarcode](https://github.com/lindell/JsBarcode). Форк [efgiese/ngx-barcode6](https://github.com/efgiese/ngx-barcode6) сохраняет компонент `NgxBarcode6`, селектор `ngx-barcode6` и входные параметры `bc-*`.

## Совместимость

Релиз **1.22.0** собран и проверен с **Angular 22.2.1**, последней стабильной версией на 06.10.2026. Peer dependencies требуют **Angular 22.x** и **JsBarcode ^3.12.3**. Эта сборка не заявляет совместимость с Angular 17–21; для старых приложений используйте соответствующую предыдущую версию библиотеки.

Пакет поставляется в Angular Package Format: ESM, декларации TypeScript, partial compilation. Для сборки исходников используются Node **22.23.3**, npm **11.12.0** и TypeScript **6.0.3**. Требования Angular: [официальная таблица совместимости](https://angular.dev/reference/versions).

## Установка

```bash
npm install 'git+https://github.com/victor-robbin/ngx-barcode6.git#v1.22.0' 'jsbarcode@^3.12.3'
```

Тег указывает на готовый пакет в корне репозитория. Установка не требует сборки библиотеки или соседнего каталога с исходниками. `package-lock.json` фиксирует коммит тега; `npm ci` воспроизводит установку. Архив `ngx-barcode6-1.22.0.tgz` из GitHub Releases также можно установить через `npm install ./ngx-barcode6-1.22.0.tgz`.

Имя пакета и импорты остаются `ngx-barcode6`. Публикация этой версии в npm registry не выполняется: для данного форка используйте GitHub-тег или архив релиза.

## Использование

```typescript
import { Component } from '@angular/core';
import { NgxBarcode6 } from 'ngx-barcode6';

@Component({
  selector: 'app-barcode',
  imports: [NgxBarcode6],
  template: `
    <ngx-barcode6
      bc-format="CODE39"
      bc-value="1234567890"
      [bc-width]="2"
      [bc-height]="80"
      [bc-display-value]="true"
    />
  `,
})
export class BarcodeComponent {}
```

Для приложения с NgModule добавьте `NgxBarcode6` в `imports` модуля. Поддерживаются SVG, img и canvas через `bc-element-type`, а также параметры размеров, текста и цветов. Форматы: CODE128, EAN/UPC, CODE39, ITF, MSI, Pharmacode и Codabar. Список форматов и настроек: [документация JsBarcode](https://github.com/lindell/JsBarcode/wiki).

## Разработка и релиз

Исходники находятся в ветке `main`, готовые пакеты — в `package-angular-22`. Релизные теги `v1.22.x` указывают на готовые пакеты, а не на workspace. Второе число версии обозначает поддерживаемую основную версию Angular.

```bash
nvm use
npm ci
npm run build:lib
npx ng test ngx-barcode6 --watch=false
npx ng build barcode
npx ng test barcode --watch=false
npm run pack:release
```

Для нового релиза измените версии в обоих `package.json`, выполните сборку и тесты и проверьте установку архива в Angular-приложение. Содержимое `dist/ngx-barcode6` перенесите в ветку готовых пакетов, создайте неизменяемый тег и GitHub Release с архивом от `npm pack`. Публикация тега запускает GitHub Actions: проверку пакета, создание GitHub Release, загрузку архива и SHA256SUMS. Файл `.github/workflows/release.yml` и `RELEASE_NOTES.md` должны присутствовать в ветке готовых пакетов. Старые теги не перемещайте. README и лицензия включаются в пакет через настройки ng-packagr.

## Проверки версии 1.22.0

- 28 тестов библиотеки прошли: CODE39 и другие форматы, SVG/img/canvas и обработка некорректных значений.
- Демо собрано на Angular 22.2.1; 3 теста демо прошли.
- Пакет предназначен для установки по Git-тегу и чистой установки `npm ci` без `--force` и `--legacy-peer-deps`.

## Лицензия

MIT © Bryon Williams, Edgar Giese. Исходные сведения об авторах сохранены в пакете и LICENSE.
