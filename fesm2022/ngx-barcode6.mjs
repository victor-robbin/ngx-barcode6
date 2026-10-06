import * as i0 from "@angular/core";
import { ChangeDetectionStrategy, Component, Renderer2, effect, inject, input, viewChild } from "@angular/core";
import jsbarcode from "jsbarcode";
var NgxBarcode6 = class NgxBarcode6 {
	elementType = input("svg", {
		...ngDevMode ? { debugName: "elementType" } : /* istanbul ignore next */ {},
		alias: "bc-element-type"
	});
	cssClass = input("barcode", {
		...ngDevMode ? { debugName: "cssClass" } : /* istanbul ignore next */ {},
		alias: "bc-class"
	});
	format = input("CODE128", {
		...ngDevMode ? { debugName: "format" } : /* istanbul ignore next */ {},
		alias: "bc-format"
	});
	lineColor = input("#000000", {
		...ngDevMode ? { debugName: "lineColor" } : /* istanbul ignore next */ {},
		alias: "bc-line-color"
	});
	width = input(2, {
		...ngDevMode ? { debugName: "width" } : /* istanbul ignore next */ {},
		alias: "bc-width"
	});
	height = input(100, {
		...ngDevMode ? { debugName: "height" } : /* istanbul ignore next */ {},
		alias: "bc-height"
	});
	displayValue = input(false, {
		...ngDevMode ? { debugName: "displayValue" } : /* istanbul ignore next */ {},
		alias: "bc-display-value"
	});
	fontOptions = input("", {
		...ngDevMode ? { debugName: "fontOptions" } : /* istanbul ignore next */ {},
		alias: "bc-font-options"
	});
	font = input("monospace", {
		...ngDevMode ? { debugName: "font" } : /* istanbul ignore next */ {},
		alias: "bc-font"
	});
	textAlign = input("center", {
		...ngDevMode ? { debugName: "textAlign" } : /* istanbul ignore next */ {},
		alias: "bc-text-align"
	});
	textPosition = input("bottom", {
		...ngDevMode ? { debugName: "textPosition" } : /* istanbul ignore next */ {},
		alias: "bc-text-position"
	});
	textMargin = input(2, {
		...ngDevMode ? { debugName: "textMargin" } : /* istanbul ignore next */ {},
		alias: "bc-text-margin"
	});
	fontSize = input(20, {
		...ngDevMode ? { debugName: "fontSize" } : /* istanbul ignore next */ {},
		alias: "bc-font-size"
	});
	background = input("#ffffff", {
		...ngDevMode ? { debugName: "background" } : /* istanbul ignore next */ {},
		alias: "bc-background"
	});
	margin = input(10, {
		...ngDevMode ? { debugName: "margin" } : /* istanbul ignore next */ {},
		alias: "bc-margin"
	});
	marginTop = input(10, {
		...ngDevMode ? { debugName: "marginTop" } : /* istanbul ignore next */ {},
		alias: "bc-margin-top"
	});
	marginBottom = input(10, {
		...ngDevMode ? { debugName: "marginBottom" } : /* istanbul ignore next */ {},
		alias: "bc-margin-bottom"
	});
	marginLeft = input(10, {
		...ngDevMode ? { debugName: "marginLeft" } : /* istanbul ignore next */ {},
		alias: "bc-margin-left"
	});
	marginRight = input(10, {
		...ngDevMode ? { debugName: "marginRight" } : /* istanbul ignore next */ {},
		alias: "bc-margin-right"
	});
	value = input("", {
		...ngDevMode ? { debugName: "value" } : /* istanbul ignore next */ {},
		alias: "bc-value"
	});
	valid = input(() => true, {
		...ngDevMode ? { debugName: "valid" } : /* istanbul ignore next */ {},
		alias: "bc-valid"
	});
	bcElement = viewChild.required("bcElement", ...ngDevMode ? [{ debugName: "bcElement" }] : /* istanbul ignore next */ []);
	renderer = inject(Renderer2);
	constructor() {
		effect(() => {
			const barcodeValue = this.value();
			if (this.bcElement() && barcodeValue) this.createBarcode();
		});
	}
	get options() {
		return {
			format: this.format(),
			lineColor: this.lineColor(),
			width: this.width(),
			height: this.height(),
			displayValue: this.displayValue(),
			fontOptions: this.fontOptions(),
			font: this.font(),
			textAlign: this.textAlign(),
			textPosition: this.textPosition(),
			textMargin: this.textMargin(),
			fontSize: this.fontSize(),
			background: this.background(),
			margin: this.margin(),
			marginTop: this.marginTop(),
			marginBottom: this.marginBottom(),
			marginLeft: this.marginLeft(),
			marginRight: this.marginRight(),
			valid: this.valid()
		};
	}
	ngAfterViewInit() {}
	createBarcode() {
		const barcodeValue = this.value();
		if (!barcodeValue) return;
		let element;
		switch (this.elementType()) {
			case "img":
				element = this.renderer.createElement("img");
				break;
			case "canvas":
				element = this.renderer.createElement("canvas");
				break;
			default: element = this.renderer.createElement("svg", "svg");
		}
		jsbarcode(element, barcodeValue, this.options);
		const bcElementRef = this.bcElement();
		for (const node of bcElementRef.nativeElement.childNodes) this.renderer.removeChild(bcElementRef.nativeElement, node);
		this.renderer.appendChild(bcElementRef.nativeElement, element);
	}
	static ɵfac = i0.ɵɵngDeclareFactory({
		minVersion: "12.0.0",
		version: "22.2.1",
		ngImport: i0,
		type: NgxBarcode6,
		deps: [],
		target: i0.ɵɵFactoryTarget.Component
	});
	static ɵcmp = i0.ɵɵngDeclareComponent({
		minVersion: "17.2.0",
		version: "22.2.1",
		type: NgxBarcode6,
		isStandalone: true,
		selector: "ngx-barcode6",
		inputs: {
			elementType: {
				classPropertyName: "elementType",
				publicName: "bc-element-type",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			},
			cssClass: {
				classPropertyName: "cssClass",
				publicName: "bc-class",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			},
			format: {
				classPropertyName: "format",
				publicName: "bc-format",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			},
			lineColor: {
				classPropertyName: "lineColor",
				publicName: "bc-line-color",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			},
			width: {
				classPropertyName: "width",
				publicName: "bc-width",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			},
			height: {
				classPropertyName: "height",
				publicName: "bc-height",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			},
			displayValue: {
				classPropertyName: "displayValue",
				publicName: "bc-display-value",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			},
			fontOptions: {
				classPropertyName: "fontOptions",
				publicName: "bc-font-options",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			},
			font: {
				classPropertyName: "font",
				publicName: "bc-font",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			},
			textAlign: {
				classPropertyName: "textAlign",
				publicName: "bc-text-align",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			},
			textPosition: {
				classPropertyName: "textPosition",
				publicName: "bc-text-position",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			},
			textMargin: {
				classPropertyName: "textMargin",
				publicName: "bc-text-margin",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			},
			fontSize: {
				classPropertyName: "fontSize",
				publicName: "bc-font-size",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			},
			background: {
				classPropertyName: "background",
				publicName: "bc-background",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			},
			margin: {
				classPropertyName: "margin",
				publicName: "bc-margin",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			},
			marginTop: {
				classPropertyName: "marginTop",
				publicName: "bc-margin-top",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			},
			marginBottom: {
				classPropertyName: "marginBottom",
				publicName: "bc-margin-bottom",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			},
			marginLeft: {
				classPropertyName: "marginLeft",
				publicName: "bc-margin-left",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			},
			marginRight: {
				classPropertyName: "marginRight",
				publicName: "bc-margin-right",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			},
			value: {
				classPropertyName: "value",
				publicName: "bc-value",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			},
			valid: {
				classPropertyName: "valid",
				publicName: "bc-valid",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			}
		},
		viewQueries: [{
			propertyName: "bcElement",
			first: true,
			predicate: ["bcElement"],
			descendants: true,
			isSignal: true
		}],
		ngImport: i0,
		template: `<div #bcElement [class]="cssClass()"></div>`,
		isInline: true,
		changeDetection: i0.ChangeDetectionStrategy.OnPush
	});
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.1",
	ngImport: i0,
	type: NgxBarcode6,
	decorators: [{
		type: Component,
		args: [{
			selector: "ngx-barcode6",
			imports: [],
			template: `<div #bcElement [class]="cssClass()"></div>`,
			changeDetection: ChangeDetectionStrategy.OnPush
		}]
	}],
	ctorParameters: () => [],
	propDecorators: {
		elementType: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "bc-element-type",
				required: false
			}]
		}],
		cssClass: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "bc-class",
				required: false
			}]
		}],
		format: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "bc-format",
				required: false
			}]
		}],
		lineColor: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "bc-line-color",
				required: false
			}]
		}],
		width: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "bc-width",
				required: false
			}]
		}],
		height: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "bc-height",
				required: false
			}]
		}],
		displayValue: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "bc-display-value",
				required: false
			}]
		}],
		fontOptions: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "bc-font-options",
				required: false
			}]
		}],
		font: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "bc-font",
				required: false
			}]
		}],
		textAlign: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "bc-text-align",
				required: false
			}]
		}],
		textPosition: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "bc-text-position",
				required: false
			}]
		}],
		textMargin: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "bc-text-margin",
				required: false
			}]
		}],
		fontSize: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "bc-font-size",
				required: false
			}]
		}],
		background: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "bc-background",
				required: false
			}]
		}],
		margin: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "bc-margin",
				required: false
			}]
		}],
		marginTop: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "bc-margin-top",
				required: false
			}]
		}],
		marginBottom: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "bc-margin-bottom",
				required: false
			}]
		}],
		marginLeft: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "bc-margin-left",
				required: false
			}]
		}],
		marginRight: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "bc-margin-right",
				required: false
			}]
		}],
		value: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "bc-value",
				required: false
			}]
		}],
		valid: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "bc-valid",
				required: false
			}]
		}],
		bcElement: [{
			type: i0.ViewChild,
			args: ["bcElement", { isSignal: true }]
		}]
	}
});
export { NgxBarcode6 };

//# sourceMappingURL=ngx-barcode6.mjs.map