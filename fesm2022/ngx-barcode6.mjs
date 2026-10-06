import * as i0 from "@angular/core";
import { ChangeDetectionStrategy, Component, Renderer2, effect, inject, input, viewChild } from "@angular/core";
/*! JsBarcode 3.12.3 — Copyright (c) 2016 Johan Lindell. MIT; см. THIRD_PARTY_LICENSES.txt. */
var Barcode = class {
	constructor(data, options) {
		this.data = data;
		this.text = options.text || data;
		this.options = options;
	}
};
var Barcode_default = Barcode;
var CODE39 = class extends Barcode_default {
	constructor(data, options) {
		data = data.toUpperCase();
		if (options.mod43) data += getCharacter(mod43checksum(data));
		super(data, options);
	}
	encode() {
		var result = getEncoding("*");
		for (let i = 0; i < this.data.length; i++) result += getEncoding(this.data[i]) + "0";
		result += getEncoding("*");
		return {
			data: result,
			text: this.text
		};
	}
	valid() {
		return this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1;
	}
};
var characters = [
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
	"-",
	".",
	" ",
	"$",
	"/",
	"+",
	"%",
	"*"
];
var encodings = [
	20957,
	29783,
	23639,
	30485,
	20951,
	29813,
	23669,
	20855,
	29789,
	23645,
	29975,
	23831,
	30533,
	22295,
	30149,
	24005,
	21623,
	29981,
	23837,
	22301,
	30023,
	23879,
	30545,
	22343,
	30161,
	24017,
	21959,
	30065,
	23921,
	22385,
	29015,
	18263,
	29141,
	17879,
	29045,
	18293,
	17783,
	29021,
	18269,
	17477,
	17489,
	17681,
	20753,
	35770
];
function getEncoding(character) {
	return getBinary(characterValue(character));
}
function getBinary(characterValue2) {
	return encodings[characterValue2].toString(2);
}
function getCharacter(characterValue2) {
	return characters[characterValue2];
}
function characterValue(character) {
	return characters.indexOf(character);
}
function mod43checksum(data) {
	var checksum6 = 0;
	for (let i = 0; i < data.length; i++) checksum6 += characterValue(data[i]);
	checksum6 = checksum6 % 43;
	return checksum6;
}
var SET_A = 0;
var SET_B = 1;
var SET_C = 2;
var SHIFT = 98;
var START_A = 103;
var START_B = 104;
var START_C = 105;
var MODULO = 103;
var STOP = 106;
var FNC1 = 207;
var SET_BY_CODE = {
	[START_A]: SET_A,
	[START_B]: SET_B,
	[START_C]: SET_C
};
var SWAP = {
	101: SET_A,
	100: SET_B,
	99: SET_C
};
var A_START_CHAR = String.fromCharCode(208);
var B_START_CHAR = String.fromCharCode(209);
var C_START_CHAR = String.fromCharCode(210);
var A_CHARS = "[\0-_È-Ï]";
var B_CHARS = "[ -È-Ï]";
var C_CHARS = "(Ï*[0-9]{2}Ï*)";
var BARS = [
	11011001100,
	11001101100,
	11001100110,
	10010011e3,
	10010001100,
	10001001100,
	10011001e3,
	10011000100,
	10001100100,
	11001001e3,
	11001000100,
	11000100100,
	10110011100,
	10011011100,
	10011001110,
	10111001100,
	10011101100,
	10011100110,
	11001110010,
	11001011100,
	11001001110,
	11011100100,
	11001110100,
	11101101110,
	11101001100,
	11100101100,
	11100100110,
	11101100100,
	11100110100,
	11100110010,
	11011011e3,
	11011000110,
	11000110110,
	10100011e3,
	10001011e3,
	10001000110,
	10110001e3,
	10001101e3,
	10001100010,
	11010001e3,
	11000101e3,
	11000100010,
	10110111e3,
	10110001110,
	10001101110,
	10111011e3,
	10111000110,
	10001110110,
	11101110110,
	11010001110,
	11000101110,
	11011101e3,
	11011100010,
	11011101110,
	11101011e3,
	11101000110,
	11100010110,
	11101101e3,
	11101100010,
	11100011010,
	11101111010,
	11001000010,
	11110001010,
	1010011e4,
	10100001100,
	1001011e4,
	10010000110,
	10000101100,
	10000100110,
	1011001e4,
	10110000100,
	1001101e4,
	10011000010,
	10000110100,
	10000110010,
	11000010010,
	1100101e4,
	11110111010,
	11000010100,
	10001111010,
	10100111100,
	10010111100,
	10010011110,
	10111100100,
	10011110100,
	10011110010,
	11110100100,
	11110010100,
	11110010010,
	11011011110,
	11011110110,
	11110110110,
	10101111e3,
	10100011110,
	10001011110,
	10111101e3,
	10111100010,
	11110101e3,
	11110100010,
	10111011110,
	10111101110,
	11101011110,
	11110101110,
	11010000100,
	1101001e4,
	11010011100,
	1100011101011
];
var CODE128_default = class _CODE128 extends Barcode_default {
	constructor(data, options) {
		super(data.substring(1), options);
		this.bytes = data.split("").map((char) => char.charCodeAt(0));
	}
	valid() {
		return /^[\x00-\x7F\xC8-\xD3]+$/.test(this.data);
	}
	encode() {
		const bytes = this.bytes;
		const startIndex = bytes.shift() - 105;
		const startSet = SET_BY_CODE[startIndex];
		if (startSet === void 0) throw new RangeError("The encoding does not start with a start character.");
		if (this.shouldEncodeAsEan128() === true) bytes.unshift(FNC1);
		const encodingResult = _CODE128.next(bytes, 1, startSet);
		return {
			text: this.text === this.data ? this.text.replace(/[^\x20-\x7E]/g, "") : this.text,
			data: _CODE128.getBar(startIndex) + encodingResult.result + _CODE128.getBar((encodingResult.checksum + startIndex) % MODULO) + _CODE128.getBar(STOP)
		};
	}
	shouldEncodeAsEan128() {
		let isEAN128 = this.options.ean128 || false;
		if (typeof isEAN128 === "string") isEAN128 = isEAN128.toLowerCase() === "true";
		return isEAN128;
	}
	static getBar(index) {
		return BARS[index] ? BARS[index].toString() : "";
	}
	static correctIndex(bytes, set) {
		if (set === SET_A) {
			const charCode = bytes.shift();
			return charCode < 32 ? charCode + 64 : charCode - 32;
		} else if (set === SET_B) return bytes.shift() - 32;
		else return (bytes.shift() - 48) * 10 + bytes.shift() - 48;
	}
	static next(bytes, pos, set) {
		if (!bytes.length) return {
			result: "",
			checksum: 0
		};
		let nextCode, index;
		if (bytes[0] >= 200) {
			index = bytes.shift() - 105;
			const nextSet = SWAP[index];
			if (nextSet !== void 0) nextCode = _CODE128.next(bytes, pos + 1, nextSet);
			else {
				if ((set === SET_A || set === SET_B) && index === SHIFT) bytes[0] = set === SET_A ? bytes[0] > 95 ? bytes[0] - 96 : bytes[0] : bytes[0] < 32 ? bytes[0] + 96 : bytes[0];
				nextCode = _CODE128.next(bytes, pos + 1, set);
			}
		} else {
			index = _CODE128.correctIndex(bytes, set);
			nextCode = _CODE128.next(bytes, pos + 1, set);
		}
		const enc = _CODE128.getBar(index);
		const weight = index * pos;
		return {
			result: enc + nextCode.result,
			checksum: weight + nextCode.checksum
		};
	}
};
var matchSetALength = (string) => string.match(new RegExp(`^${A_CHARS}*`))[0].length;
var matchSetBLength = (string) => string.match(new RegExp(`^${B_CHARS}*`))[0].length;
var matchSetC = (string) => string.match(new RegExp(`^${C_CHARS}*`))[0];
function autoSelectFromAB(string, isA) {
	const ranges = isA ? A_CHARS : B_CHARS;
	const untilC = string.match(new RegExp(`^(${ranges}+?)(([0-9]{2}){2,})([^0-9]|$)`));
	if (untilC) return untilC[1] + String.fromCharCode(204) + autoSelectFromC(string.substring(untilC[1].length));
	const chars = string.match(new RegExp(`^${ranges}+`))[0];
	if (chars.length === string.length) return string;
	return chars + String.fromCharCode(isA ? 205 : 206) + autoSelectFromAB(string.substring(chars.length), !isA);
}
function autoSelectFromC(string) {
	const cMatch = matchSetC(string);
	const length = cMatch.length;
	if (length === string.length) return string;
	string = string.substring(length);
	const isA = matchSetALength(string) >= matchSetBLength(string);
	return cMatch + String.fromCharCode(isA ? 206 : 205) + autoSelectFromAB(string, isA);
}
var auto_default = (string) => {
	let newString;
	if (matchSetC(string).length >= 2) newString = C_START_CHAR + autoSelectFromC(string);
	else {
		const isA = matchSetALength(string) > matchSetBLength(string);
		newString = (isA ? A_START_CHAR : B_START_CHAR) + autoSelectFromAB(string, isA);
	}
	return newString.replace(/[\xCD\xCE]([^])[\xCD\xCE]/, (match, char) => String.fromCharCode(203) + char);
};
var CODE128AUTO = class extends CODE128_default {
	constructor(data, options) {
		if (/^[\x00-\x7F\xC8-\xD3]+$/.test(data)) super(auto_default(data), options);
		else super(data, options);
	}
};
var CODE128_AUTO_default = CODE128AUTO;
var CODE128A = class extends CODE128_default {
	constructor(string, options) {
		super(A_START_CHAR + string, options);
	}
	valid() {
		return new RegExp(`^${A_CHARS}+$`).test(this.data);
	}
};
var CODE128A_default = CODE128A;
var CODE128B = class extends CODE128_default {
	constructor(string, options) {
		super(B_START_CHAR + string, options);
	}
	valid() {
		return new RegExp(`^${B_CHARS}+$`).test(this.data);
	}
};
var CODE128B_default = CODE128B;
var CODE128C = class extends CODE128_default {
	constructor(string, options) {
		super(C_START_CHAR + string, options);
	}
	valid() {
		return new RegExp(`^${C_CHARS}+$`).test(this.data);
	}
};
var CODE128C_default = CODE128C;
var SIDE_BIN = "101";
var MIDDLE_BIN = "01010";
var BINARIES = {
	"L": [
		"0001101",
		"0011001",
		"0010011",
		"0111101",
		"0100011",
		"0110001",
		"0101111",
		"0111011",
		"0110111",
		"0001011"
	],
	"G": [
		"0100111",
		"0110011",
		"0011011",
		"0100001",
		"0011101",
		"0111001",
		"0000101",
		"0010001",
		"0001001",
		"0010111"
	],
	"R": [
		"1110010",
		"1100110",
		"1101100",
		"1000010",
		"1011100",
		"1001110",
		"1010000",
		"1000100",
		"1001000",
		"1110100"
	],
	"O": [
		"0001101",
		"0011001",
		"0010011",
		"0111101",
		"0100011",
		"0110001",
		"0101111",
		"0111011",
		"0110111",
		"0001011"
	],
	"E": [
		"0100111",
		"0110011",
		"0011011",
		"0100001",
		"0011101",
		"0111001",
		"0000101",
		"0010001",
		"0001001",
		"0010111"
	]
};
var EAN2_STRUCTURE = [
	"LL",
	"LG",
	"GL",
	"GG"
];
var EAN5_STRUCTURE = [
	"GGLLL",
	"GLGLL",
	"GLLGL",
	"GLLLG",
	"LGGLL",
	"LLGGL",
	"LLLGG",
	"LGLGL",
	"LGLLG",
	"LLGLG"
];
var EAN13_STRUCTURE = [
	"LLLLLL",
	"LLGLGG",
	"LLGGLG",
	"LLGGGL",
	"LGLLGG",
	"LGGLLG",
	"LGGGLL",
	"LGLGLG",
	"LGLGGL",
	"LGGLGL"
];
var encode = (data, structure, separator) => {
	let encoded = data.split("").map((val, idx) => BINARIES[structure[idx]]).map((val, idx) => val ? val[data[idx]] : "");
	if (separator) {
		const last = data.length - 1;
		encoded = encoded.map((val, idx) => idx < last ? val + separator : val);
	}
	return encoded.join("");
};
var encoder_default = encode;
var EAN = class extends Barcode_default {
	constructor(data, options) {
		super(data, options);
		this.fontSize = !options.flat && options.fontSize > options.width * 10 ? options.width * 10 : options.fontSize;
		this.guardHeight = options.height + this.fontSize / 2 + options.textMargin;
	}
	encode() {
		return this.options.flat ? this.encodeFlat() : this.encodeGuarded();
	}
	leftText(from, to) {
		return this.text.substr(from, to);
	}
	leftEncode(data, structure) {
		return encoder_default(data, structure);
	}
	rightText(from, to) {
		return this.text.substr(from, to);
	}
	rightEncode(data, structure) {
		return encoder_default(data, structure);
	}
	encodeGuarded() {
		const textOptions = { fontSize: this.fontSize };
		const guardOptions = { height: this.guardHeight };
		return [
			{
				data: SIDE_BIN,
				options: guardOptions
			},
			{
				data: this.leftEncode(),
				text: this.leftText(),
				options: textOptions
			},
			{
				data: MIDDLE_BIN,
				options: guardOptions
			},
			{
				data: this.rightEncode(),
				text: this.rightText(),
				options: textOptions
			},
			{
				data: SIDE_BIN,
				options: guardOptions
			}
		];
	}
	encodeFlat() {
		return {
			data: [
				SIDE_BIN,
				this.leftEncode(),
				MIDDLE_BIN,
				this.rightEncode(),
				SIDE_BIN
			].join(""),
			text: this.text
		};
	}
};
var EAN_default = EAN;
var checksum = (number) => {
	return (10 - number.substr(0, 12).split("").map((n) => +n).reduce((sum, a, idx) => idx % 2 ? sum + a * 3 : sum + a, 0) % 10) % 10;
};
var EAN13 = class extends EAN_default {
	constructor(data, options) {
		if (data.search(/^[0-9]{12}$/) !== -1) data += checksum(data);
		super(data, options);
		this.lastChar = options.lastChar;
	}
	valid() {
		return this.data.search(/^[0-9]{13}$/) !== -1 && +this.data[12] === checksum(this.data);
	}
	leftText() {
		return super.leftText(1, 6);
	}
	leftEncode() {
		const data = this.data.substr(1, 6);
		const structure = EAN13_STRUCTURE[this.data[0]];
		return super.leftEncode(data, structure);
	}
	rightText() {
		return super.rightText(7, 6);
	}
	rightEncode() {
		const data = this.data.substr(7, 6);
		return super.rightEncode(data, "RRRRRR");
	}
	encodeGuarded() {
		const data = super.encodeGuarded();
		if (this.options.displayValue) {
			data.unshift({
				data: "000000000000",
				text: this.text.substr(0, 1),
				options: {
					textAlign: "left",
					fontSize: this.fontSize
				}
			});
			if (this.options.lastChar) {
				data.push({ data: "00" });
				data.push({
					data: "00000",
					text: this.options.lastChar,
					options: { fontSize: this.fontSize }
				});
			}
		}
		return data;
	}
};
var EAN13_default = EAN13;
var checksum2 = (number) => {
	return (10 - number.substr(0, 7).split("").map((n) => +n).reduce((sum, a, idx) => idx % 2 ? sum + a : sum + a * 3, 0) % 10) % 10;
};
var EAN8 = class extends EAN_default {
	constructor(data, options) {
		if (data.search(/^[0-9]{7}$/) !== -1) data += checksum2(data);
		super(data, options);
	}
	valid() {
		return this.data.search(/^[0-9]{8}$/) !== -1 && +this.data[7] === checksum2(this.data);
	}
	leftText() {
		return super.leftText(0, 4);
	}
	leftEncode() {
		const data = this.data.substr(0, 4);
		return super.leftEncode(data, "LLLL");
	}
	rightText() {
		return super.rightText(4, 4);
	}
	rightEncode() {
		const data = this.data.substr(4, 4);
		return super.rightEncode(data, "RRRR");
	}
};
var EAN8_default = EAN8;
var checksum3 = (data) => {
	return data.split("").map((n) => +n).reduce((sum, a, idx) => {
		return idx % 2 ? sum + a * 9 : sum + a * 3;
	}, 0) % 10;
};
var EAN5 = class extends Barcode_default {
	constructor(data, options) {
		super(data, options);
	}
	valid() {
		return this.data.search(/^[0-9]{5}$/) !== -1;
	}
	encode() {
		const structure = EAN5_STRUCTURE[checksum3(this.data)];
		return {
			data: "1011" + encoder_default(this.data, structure, "01"),
			text: this.text
		};
	}
};
var EAN5_default = EAN5;
var EAN2 = class extends Barcode_default {
	constructor(data, options) {
		super(data, options);
	}
	valid() {
		return this.data.search(/^[0-9]{2}$/) !== -1;
	}
	encode() {
		const structure = EAN2_STRUCTURE[parseInt(this.data) % 4];
		return {
			data: "1011" + encoder_default(this.data, structure, "01"),
			text: this.text
		};
	}
};
var EAN2_default = EAN2;
var UPC = class extends Barcode_default {
	constructor(data, options) {
		if (data.search(/^[0-9]{11}$/) !== -1) data += checksum4(data);
		super(data, options);
		this.displayValue = options.displayValue;
		if (options.fontSize > options.width * 10) this.fontSize = options.width * 10;
		else this.fontSize = options.fontSize;
		this.guardHeight = options.height + this.fontSize / 2 + options.textMargin;
	}
	valid() {
		return this.data.search(/^[0-9]{12}$/) !== -1 && this.data[11] == checksum4(this.data);
	}
	encode() {
		if (this.options.flat) return this.flatEncoding();
		else return this.guardedEncoding();
	}
	flatEncoding() {
		var result = "";
		result += "101";
		result += encoder_default(this.data.substr(0, 6), "LLLLLL");
		result += "01010";
		result += encoder_default(this.data.substr(6, 6), "RRRRRR");
		result += "101";
		return {
			data: result,
			text: this.text
		};
	}
	guardedEncoding() {
		var result = [];
		if (this.displayValue) result.push({
			data: "00000000",
			text: this.text.substr(0, 1),
			options: {
				textAlign: "left",
				fontSize: this.fontSize
			}
		});
		result.push({
			data: "101" + encoder_default(this.data[0], "L"),
			options: { height: this.guardHeight }
		});
		result.push({
			data: encoder_default(this.data.substr(1, 5), "LLLLL"),
			text: this.text.substr(1, 5),
			options: { fontSize: this.fontSize }
		});
		result.push({
			data: "01010",
			options: { height: this.guardHeight }
		});
		result.push({
			data: encoder_default(this.data.substr(6, 5), "RRRRR"),
			text: this.text.substr(6, 5),
			options: { fontSize: this.fontSize }
		});
		result.push({
			data: encoder_default(this.data[11], "R") + "101",
			options: { height: this.guardHeight }
		});
		if (this.displayValue) result.push({
			data: "00000000",
			text: this.text.substr(11, 1),
			options: {
				textAlign: "right",
				fontSize: this.fontSize
			}
		});
		return result;
	}
};
function checksum4(number) {
	var result = 0;
	var i = 1;
	for (; i < 11; i += 2) result += parseInt(number[i]);
	for (i = 0; i < 11; i += 2) result += parseInt(number[i]) * 3;
	return (10 - result % 10) % 10;
}
var UPC_default = UPC;
var EXPANSIONS = [
	"XX00000XXX",
	"XX10000XXX",
	"XX20000XXX",
	"XXX00000XX",
	"XXXX00000X",
	"XXXXX00005",
	"XXXXX00006",
	"XXXXX00007",
	"XXXXX00008",
	"XXXXX00009"
];
var PARITIES = [
	["EEEOOO", "OOOEEE"],
	["EEOEOO", "OOEOEE"],
	["EEOOEO", "OOEEOE"],
	["EEOOOE", "OOEEEO"],
	["EOEEOO", "OEOOEE"],
	["EOOEEO", "OEEOOE"],
	["EOOOEE", "OEEEOO"],
	["EOEOEO", "OEOEOE"],
	["EOEOOE", "OEOEEO"],
	["EOOEOE", "OEEOEO"]
];
var UPCE = class extends Barcode_default {
	constructor(data, options) {
		super(data, options);
		this.isValid = false;
		if (data.search(/^[0-9]{6}$/) !== -1) {
			this.middleDigits = data;
			this.upcA = expandToUPCA(data, "0");
			this.text = options.text || `${this.upcA[0]}${data}${this.upcA[this.upcA.length - 1]}`;
			this.isValid = true;
		} else if (data.search(/^[01][0-9]{7}$/) !== -1) {
			this.middleDigits = data.substring(1, data.length - 1);
			this.upcA = expandToUPCA(this.middleDigits, data[0]);
			if (this.upcA[this.upcA.length - 1] === data[data.length - 1]) this.isValid = true;
			else return;
		} else return;
		this.displayValue = options.displayValue;
		if (options.fontSize > options.width * 10) this.fontSize = options.width * 10;
		else this.fontSize = options.fontSize;
		this.guardHeight = options.height + this.fontSize / 2 + options.textMargin;
	}
	valid() {
		return this.isValid;
	}
	encode() {
		if (this.options.flat) return this.flatEncoding();
		else return this.guardedEncoding();
	}
	flatEncoding() {
		var result = "";
		result += "101";
		result += this.encodeMiddleDigits();
		result += "010101";
		return {
			data: result,
			text: this.text
		};
	}
	guardedEncoding() {
		var result = [];
		if (this.displayValue) result.push({
			data: "00000000",
			text: this.text[0],
			options: {
				textAlign: "left",
				fontSize: this.fontSize
			}
		});
		result.push({
			data: "101",
			options: { height: this.guardHeight }
		});
		result.push({
			data: this.encodeMiddleDigits(),
			text: this.text.substring(1, 7),
			options: { fontSize: this.fontSize }
		});
		result.push({
			data: "010101",
			options: { height: this.guardHeight }
		});
		if (this.displayValue) result.push({
			data: "00000000",
			text: this.text[7],
			options: {
				textAlign: "right",
				fontSize: this.fontSize
			}
		});
		return result;
	}
	encodeMiddleDigits() {
		const numberSystem = this.upcA[0];
		const checkDigit = this.upcA[this.upcA.length - 1];
		const parity = PARITIES[parseInt(checkDigit)][parseInt(numberSystem)];
		return encoder_default(this.middleDigits, parity);
	}
};
function expandToUPCA(middleDigits, numberSystem) {
	const expansion = EXPANSIONS[parseInt(middleDigits[middleDigits.length - 1])];
	let result = "";
	let digitIndex = 0;
	for (let i = 0; i < expansion.length; i++) {
		let c = expansion[i];
		if (c === "X") result += middleDigits[digitIndex++];
		else result += c;
	}
	result = `${numberSystem}${result}`;
	return `${result}${checksum4(result)}`;
}
var UPCE_default = UPCE;
var START_BIN = "1010";
var END_BIN = "11101";
var BINARIES2 = [
	"00110",
	"10001",
	"01001",
	"11000",
	"00101",
	"10100",
	"01100",
	"00011",
	"10010",
	"01010"
];
var ITF = class extends Barcode_default {
	valid() {
		return this.data.search(/^([0-9]{2})+$/) !== -1;
	}
	encode() {
		return {
			data: START_BIN + this.data.match(/.{2}/g).map((pair) => this.encodePair(pair)).join("") + END_BIN,
			text: this.text
		};
	}
	encodePair(pair) {
		const second = BINARIES2[pair[1]];
		return BINARIES2[pair[0]].split("").map((first, idx) => (first === "1" ? "111" : "1") + (second[idx] === "1" ? "000" : "0")).join("");
	}
};
var ITF_default = ITF;
var checksum5 = (data) => {
	const res = data.substr(0, 13).split("").map((num) => parseInt(num, 10)).reduce((sum, n, idx) => sum + n * (3 - idx % 2 * 2), 0);
	return Math.ceil(res / 10) * 10 - res;
};
var ITF14 = class extends ITF_default {
	constructor(data, options) {
		if (data.search(/^[0-9]{13}$/) !== -1) data += checksum5(data);
		super(data, options);
	}
	valid() {
		return this.data.search(/^[0-9]{14}$/) !== -1 && +this.data[13] === checksum5(this.data);
	}
};
var ITF14_default = ITF14;
var MSI = class extends Barcode_default {
	constructor(data, options) {
		super(data, options);
	}
	encode() {
		var ret = "110";
		for (var i = 0; i < this.data.length; i++) {
			var bin = parseInt(this.data[i]).toString(2);
			bin = addZeroes(bin, 4 - bin.length);
			for (var b = 0; b < bin.length; b++) ret += bin[b] == "0" ? "100" : "110";
		}
		ret += "1001";
		return {
			data: ret,
			text: this.text
		};
	}
	valid() {
		return this.data.search(/^[0-9]+$/) !== -1;
	}
};
function addZeroes(number, n) {
	for (var i = 0; i < n; i++) number = "0" + number;
	return number;
}
var MSI_default = MSI;
function mod10(number) {
	var sum = 0;
	for (var i = 0; i < number.length; i++) {
		var n = parseInt(number[i]);
		if ((i + number.length) % 2 === 0) sum += n;
		else sum += n * 2 % 10 + Math.floor(n * 2 / 10);
	}
	return (10 - sum % 10) % 10;
}
function mod11(number) {
	var sum = 0;
	var weights = [
		2,
		3,
		4,
		5,
		6,
		7
	];
	for (var i = 0; i < number.length; i++) {
		var n = parseInt(number[number.length - 1 - i]);
		sum += weights[i % weights.length] * n;
	}
	return (11 - sum % 11) % 11;
}
var MSI10 = class extends MSI_default {
	constructor(data, options) {
		super(data + mod10(data), options);
	}
};
var MSI10_default = MSI10;
var MSI11 = class extends MSI_default {
	constructor(data, options) {
		super(data + mod11(data), options);
	}
};
var MSI11_default = MSI11;
var MSI1010 = class extends MSI_default {
	constructor(data, options) {
		data += mod10(data);
		data += mod10(data);
		super(data, options);
	}
};
var MSI1010_default = MSI1010;
var MSI1110 = class extends MSI_default {
	constructor(data, options) {
		data += mod11(data);
		data += mod10(data);
		super(data, options);
	}
};
var MSI1110_default = MSI1110;
var pharmacode = class extends Barcode_default {
	constructor(data, options) {
		super(data, options);
		this.number = parseInt(data, 10);
	}
	encode() {
		var z = this.number;
		var result = "";
		while (!isNaN(z) && z != 0) if (z % 2 === 0) {
			result = "11100" + result;
			z = (z - 2) / 2;
		} else {
			result = "100" + result;
			z = (z - 1) / 2;
		}
		result = result.slice(0, -2);
		return {
			data: result,
			text: this.text
		};
	}
	valid() {
		return this.number >= 3 && this.number <= 131070;
	}
};
var codabar = class extends Barcode_default {
	constructor(data, options) {
		if (data.search(/^[0-9\-\$\:\.\+\/]+$/) === 0) data = "A" + data + "A";
		super(data.toUpperCase(), options);
		this.text = this.options.text || this.text.replace(/[A-D]/g, "");
	}
	valid() {
		return this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/) !== -1;
	}
	encode() {
		var result = [];
		var encodings2 = this.getEncodings();
		for (var i = 0; i < this.data.length; i++) {
			result.push(encodings2[this.data.charAt(i)]);
			if (i !== this.data.length - 1) result.push("0");
		}
		return {
			text: this.text,
			data: result.join("")
		};
	}
	getEncodings() {
		return {
			"0": "101010011",
			"1": "101011001",
			"2": "101001011",
			"3": "110010101",
			"4": "101101001",
			"5": "110101001",
			"6": "100101011",
			"7": "100101101",
			"8": "100110101",
			"9": "110100101",
			"-": "101001101",
			"$": "101100101",
			":": "1101011011",
			"/": "1101101011",
			".": "1101101101",
			"+": "1011011011",
			"A": "1011001001",
			"B": "1001001011",
			"C": "1010010011",
			"D": "1010011001"
		};
	}
};
var SYMBOLS = [
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
	"-",
	".",
	" ",
	"$",
	"/",
	"+",
	"%",
	"($)",
	"(%)",
	"(/)",
	"(+)",
	"ÿ"
];
var BINARIES3 = [
	"100010100",
	"101001000",
	"101000100",
	"101000010",
	"100101000",
	"100100100",
	"100100010",
	"101010000",
	"100010010",
	"100001010",
	"110101000",
	"110100100",
	"110100010",
	"110010100",
	"110010010",
	"110001010",
	"101101000",
	"101100100",
	"101100010",
	"100110100",
	"100011010",
	"101011000",
	"101001100",
	"101000110",
	"100101100",
	"100010110",
	"110110100",
	"110110010",
	"110101100",
	"110100110",
	"110010110",
	"110011010",
	"101101100",
	"101100110",
	"100110110",
	"100111010",
	"100101110",
	"111010100",
	"111010010",
	"111001010",
	"101101110",
	"101110110",
	"110101110",
	"100100110",
	"111011010",
	"111010110",
	"100110010",
	"101011110"
];
var MULTI_SYMBOLS = {
	"\0": ["(%)", "U"],
	"": ["($)", "A"],
	"": ["($)", "B"],
	"": ["($)", "C"],
	"": ["($)", "D"],
	"": ["($)", "E"],
	"": ["($)", "F"],
	"\x07": ["($)", "G"],
	"\b": ["($)", "H"],
	"	": ["($)", "I"],
	"\n": ["($)", "J"],
	"\v": ["($)", "K"],
	"\f": ["($)", "L"],
	"\r": ["($)", "M"],
	"": ["($)", "N"],
	"": ["($)", "O"],
	"": ["($)", "P"],
	"": ["($)", "Q"],
	"": ["($)", "R"],
	"": ["($)", "S"],
	"": ["($)", "T"],
	"": ["($)", "U"],
	"": ["($)", "V"],
	"": ["($)", "W"],
	"": ["($)", "X"],
	"": ["($)", "Y"],
	"": ["($)", "Z"],
	"\x1B": ["(%)", "A"],
	"": ["(%)", "B"],
	"": ["(%)", "C"],
	"": ["(%)", "D"],
	"": ["(%)", "E"],
	"!": ["(/)", "A"],
	"\"": ["(/)", "B"],
	"#": ["(/)", "C"],
	"&": ["(/)", "F"],
	"'": ["(/)", "G"],
	"(": ["(/)", "H"],
	")": ["(/)", "I"],
	"*": ["(/)", "J"],
	",": ["(/)", "L"],
	":": ["(/)", "Z"],
	";": ["(%)", "F"],
	"<": ["(%)", "G"],
	"=": ["(%)", "H"],
	">": ["(%)", "I"],
	"?": ["(%)", "J"],
	"@": ["(%)", "V"],
	"[": ["(%)", "K"],
	"\\": ["(%)", "L"],
	"]": ["(%)", "M"],
	"^": ["(%)", "N"],
	"_": ["(%)", "O"],
	"`": ["(%)", "W"],
	"a": ["(+)", "A"],
	"b": ["(+)", "B"],
	"c": ["(+)", "C"],
	"d": ["(+)", "D"],
	"e": ["(+)", "E"],
	"f": ["(+)", "F"],
	"g": ["(+)", "G"],
	"h": ["(+)", "H"],
	"i": ["(+)", "I"],
	"j": ["(+)", "J"],
	"k": ["(+)", "K"],
	"l": ["(+)", "L"],
	"m": ["(+)", "M"],
	"n": ["(+)", "N"],
	"o": ["(+)", "O"],
	"p": ["(+)", "P"],
	"q": ["(+)", "Q"],
	"r": ["(+)", "R"],
	"s": ["(+)", "S"],
	"t": ["(+)", "T"],
	"u": ["(+)", "U"],
	"v": ["(+)", "V"],
	"w": ["(+)", "W"],
	"x": ["(+)", "X"],
	"y": ["(+)", "Y"],
	"z": ["(+)", "Z"],
	"{": ["(%)", "P"],
	"|": ["(%)", "Q"],
	"}": ["(%)", "R"],
	"~": ["(%)", "S"],
	"": ["(%)", "T"]
};
var CODE93_default = class _CODE93 extends Barcode_default {
	constructor(data, options) {
		super(data, options);
	}
	valid() {
		return /^[0-9A-Z\-. $/+%]+$/.test(this.data);
	}
	encode() {
		const symbols = this.data.split("").flatMap((c) => MULTI_SYMBOLS[c] || c);
		const encoded = symbols.map((s) => _CODE93.getEncoding(s)).join("");
		const csumC = _CODE93.checksum(symbols, 20);
		const csumK = _CODE93.checksum(symbols.concat(csumC), 15);
		return {
			text: this.text,
			data: _CODE93.getEncoding("ÿ") + encoded + _CODE93.getEncoding(csumC) + _CODE93.getEncoding(csumK) + _CODE93.getEncoding("ÿ") + "1"
		};
	}
	static getEncoding(symbol) {
		return BINARIES3[_CODE93.symbolValue(symbol)];
	}
	static getSymbol(symbolValue) {
		return SYMBOLS[symbolValue];
	}
	static symbolValue(symbol) {
		return SYMBOLS.indexOf(symbol);
	}
	static checksum(symbols, maxWeight) {
		const csum = symbols.slice().reverse().reduce((sum, symbol, idx) => {
			const weight = idx % maxWeight + 1;
			return sum + _CODE93.symbolValue(symbol) * weight;
		}, 0);
		return _CODE93.getSymbol(csum % 47);
	}
};
var CODE93FullASCII = class extends CODE93_default {
	constructor(data, options) {
		super(data, options);
	}
	valid() {
		return /^[\x00-\x7f]+$/.test(this.data);
	}
};
var CODE93FullASCII_default = CODE93FullASCII;
var GenericBarcode = class extends Barcode_default {
	constructor(data, options) {
		super(data, options);
	}
	encode() {
		return {
			data: "10101010101010101010101010101010101010101",
			text: this.text
		};
	}
	valid() {
		return true;
	}
};
var barcodes_default = {
	CODE39,
	CODE128: CODE128_AUTO_default,
	CODE128A: CODE128A_default,
	CODE128B: CODE128B_default,
	CODE128C: CODE128C_default,
	EAN13: EAN13_default,
	EAN8: EAN8_default,
	EAN5: EAN5_default,
	EAN2: EAN2_default,
	UPC: UPC_default,
	UPCE: UPCE_default,
	ITF14: ITF14_default,
	ITF: ITF_default,
	MSI: MSI_default,
	MSI10: MSI10_default,
	MSI11: MSI11_default,
	MSI1010: MSI1010_default,
	MSI1110: MSI1110_default,
	pharmacode,
	codabar,
	CODE93: CODE93_default,
	CODE93FullASCII: CODE93FullASCII_default,
	GenericBarcode
};
var merge_default = (old, replaceObj) => ({
	...old,
	...replaceObj
});
var linearizeEncodings_default = linearizeEncodings;
function linearizeEncodings(encodings2) {
	var linearEncodings = [];
	function nextLevel(encoded) {
		if (Array.isArray(encoded)) for (let i = 0; i < encoded.length; i++) nextLevel(encoded[i]);
		else {
			encoded.text = encoded.text || "";
			encoded.data = encoded.data || "";
			linearEncodings.push(encoded);
		}
	}
	nextLevel(encodings2);
	return linearEncodings;
}
var fixOptions_default = fixOptions;
function fixOptions(options) {
	options.marginTop = options.marginTop || options.margin;
	options.marginBottom = options.marginBottom || options.margin;
	options.marginRight = options.marginRight || options.margin;
	options.marginLeft = options.marginLeft || options.margin;
	return options;
}
var optionsFromStrings_default = optionsFromStrings;
function optionsFromStrings(options) {
	var intOptions = [
		"width",
		"height",
		"textMargin",
		"fontSize",
		"margin",
		"marginTop",
		"marginBottom",
		"marginLeft",
		"marginRight"
	];
	for (var intOption in intOptions) if (intOptions.hasOwnProperty(intOption)) {
		intOption = intOptions[intOption];
		if (typeof options[intOption] === "string") options[intOption] = parseInt(options[intOption], 10);
	}
	if (typeof options["displayValue"] === "string") options["displayValue"] = options["displayValue"] != "false";
	return options;
}
var defaults_default = {
	width: 2,
	height: 100,
	format: "auto",
	displayValue: true,
	fontOptions: "",
	font: "monospace",
	text: void 0,
	textAlign: "center",
	textPosition: "bottom",
	textMargin: 2,
	fontSize: 20,
	background: "#ffffff",
	lineColor: "#000000",
	margin: 10,
	marginTop: void 0,
	marginBottom: void 0,
	marginLeft: void 0,
	marginRight: void 0,
	valid: function() {}
};
function getOptionsFromElement(element) {
	var options = {};
	for (var property in defaults_default) if (defaults_default.hasOwnProperty(property)) {
		if (element.hasAttribute("jsbarcode-" + property.toLowerCase())) options[property] = element.getAttribute("jsbarcode-" + property.toLowerCase());
		if (element.hasAttribute("data-" + property.toLowerCase())) options[property] = element.getAttribute("data-" + property.toLowerCase());
	}
	options["value"] = element.getAttribute("jsbarcode-value") || element.getAttribute("data-value");
	options = optionsFromStrings_default(options);
	return options;
}
var getOptionsFromElement_default = getOptionsFromElement;
function getEncodingHeight(encoding, options) {
	return options.height + (options.displayValue && encoding.text.length > 0 ? options.fontSize + options.textMargin : 0) + options.marginTop + options.marginBottom;
}
function getBarcodePadding(textWidth, barcodeWidth, options) {
	if (options.displayValue && barcodeWidth < textWidth) {
		if (options.textAlign == "center") return Math.floor((textWidth - barcodeWidth) / 2);
		else if (options.textAlign == "left") return 0;
		else if (options.textAlign == "right") return Math.floor(textWidth - barcodeWidth);
	}
	return 0;
}
function calculateEncodingAttributes(encodings2, barcodeOptions, context) {
	for (let i = 0; i < encodings2.length; i++) {
		var encoding = encodings2[i];
		var options = merge_default(barcodeOptions, encoding.options);
		var textWidth;
		if (options.displayValue) textWidth = messureText(encoding.text, options, context);
		else textWidth = 0;
		var barcodeWidth = encoding.data.length * options.width;
		encoding.width = Math.ceil(Math.max(textWidth, barcodeWidth));
		encoding.height = getEncodingHeight(encoding, options);
		encoding.barcodePadding = getBarcodePadding(textWidth, barcodeWidth, options);
	}
}
function getTotalWidthOfEncodings(encodings2) {
	var totalWidth = 0;
	for (let i = 0; i < encodings2.length; i++) totalWidth += encodings2[i].width;
	return totalWidth;
}
function getMaximumHeightOfEncodings(encodings2) {
	var maxHeight = 0;
	for (let i = 0; i < encodings2.length; i++) if (encodings2[i].height > maxHeight) maxHeight = encodings2[i].height;
	return maxHeight;
}
function messureText(string, options, context) {
	var ctx;
	if (context) ctx = context;
	else if (typeof document !== "undefined") ctx = document.createElement("canvas").getContext("2d");
	else return 0;
	ctx.font = options.fontOptions + " " + options.fontSize + "px " + options.font;
	var measureTextResult = ctx.measureText(string);
	if (!measureTextResult) return 0;
	return measureTextResult.width;
}
var CanvasRenderer = class {
	constructor(canvas, encodings2, options) {
		this.canvas = canvas;
		this.encodings = encodings2;
		this.options = options;
	}
	render() {
		if (!this.canvas.getContext) throw new Error("The browser does not support canvas.");
		this.prepareCanvas();
		for (let i = 0; i < this.encodings.length; i++) {
			var encodingOptions = merge_default(this.options, this.encodings[i].options);
			this.drawCanvasBarcode(encodingOptions, this.encodings[i]);
			this.drawCanvasText(encodingOptions, this.encodings[i]);
			this.moveCanvasDrawing(this.encodings[i]);
		}
		this.restoreCanvas();
	}
	prepareCanvas() {
		var ctx = this.canvas.getContext("2d");
		ctx.save();
		calculateEncodingAttributes(this.encodings, this.options, ctx);
		var totalWidth = getTotalWidthOfEncodings(this.encodings);
		var maxHeight = getMaximumHeightOfEncodings(this.encodings);
		this.canvas.width = totalWidth + this.options.marginLeft + this.options.marginRight;
		this.canvas.height = maxHeight;
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		if (this.options.background) {
			ctx.fillStyle = this.options.background;
			ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		}
		ctx.translate(this.options.marginLeft, 0);
	}
	drawCanvasBarcode(options, encoding) {
		var ctx = this.canvas.getContext("2d");
		var binary = encoding.data;
		var yFrom;
		if (options.textPosition == "top") yFrom = options.marginTop + options.fontSize + options.textMargin;
		else yFrom = options.marginTop;
		ctx.fillStyle = options.lineColor;
		for (var b = 0; b < binary.length; b++) {
			var x = b * options.width + encoding.barcodePadding;
			if (binary[b] === "1") ctx.fillRect(x, yFrom, options.width, options.height);
			else if (binary[b]) ctx.fillRect(x, yFrom, options.width, options.height * binary[b]);
		}
	}
	drawCanvasText(options, encoding) {
		var ctx = this.canvas.getContext("2d");
		var font = options.fontOptions + " " + options.fontSize + "px " + options.font;
		if (options.displayValue) {
			var x, y;
			if (options.textPosition == "top") y = options.marginTop + options.fontSize - options.textMargin;
			else y = options.height + options.textMargin + options.marginTop + options.fontSize;
			ctx.font = font;
			if (options.textAlign == "left" || encoding.barcodePadding > 0) {
				x = 0;
				ctx.textAlign = "left";
			} else if (options.textAlign == "right") {
				x = encoding.width - 1;
				ctx.textAlign = "right";
			} else {
				x = encoding.width / 2;
				ctx.textAlign = "center";
			}
			ctx.fillText(encoding.text, x, y);
		}
	}
	moveCanvasDrawing(encoding) {
		this.canvas.getContext("2d").translate(encoding.width, 0);
	}
	restoreCanvas() {
		this.canvas.getContext("2d").restore();
	}
};
var canvas_default = CanvasRenderer;
var svgns = "http://www.w3.org/2000/svg";
var SVGRenderer = class {
	constructor(svg, encodings2, options) {
		this.svg = svg;
		this.encodings = encodings2;
		this.options = options;
		this.document = options.xmlDocument || document;
	}
	render() {
		var currentX = this.options.marginLeft;
		this.prepareSVG();
		for (let i = 0; i < this.encodings.length; i++) {
			var encoding = this.encodings[i];
			var encodingOptions = merge_default(this.options, encoding.options);
			var group = this.createGroup(currentX, encodingOptions.marginTop, this.svg);
			this.setGroupOptions(group, encodingOptions);
			this.drawSvgBarcode(group, encodingOptions, encoding);
			this.drawSVGText(group, encodingOptions, encoding);
			currentX += encoding.width;
		}
	}
	prepareSVG() {
		while (this.svg.firstChild) this.svg.removeChild(this.svg.firstChild);
		calculateEncodingAttributes(this.encodings, this.options);
		var totalWidth = getTotalWidthOfEncodings(this.encodings);
		var maxHeight = getMaximumHeightOfEncodings(this.encodings);
		var width = totalWidth + this.options.marginLeft + this.options.marginRight;
		this.setSvgAttributes(width, maxHeight);
		if (this.options.background) this.drawRect(0, 0, width, maxHeight, this.svg).setAttribute("fill", this.options.background);
	}
	drawSvgBarcode(parent, options, encoding) {
		var binary = encoding.data;
		var yFrom;
		if (options.textPosition == "top") yFrom = options.fontSize + options.textMargin;
		else yFrom = 0;
		var barWidth = 0;
		var x = 0;
		for (var b = 0; b < binary.length; b++) {
			x = b * options.width + encoding.barcodePadding;
			if (binary[b] === "1") barWidth++;
			else if (barWidth > 0) {
				this.drawRect(x - options.width * barWidth, yFrom, options.width * barWidth, options.height, parent);
				barWidth = 0;
			}
		}
		if (barWidth > 0) this.drawRect(x - options.width * (barWidth - 1), yFrom, options.width * barWidth, options.height, parent);
	}
	drawSVGText(parent, options, encoding) {
		var textElem = this.document.createElementNS(svgns, "text");
		if (options.displayValue) {
			var x, y;
			textElem.setAttribute("font-family", options.font);
			textElem.setAttribute("font-size", options.fontSize);
			if (options.fontOptions.includes("bold")) textElem.setAttribute("font-weight", "bold");
			if (options.fontOptions.includes("italic")) textElem.setAttribute("font-style", "italic");
			if (options.textPosition == "top") y = options.fontSize - options.textMargin;
			else y = options.height + options.textMargin + options.fontSize;
			if (options.textAlign == "left" || encoding.barcodePadding > 0) {
				x = 0;
				textElem.setAttribute("text-anchor", "start");
			} else if (options.textAlign == "right") {
				x = encoding.width - 1;
				textElem.setAttribute("text-anchor", "end");
			} else {
				x = encoding.width / 2;
				textElem.setAttribute("text-anchor", "middle");
			}
			textElem.setAttribute("x", x);
			textElem.setAttribute("y", y);
			textElem.appendChild(this.document.createTextNode(encoding.text));
			parent.appendChild(textElem);
		}
	}
	setSvgAttributes(width, height) {
		var svg = this.svg;
		svg.setAttribute("width", width + "px");
		svg.setAttribute("height", height + "px");
		svg.setAttribute("x", "0px");
		svg.setAttribute("y", "0px");
		svg.setAttribute("viewBox", "0 0 " + width + " " + height);
		svg.setAttribute("xmlns", svgns);
		svg.setAttribute("version", "1.1");
	}
	createGroup(x, y, parent) {
		var group = this.document.createElementNS(svgns, "g");
		group.setAttribute("transform", "translate(" + x + ", " + y + ")");
		parent.appendChild(group);
		return group;
	}
	setGroupOptions(group, options) {
		group.setAttribute("fill", options.lineColor);
	}
	drawRect(x, y, width, height, parent) {
		var rect = this.document.createElementNS(svgns, "rect");
		rect.setAttribute("x", x);
		rect.setAttribute("y", y);
		rect.setAttribute("width", width);
		rect.setAttribute("height", height);
		parent.appendChild(rect);
		return rect;
	}
};
var svg_default = SVGRenderer;
var ObjectRenderer = class {
	constructor(object, encodings2, options) {
		this.object = object;
		this.encodings = encodings2;
		this.options = options;
	}
	render() {
		this.object.encodings = this.encodings;
	}
};
var renderers_default = {
	CanvasRenderer: canvas_default,
	SVGRenderer: svg_default,
	ObjectRenderer
};
var InvalidInputException = class extends Error {
	constructor(symbology, input) {
		super();
		this.name = "InvalidInputException";
		this.symbology = symbology;
		this.input = input;
		this.message = "\"" + this.input + "\" is not a valid input for " + this.symbology;
	}
};
var InvalidElementException = class extends Error {
	constructor() {
		super();
		this.name = "InvalidElementException";
		this.message = "Not supported type to render on";
	}
};
var NoElementException = class extends Error {
	constructor() {
		super();
		this.name = "NoElementException";
		this.message = "No element to render on.";
	}
};
function getRenderProperties(element) {
	if (typeof element === "string") return querySelectedRenderProperties(element);
	else if (Array.isArray(element)) {
		var returnArray = [];
		for (let i = 0; i < element.length; i++) returnArray.push(getRenderProperties(element[i]));
		return returnArray;
	} else if (typeof HTMLCanvasElement !== "undefined" && element instanceof HTMLImageElement) return newCanvasRenderProperties(element);
	else if (element && element.nodeName && element.nodeName.toLowerCase() === "svg" || typeof SVGElement !== "undefined" && element instanceof SVGElement) return {
		element,
		options: getOptionsFromElement_default(element),
		renderer: renderers_default.SVGRenderer
	};
	else if (typeof HTMLCanvasElement !== "undefined" && element instanceof HTMLCanvasElement) return {
		element,
		options: getOptionsFromElement_default(element),
		renderer: renderers_default.CanvasRenderer
	};
	else if (element && element.getContext) return {
		element,
		renderer: renderers_default.CanvasRenderer
	};
	else if (element && typeof element === "object" && !element.nodeName) return {
		element,
		renderer: renderers_default.ObjectRenderer
	};
	else throw new InvalidElementException();
}
function querySelectedRenderProperties(string) {
	var selector = document.querySelectorAll(string);
	if (selector.length === 0) return;
	else {
		let returnArray = [];
		for (let i = 0; i < selector.length; i++) returnArray.push(getRenderProperties(selector[i]));
		return returnArray;
	}
}
function newCanvasRenderProperties(imgElement) {
	var canvas = document.createElement("canvas");
	return {
		element: canvas,
		options: getOptionsFromElement_default(imgElement),
		renderer: renderers_default.CanvasRenderer,
		afterRender: function() {
			imgElement.setAttribute("src", canvas.toDataURL());
		}
	};
}
var getRenderProperties_default = getRenderProperties;
var ErrorHandler = class {
	constructor(api) {
		this.api = api;
	}
	handleCatch(e) {
		if (e.name === "InvalidInputException") {
			if (this.api._options.valid !== this.api._defaults.valid) this.api._options.valid(false);
			else throw e.message;
		} else throw e;
		this.api.render = function() {};
	}
	wrapBarcodeCall(func) {
		try {
			var result = func(...arguments);
			this.api._options.valid(true);
			return result;
		} catch (e) {
			this.handleCatch(e);
			return this.api;
		}
	}
};
var ErrorHandler_default = ErrorHandler;
var API = function() {};
var JsBarcode = function(element, text, options) {
	var api = new API();
	if (typeof element === "undefined") throw Error("No element to render on was provided.");
	api._renderProperties = getRenderProperties_default(element);
	api._encodings = [];
	api._options = defaults_default;
	api._errorHandler = new ErrorHandler_default(api);
	if (typeof text !== "undefined") {
		options = options || {};
		if (!options.format) options.format = autoSelectBarcode();
		api.options(options)[options.format](text, options).render();
	}
	return api;
};
JsBarcode.getModule = function(name2) {
	return barcodes_default[name2];
};
for (name in barcodes_default) if (barcodes_default.hasOwnProperty(name)) registerBarcode(barcodes_default, name);
var name;
function registerBarcode(barcodes, name2) {
	API.prototype[name2] = API.prototype[name2.toUpperCase()] = API.prototype[name2.toLowerCase()] = function(text, options) {
		var api = this;
		return api._errorHandler.wrapBarcodeCall(function() {
			options.text = typeof options.text === "undefined" ? void 0 : "" + options.text;
			var newOptions = merge_default(api._options, options);
			newOptions = optionsFromStrings_default(newOptions);
			var Encoder = barcodes[name2];
			var encoded = encode2(text, Encoder, newOptions);
			api._encodings.push(encoded);
			return api;
		});
	};
}
function encode2(text, Encoder, options) {
	text = "" + text;
	var encoder = new Encoder(text, options);
	if (!encoder.valid()) throw new InvalidInputException(encoder.constructor.name, text);
	var encoded = encoder.encode();
	encoded = linearizeEncodings_default(encoded);
	for (let i = 0; i < encoded.length; i++) encoded[i].options = merge_default(options, encoded[i].options);
	return encoded;
}
function autoSelectBarcode() {
	if (barcodes_default["CODE128"]) return "CODE128";
	return Object.keys(barcodes_default)[0];
}
API.prototype.options = function(options) {
	this._options = merge_default(this._options, options);
	return this;
};
API.prototype.blank = function(size) {
	const zeroes = new Array(size + 1).join("0");
	this._encodings.push({ data: zeroes });
	return this;
};
API.prototype.init = function() {
	if (!this._renderProperties) return;
	if (!Array.isArray(this._renderProperties)) this._renderProperties = [this._renderProperties];
	var renderProperty;
	for (let i in this._renderProperties) {
		renderProperty = this._renderProperties[i];
		var options = merge_default(this._options, renderProperty.options);
		if (options.format == "auto") options.format = autoSelectBarcode();
		this._errorHandler.wrapBarcodeCall(function() {
			var text = options.value;
			var Encoder = barcodes_default[options.format.toUpperCase()];
			var encoded = encode2(text, Encoder, options);
			render(renderProperty, encoded, options);
		});
	}
};
API.prototype.render = function() {
	if (!this._renderProperties) throw new NoElementException();
	if (Array.isArray(this._renderProperties)) for (var i = 0; i < this._renderProperties.length; i++) render(this._renderProperties[i], this._encodings, this._options);
	else render(this._renderProperties, this._encodings, this._options);
	return this;
};
API.prototype._defaults = defaults_default;
function render(renderProperties, encodings2, options) {
	encodings2 = linearizeEncodings_default(encodings2);
	for (let i = 0; i < encodings2.length; i++) {
		encodings2[i].options = merge_default(options, encodings2[i].options);
		fixOptions_default(encodings2[i].options);
	}
	fixOptions_default(options);
	var Renderer = renderProperties.renderer;
	new Renderer(renderProperties.element, encodings2, options).render();
	if (renderProperties.afterRender) renderProperties.afterRender();
}
if (typeof window !== "undefined") window.JsBarcode = JsBarcode;
if (typeof jQuery !== "undefined") jQuery.fn.JsBarcode = function(content, options) {
	var elementArray = [];
	jQuery(this).each(function() {
		elementArray.push(this);
	});
	return JsBarcode(elementArray, content, options);
};
const barcode = JsBarcode;
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
		barcode(element, barcodeValue, this.options);
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