const { showTextBrowser } = require("../../dist/showText.cjs");

test("喵语", async () => {
	let input = "【喵语-->>Hello World!】";
	expect(await showTextBrowser(input)).toBe(
		"喵喵nya‌喵‍ニャー‌喵ニャー‍‌喵ニャー‍‌喵ニャー‎‌‍nya‌喵~‎‌喵ニャー‎‌喵にゃ~‌喵ニャー‍‌喵‍‍‌‍喵."
	);

	input = "【喵语-->>】";
	expect(await showTextBrowser(input)).toBe("");

	input = "【喵语】";
	expect(await showTextBrowser(input)).toBe("");

	showTextBrowser("【变量-->>nyaLang-->>a,b,c,d,e,f,g,h】");
	input = "【喵语-->>Hello World!】";
	expect(await showTextBrowser(input)).toBe(
		"bba‌bef‌bfe‌bfe‌bfh‌ea‌bch‌bfh‌bgc‌bfe‌bee‌eb."
	);
	showTextBrowser(
		"【变量-->>nyaLang-->>nya,喵,~,!,\u200d,ニャー,にゃ,\u200e】"
	);
});

test("解喵语", async () => {
	let input =
		"【解喵语-->>喵喵nya‌喵‍ニャー‌喵ニャー‍‌喵ニャー‍‌喵ニャー‎‌‍nya‌喵~‎‌喵ニャー‎‌喵にゃ~‌喵ニャー‍‌喵‍‍‌‍喵.】";
	expect(await showTextBrowser(input)).toBe("Hello World!");

	input =
		"【解喵语-->>喵喵Hellonya‌喵‍ニャー‌喵ニャー‍‌喵ニャー‍‌喵ニャー‎‌‍nya‌喵~‎‌喵ニャー‎‌喵にゃ~‌World喵ニャー‍‌喵‍‍‌‍喵.】";
	expect(await showTextBrowser(input)).toBe("遇到了不认识的喵语呢。");

	input = "【解喵语-->>】";
	expect(await showTextBrowser(input)).toBe("");

	input = "【解喵语】";
	expect(await showTextBrowser(input)).toBe("");

	showTextBrowser("【变量-->>nyaLang-->>a,b,c,d,e,f,g,h】");
	input = "【解喵语-->>bba‌bef‌bfe‌bfe‌bfh‌ea‌bch‌bfh‌bgc‌bfe‌bee‌eb.】";
	expect(await showTextBrowser(input)).toBe("Hello World!");
	showTextBrowser(
		"【变量-->>nyaLang-->>nya,喵,~,!,\u200d,ニャー,にゃ,\u200e】"
	);
});
