const { showTextBrowser } = require("../../dist/showText.cjs");
const { expect } = require("@jest/globals");

test("计算", () => {
	let input = "【计算-->>3+2】";
	expect(showTextBrowser(input)).toBe("5");

	input = "【计算-->>0】";
	expect(showTextBrowser(input)).toBe("0");

	input = "【计算-->>【计算-->>3+2】-【计算-->>1*2】】";
	expect(showTextBrowser(input)).toBe("3");

	input = "【计算-->>】";
	expect(showTextBrowser(input)).toBe("");

	input = "【计算】";
	expect(showTextBrowser(input)).toBe("");

	// 该处为报错信息，报错信息会停止代码运算，并抛弃所有已计算结果，只返回报错信息
	input = "【计算-->>a+b】";
	expect(showTextBrowser(input)).toBe("请将【计算-->>a+b】改为正确的计算公式");
});

test("选择", () => {
	let input = "【选择-->>2-->>a-->>2-->>3】";
	expect(showTextBrowser(input)).toBe("2");

	input = "【选择-->>-1-->>a-->>2-->>3】";
	expect(showTextBrowser(input)).toBe("3");

	input = "【选择-->>5-->>a-->>2-->>3】";
	expect(showTextBrowser(input)).toBe("3");

	input = "【选择-->>-5-->>a-->>2-->>3】";
	expect(showTextBrowser(input)).toBe("a");

	input =
		"【选择-->>【计算-->>1*2】-->>【计算-->>10+1】-->>【计算-->>10+2】-->>【计算-->>10+3】】";
	expect(showTextBrowser(input)).toBe("12");

	input = "【选择-->>b-->>?<a>4-->>?<b>3-->>?<c>2】";
	expect(showTextBrowser(input)).toBe("3");

	input = "【选择-->>-->>a-->>2-->>3】";
	expect(showTextBrowser(input)).toBe("");

	input = "【选择-->>2-->>a-->>-->>3】";
	expect(showTextBrowser(input)).toBe("");

	input = "【选择-->>m-->>?<a>4-->>?<b>3-->>?<c>2】";
	expect(showTextBrowser(input)).toBe("");

	input = "【选择】";
	expect(showTextBrowser(input)).toBe("");

	input = "【选择-->>-->>?<>a-->>】";
	expect(showTextBrowser(input)).toBe("");
});

test("判断", () => {
	let input = "【判断-->>3>2-->>1-->>0】";
	expect(showTextBrowser(input)).toBe("1");

	input = "【判断-->>3!==3-->>1-->>0】";
	expect(showTextBrowser(input)).toBe("0");

	input = "【判断-->>'b'>'a'-->>1-->>0】";
	expect(showTextBrowser(input)).toBe("1");

	input = "【判断-->>0-->>1-->>0】";
	expect(showTextBrowser(input)).toBe("0");

	input = "【判断】";
	expect(showTextBrowser(input)).toBe("");

	input = "【判断-->>-->>1-->>0】";
	expect(showTextBrowser(input)).toBe("");

	input = "【判断-->>0-->>1】";
	expect(showTextBrowser(input)).toBe("");

	// 该处为报错信息，报错信息会停止代码运算，并抛弃所有已计算结果，只返回报错信息
	input = "【判断-->>b>a-->>1-->>0】";
	expect(showTextBrowser(input)).toBe(
		"请将【判断-->>b>a-->>1-->>0】改为正确的判断公式"
	);
});

test("随机数", () => {
	let input = "【随机数】";
	let value = +showTextBrowser(input);
	expect(value).toBeGreaterThanOrEqual(1);
	expect(value).toBeLessThanOrEqual(100);

	input = "【随机数-->>1-->>10】";
	value = +showTextBrowser(input);
	expect(value).toBeGreaterThanOrEqual(1);
	expect(value).toBeLessThanOrEqual(10);

	input = "【随机数-->>-->>10】";
	value = +showTextBrowser(input);
	expect(value).toBeGreaterThanOrEqual(1);
	expect(value).toBeLessThanOrEqual(10);

	input = "【随机数-->>90-->>】";
	value = +showTextBrowser(input);
	expect(value).toBeGreaterThanOrEqual(90);
	expect(value).toBeLessThanOrEqual(100);

	input = "【随机数-->>5-->>5】";
	value = +showTextBrowser(input);
	expect(value).toBeGreaterThanOrEqual(5);
	expect(value).toBeLessThanOrEqual(5);

	input = "【随机数-->>10-->>1】";
	value = +showTextBrowser(input);
	expect(value).toBeGreaterThanOrEqual(1);
	expect(value).toBeLessThanOrEqual(10);
});

test("权重随机数", () => {
	let input = "【权重随机数-->>1,2,3,4,5-->>1,1,2,2,1】";
	let value = +showTextBrowser(input);
	expect(value).toBeGreaterThanOrEqual(1);
	expect(value).toBeLessThanOrEqual(5);

	input = "【权重随机数】";
	expect(showTextBrowser(input)).toBe("");

	input = "【权重随机数-->>-->>1,1,2,2,1】";
	expect(showTextBrowser(input)).toBe("");

	input = "【权重随机数-->>1,2,3,4,5】";
	value = +showTextBrowser(input);
	expect(value).toBeGreaterThanOrEqual(1);
	expect(value).toBeLessThanOrEqual(5);

	input = "【权重随机数-->>1,2,3-->>1,1,2,2,1】";
	value = +showTextBrowser(input);
	expect(value).toBeGreaterThanOrEqual(1);
	expect(value).toBeLessThanOrEqual(3);
});

expect.extend({
	toBeStrArrayBetweenMinAndMax: (actual, min, max) => {
		const array = actual.split(",");
		if (new Set(array).size !== max - min + 1) {
			throw new Error("number count is error!");
		}
		if (Math.max(...array) !== max || Math.min(...array) !== min) {
			return {
				message: "min or max number is error!",
				pass: false
			};
		} else {
			return {
				pass: true
			};
		}
	}
});
test("非重随机数", () => {
	let input = "【非重随机数-->>1-->>10】";
	let value = showTextBrowser(input);
	expect(value).toBeStrArrayBetweenMinAndMax(1, 10);

	input = "【非重随机数】";
	value = showTextBrowser(input);
	expect(value).toBeStrArrayBetweenMinAndMax(1, 10);

	input = "【非重随机数-->>1-->>10-->>a】";
	value = showTextBrowser(input);
	expect(value).toBe("");

	value = +showTextBrowser("【变量-->>a】");
	expect(value).toBeGreaterThanOrEqual(1);
	expect(value).toBeLessThanOrEqual(10);
});

test("八进制", () => {
	let input = "【八进制-->>10】";
	expect(showTextBrowser(input)).toBe("0o12");

	input = "【八进制-->>H】";
	expect(showTextBrowser(input)).toBe("0o110");

	input = "【八进制-->>八】";
	expect(showTextBrowser(input)).toBe("0o50553");

	input = "【八进制-->>】";
	expect(showTextBrowser(input)).toBe("");

	input = "【八进制】";
	expect(showTextBrowser(input)).toBe("");
});

test("十六进制", () => {
	let input = "【十六进制-->>10】";
	expect(showTextBrowser(input)).toBe("0xa");

	input = "【十六进制-->>H】";
	expect(showTextBrowser(input)).toBe("0x48");

	input = "【十六进制-->>八】";
	expect(showTextBrowser(input)).toBe("0x516b");

	input = "【十六进制-->>】";
	expect(showTextBrowser(input)).toBe("");

	input = "【十六进制】";
	expect(showTextBrowser(input)).toBe("");
});

test("十进制", () => {
	let input = "【十进制-->>0xa】";
	expect(showTextBrowser(input)).toBe("10");

	input = "【十进制-->>H】";
	expect(showTextBrowser(input)).toBe("72");

	input = "【十进制-->>八】";
	expect(showTextBrowser(input)).toBe("20843");

	input = "【十进制-->>】";
	expect(showTextBrowser(input)).toBe("");

	input = "【十进制】";
	expect(showTextBrowser(input)).toBe("");
});

test("二进制", () => {
	let input = "【二进制-->>10】";
	expect(showTextBrowser(input)).toBe("0b1010");

	input = "【二进制-->>H】";
	expect(showTextBrowser(input)).toBe("0b1001000");

	input = "【二进制-->>八】";
	expect(showTextBrowser(input)).toBe("0b101000101101011");

	input = "【二进制-->>】";
	expect(showTextBrowser(input)).toBe("");

	input = "【二进制】";
	expect(showTextBrowser(input)).toBe("");
});
