const { replace } = require("xtt-msg");

test("文本-反转文本", async () => {
	let input = "![文本-反转文本](我是xtt)";
	expect(await replace(input)).toBe("ttx是我");

	input = "![文本-反转文本]()";
	expect(await replace(input)).toBe("");

	input = "![文本-反转文本]";
	expect(await replace(input)).toBe("![文本-反转文本]");
});

test("文本-取文本左", async () => {
	let input = "![文本-取文本左](我是xtt-->>x)";
	expect(await replace(input)).toBe("我是");

	input = "![文本-取文本左](我是xttxttxtt-->>x-->>2)";
	expect(await replace(input)).toBe("我是xtt");

	input = "![文本-取文本左](我是xxtt-->>x-->>2)";
	expect(await replace(input)).toBe("我是x");

	input = "![文本-取文本左](x我是xttxttxtt-->>x-->>2)";
	expect(await replace(input)).toBe("x我是");

	input = "![文本-取文本左](我是xtt1xtt2xtt-->>\\d-->>2)";
	expect(await replace(input)).toBe("我是xtt1xtt");

	input = "![文本-取文本左](我是xtt-->>)";
	expect(await replace(input)).toBe("我是xtt");

	input = "![文本-取文本左](-->>x)";
	expect(await replace(input)).toBe("");

	input = "![文本-取文本左]";
	expect(await replace(input)).toBe("![文本-取文本左]");
});

test("文本-取文本右", async () => {
	let input = "![文本-取文本右](我是xtt-->>x)";
	expect(await replace(input)).toBe("tt");

	input = "![文本-取文本右](我是xxtt-->>x-->>2)";
	expect(await replace(input)).toBe("tt");

	input = "![文本-取文本右](我是xxttx-->>x-->>2)";
	expect(await replace(input)).toBe("ttx");

	input = "![文本-取文本右](x我是xtt-->>x)";
	expect(await replace(input)).toBe("我是xtt");

	input = "![文本-取文本右](x我是xttx-->>x-->>2)";
	expect(await replace(input)).toBe("ttx");

	input = "![文本-取文本右](我是1xtt-->>\\d)";
	expect(await replace(input)).toBe("xtt");

	input = "![文本-取文本右](1我是2xt3t-->>\\d-->>2)";
	expect(await replace(input)).toBe("xt3t");

	input = "![文本-取文本右](我是xtt-->>)";
	expect(await replace(input)).toBe("我是xtt");

	input = "![文本-取文本右](-->>x)";
	expect(await replace(input)).toBe("");

	input = "![文本-取文本右]";
	expect(await replace(input)).toBe("![文本-取文本右]");
});

test("文本-取中间", async () => {
	let input = "![文本-取中间](我是xtt-->>是-->>t)";
	expect(await replace(input)).toBe("x");
});

test("文本-取数字", async () => {
	let input = "![文本-取数字](21dfasd23)";
	expect(await replace(input)).toBe("2123");

	input = "![文本-取数字](21df.asd23)";
	expect(await replace(input)).toBe("21.23");

	input = "![文本-取数字](-21df.asd23)";
	expect(await replace(input)).toBe("-21.23");

	input = "![文本-取数字](-df.asd23)";
	expect(await replace(input)).toBe("-0.23");

	input = "![文本-取数字](df.asd23)";
	expect(await replace(input)).toBe("0.23");

	input = "![文本-取数字](21df.asd)";
	expect(await replace(input)).toBe("21");

	input = "![文本-取数字](df.afd)";
	expect(await replace(input)).toBe("");

	input = "![文本-取数字]()";
	expect(await replace(input)).toBe("");

	input = "![文本-取数字]";
	expect(await replace(input)).toBe("![文本-取数字]");
});

test("文本-替换", async () => {
	let input = "![文本-替换](我是xtt-->>x-->>xx)";
	expect(await replace(input)).toBe("我是xxtt");

	input = "![文本-替换](1我是2xtt3-->>1,2,3-->>a,b,c)";
	expect(await replace(input)).toBe("a我是bxttc");

	input = "![文本-替换](1我是2xtt3-->>\\d-->>a)";
	expect(await replace(input)).toBe("a我是axtta");

	input = "![文本-替换](1我是2xtt3-->>\\d,x,t(?=t)-->>a,b,c)";
	expect(await replace(input)).toBe("a我是abcta");

	input = "![文本-替换](1我是2xtt3-->>\\d,x,t(?=t)-->>a,b)";
	expect(await replace(input)).toBe("a我是abta");

	input = "![文本-替换](1我是2xtt3-->>\\d,x,t(?=t))";
	expect(await replace(input)).toBe("1我是2xtt3");

	input = "![文本-替换]()";
	expect(await replace(input)).toBe("");

	input = "![文本-替换]";
	expect(await replace(input)).toBe("![文本-替换]");
});
