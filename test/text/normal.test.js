const { showTextBrowser } = require("../../dist/showText.cjs");

test("当前时间", () => {
	const now = Date.now;
	global.Date.now = () => 1672531200000;

	let input = "【当前时间】";
	expect(showTextBrowser(input)).toBe("2023-01-01 00:00:00");

	input = "【当前时间-->>all】";
	expect(showTextBrowser(input)).toBe("2023-01-01 00:00:00 星期日");

	global.Date.now = now;
});
