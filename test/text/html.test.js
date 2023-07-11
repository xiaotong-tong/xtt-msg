const { replace } = require("xtt-msg");

test("文本-注音", async () => {
	let input = "![文本-注音](汉字-->>hanzi)";
	expect(await replace(input)).toBe("<ruby>汉字<rp>(</rp><rt>hanzi</rt><rp>)</rp></ruby>");

	input = "![文本-注音](汉字-->>)";
	expect(await replace(input)).toBe("<ruby>汉字<rp>(</rp><rt></rt><rp>)</rp></ruby>");

	input = "![文本-注音](-->>hanzi)";
	expect(await replace(input)).toBe("<ruby><rp>(</rp><rt>hanzi</rt><rp>)</rp></ruby>");

	input = "![文本-注音](-->>)";
	expect(await replace(input)).toBe("");

	input = "![文本-注音]()";
	expect(await replace(input)).toBe("");

	input = "![文本-注音]";
	expect(await replace(input)).toBe("![文本-注音]");
});

test("文本-文字颜色", async () => {
	let input = "![文本-文字颜色](汉字-->>red)";
	expect(await replace(input)).toBe('<span style="color: red;" >汉字</span>');

	input = "![文本-文字颜色](<i>汉字</i>-->>red)";
	expect(await replace(input)).toBe('<i style="color: red;">汉字</i>');

	input = "![文本-文字颜色](<i style='font-size: 14px;'>汉字</i>-->>red)";
	expect(await replace(input)).toBe('<i style="font-size: 14px; color: red;">汉字</i>');

	input = "![文本-文字颜色](汉字-->>)";
	expect(await replace(input)).toBe("<span>汉字</span>");

	input = "![文本-文字颜色](<i>汉字</i>-->>)";
	expect(await replace(input)).toBe("<i>汉字</i>");

	input = "![文本-文字颜色](-->>)";
	expect(await replace(input)).toBe("");

	input = "![文本-文字颜色]";
	expect(await replace(input)).toBe("![文本-文字颜色]");
});

test("文本-黑幕", async () => {
	let input = "![文本-黑幕](汉字)";
	expect(await replace(input)).toBe('<span class="heimu">汉字</span>');

	input = "![文本-黑幕](<i>汉字</i>)";
	expect(await replace(input)).toBe('<i class="heimu">汉字</i>');

	input = "![文本-黑幕](<i class='a'>汉字</i>)";
	expect(await replace(input)).toBe('<i class="a heimu">汉字</i>');

	input = "![文本-黑幕]()";
	expect(await replace(input)).toBe("");

	input = "![文本-黑幕]";
	expect(await replace(input)).toBe("![文本-黑幕]");
});

test("换行", async () => {
	let input = "![换行]()";
	expect(await replace(input)).toBe("<br />");
});

test("空格", async () => {
	let input = "![空格]()";
	expect(await replace(input)).toBe("&nbsp;");
});
