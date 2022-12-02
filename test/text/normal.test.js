const { showTextBrowser } = require("../../dist/showText.cjs");

test("当前时间", () => {
	const now = Date.now;
	global.Date.now = () => 1672498800000;

	let input = "【当前时间】";
	expect(showTextBrowser(input)).toBe("2023-01-01 00:00:00");

	input = "【当前时间-->>all】";
	expect(showTextBrowser(input)).toBe("2023-01-01 00:00:00 星期日");

	input = "【当前时间-->>现在是=年=年，=月=月份】";
	expect(showTextBrowser(input)).toBe("现在是2023年，01月份");

	input = "【当前时间-->>现在是=时=点=分=分】";
	expect(showTextBrowser(input)).toBe("现在是00点00分");

	global.Date.now = now;
});

test("返回", () => {
	let input = "【文本-反转文本-->>我是xtt【返回-->>xtt】】";
	expect(showTextBrowser(input)).toBe("xtt");

	input = "【文本-反转文本-->>我是xtt【返回-->>xtt】】abc";
	expect(showTextBrowser(input)).toBe("xttabc");

	input = "【文本-反转文本-->>我是xtt【返回-->>xtt-->>0】】";
	expect(showTextBrowser(input)).toBe("ttx");

	input = `【文本-反转文本-->>
				【文本-反转文本-->>
					我是xtt【返回-->>xtt】
				】
			abc】`;
	expect(showTextBrowser(input)).toBe("cbattx");

	input = "【文本-反转文本-->>我是xtt【返回-->>】】";
	expect(showTextBrowser(input)).toBe("ttx是我");
});

test("变量", () => {
	let input = "【变量-->>a-->>1】【变量-->>a】";
	expect(showTextBrowser(input)).toBe("1");

	input = "【变量-->>b】";
	expect(showTextBrowser(input)).toBe("没有变量b哦");

	input = "【变量-->>c-->>【变量-->>a】】【变量-->>c】";
	expect(showTextBrowser(input)).toBe("1");

	input = "【变量-->>】";
	expect(showTextBrowser(input)).toBe("");

	input = "【变量】";
	expect(showTextBrowser(input)).toBe("");
});
