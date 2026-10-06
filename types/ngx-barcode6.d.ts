import * as i0 from "@angular/core";
import { AfterViewInit, ElementRef } from "@angular/core";
export declare class NgxBarcode6 implements AfterViewInit {
  elementType: import("@angular/core").InputSignal<"svg" | "img" | "canvas">;
  cssClass: import("@angular/core").InputSignal<string>;
  format: import("@angular/core").InputSignal<string>;
  lineColor: import("@angular/core").InputSignal<string>;
  width: import("@angular/core").InputSignal<number>;
  height: import("@angular/core").InputSignal<number>;
  displayValue: import("@angular/core").InputSignal<boolean>;
  fontOptions: import("@angular/core").InputSignal<string>;
  font: import("@angular/core").InputSignal<string>;
  textAlign: import("@angular/core").InputSignal<string>;
  textPosition: import("@angular/core").InputSignal<string>;
  textMargin: import("@angular/core").InputSignal<number>;
  fontSize: import("@angular/core").InputSignal<number>;
  background: import("@angular/core").InputSignal<string>;
  margin: import("@angular/core").InputSignal<number>;
  marginTop: import("@angular/core").InputSignal<number>;
  marginBottom: import("@angular/core").InputSignal<number>;
  marginLeft: import("@angular/core").InputSignal<number>;
  marginRight: import("@angular/core").InputSignal<number>;
  value: import("@angular/core").InputSignal<string>;
  valid: import("@angular/core").InputSignal<() => boolean>;
  bcElement: import("@angular/core").Signal<ElementRef<any>>;
  private renderer;
  constructor();
  get options(): any;
  ngAfterViewInit(): void;
  createBarcode(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<NgxBarcode6, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<NgxBarcode6, "ngx-barcode6", never, {
    "elementType": {
      "alias": "bc-element-type";
      "required": false;
      "isSignal": true;
    };
    "cssClass": {
      "alias": "bc-class";
      "required": false;
      "isSignal": true;
    };
    "format": {
      "alias": "bc-format";
      "required": false;
      "isSignal": true;
    };
    "lineColor": {
      "alias": "bc-line-color";
      "required": false;
      "isSignal": true;
    };
    "width": {
      "alias": "bc-width";
      "required": false;
      "isSignal": true;
    };
    "height": {
      "alias": "bc-height";
      "required": false;
      "isSignal": true;
    };
    "displayValue": {
      "alias": "bc-display-value";
      "required": false;
      "isSignal": true;
    };
    "fontOptions": {
      "alias": "bc-font-options";
      "required": false;
      "isSignal": true;
    };
    "font": {
      "alias": "bc-font";
      "required": false;
      "isSignal": true;
    };
    "textAlign": {
      "alias": "bc-text-align";
      "required": false;
      "isSignal": true;
    };
    "textPosition": {
      "alias": "bc-text-position";
      "required": false;
      "isSignal": true;
    };
    "textMargin": {
      "alias": "bc-text-margin";
      "required": false;
      "isSignal": true;
    };
    "fontSize": {
      "alias": "bc-font-size";
      "required": false;
      "isSignal": true;
    };
    "background": {
      "alias": "bc-background";
      "required": false;
      "isSignal": true;
    };
    "margin": {
      "alias": "bc-margin";
      "required": false;
      "isSignal": true;
    };
    "marginTop": {
      "alias": "bc-margin-top";
      "required": false;
      "isSignal": true;
    };
    "marginBottom": {
      "alias": "bc-margin-bottom";
      "required": false;
      "isSignal": true;
    };
    "marginLeft": {
      "alias": "bc-margin-left";
      "required": false;
      "isSignal": true;
    };
    "marginRight": {
      "alias": "bc-margin-right";
      "required": false;
      "isSignal": true;
    };
    "value": {
      "alias": "bc-value";
      "required": false;
      "isSignal": true;
    };
    "valid": {
      "alias": "bc-valid";
      "required": false;
      "isSignal": true;
    };
  }, {}, never, never, true, never>;
}