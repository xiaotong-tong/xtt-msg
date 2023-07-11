const { replace } = require("xtt-msg");

test("喵语", async () => {
	let input = "![喵语](Hello World!)";
	expect(await replace(input)).toBe(
		"喵喵nya‌喵‍ニャー‌喵ニャー‍‌喵ニャー‍‌喵ニャー‎‌‍nya‌喵~‎‌喵ニャー‎‌喵にゃ~‌喵ニャー‍‌喵‍‍‌‍喵."
	);

	input = "![喵语]()";
	expect(await replace(input)).toBe("");

	input = "![喵语]";
	expect(await replace(input)).toBe("![喵语]");

	replace("![变量](nyaLang-->>a,b,c,d,e,f,g,h)");
	input = "![喵语](Hello World!)";
	expect(await replace(input)).toBe("bba‌bef‌bfe‌bfe‌bfh‌ea‌bch‌bfh‌bgc‌bfe‌bee‌eb.");
	replace("![变量](nyaLang-->>nya,喵,~,!,\u200d,ニャー,にゃ,\u200e)");
});

test("解喵语", async () => {
	let input =
		"![解喵语](喵喵nya‌喵‍ニャー‌喵ニャー‍‌喵ニャー‍‌喵ニャー‎‌‍nya‌喵~‎‌喵ニャー‎‌喵にゃ~‌喵ニャー‍‌喵‍‍‌‍喵.)";
	expect(await replace(input)).toBe("Hello World!");

	input =
		"![解喵语](喵喵Hellonya‌喵‍ニャー‌喵ニャー‍‌喵ニャー‍‌喵ニャー‎‌‍nya‌喵~‎‌喵ニャー‎‌喵にゃ~‌World喵ニャー‍‌喵‍‍‌‍喵.)";
	expect(await replace(input)).toBe("遇到了不认识的喵语呢。");

	input = "![解喵语]()";
	expect(await replace(input)).toBe("");

	input = "![解喵语]";
	expect(await replace(input)).toBe("![解喵语]");

	replace("![变量](nyaLang-->>a,b,c,d,e,f,g,h)");
	input = "![解喵语](bba‌bef‌bfe‌bfe‌bfh‌ea‌bch‌bfh‌bgc‌bfe‌bee‌eb.)";
	expect(await replace(input)).toBe("Hello World!");
	replace("![变量](nyaLang-->>nya,喵,~,!,\u200d,ニャー,にゃ,\u200e)");
});
