const { showTextBrowser } = require("../../dist/showText.cjs");

test("文本-反转文本", () => {
	let input = "【文本-反转文本-->>我是xtt】";
	expect(showTextBrowser(input)).toBe("ttx是我");

	input = "【文本-反转文本-->>】";
	expect(showTextBrowser(input)).toBe("");

	input = "【文本-反转文本】";
	expect(showTextBrowser(input)).toBe("");
});

test("文本-取文本左", () => {
	let input = "【文本-取文本左-->>我是xtt-->>x】";
	expect(showTextBrowser(input)).toBe("我是");

	input = "【文本-取文本左-->>我是xttxttxtt-->>x-->>2】";
	expect(showTextBrowser(input)).toBe("我是xtt");

	input = "【文本-取文本左-->>我是xxtt-->>x-->>2】";
	expect(showTextBrowser(input)).toBe("我是x");

	input = "【文本-取文本左-->>x我是xttxttxtt-->>x-->>2】";
	expect(showTextBrowser(input)).toBe("x我是");

	input = "【文本-取文本左-->>我是xtt1xtt2xtt-->>\\d-->>2】";
	expect(showTextBrowser(input)).toBe("我是xtt1xtt");

	input = "【文本-取文本左-->>我是xtt-->>】";
	expect(showTextBrowser(input)).toBe("我是xtt");

	input = "【文本-取文本左-->>-->>x】";
	expect(showTextBrowser(input)).toBe("");

	input = "【文本-取文本左】";
	expect(showTextBrowser(input)).toBe("");
});

test("文本-取文本右", () => {
	let input = "【文本-取文本右-->>我是xtt-->>x】";
	expect(showTextBrowser(input)).toBe("tt");

	input = "【文本-取文本右-->>我是xxtt-->>x-->>2】";
	expect(showTextBrowser(input)).toBe("tt");

	input = "【文本-取文本右-->>我是xxttx-->>x-->>2】";
	expect(showTextBrowser(input)).toBe("ttx");

	input = "【文本-取文本右-->>x我是xtt-->>x】";
	expect(showTextBrowser(input)).toBe("我是xtt");

	input = "【文本-取文本右-->>x我是xttx-->>x-->>2】";
	expect(showTextBrowser(input)).toBe("ttx");

	input = "【文本-取文本右-->>我是1xtt-->>\\d】";
	expect(showTextBrowser(input)).toBe("xtt");

	input = "【文本-取文本右-->>1我是2xt3t-->>\\d-->>2】";
	expect(showTextBrowser(input)).toBe("xt3t");

	input = "【文本-取文本右-->>我是xtt-->>】";
	expect(showTextBrowser(input)).toBe("我是xtt");

	input = "【文本-取文本右-->>-->>x】";
	expect(showTextBrowser(input)).toBe("");

	input = "【文本-取文本右】";
	expect(showTextBrowser(input)).toBe("");
});

test("文本-取中间", () => {
	let input = "【文本-取中间-->>我是xtt-->>是-->>t】";
	expect(showTextBrowser(input)).toBe("x");
});

test("文本-取数字", () => {
	let input = "【文本-取数字-->>21dfasd23】";
	expect(showTextBrowser(input)).toBe("2123");

	input = "【文本-取数字-->>21df.asd23】";
	expect(showTextBrowser(input)).toBe("21.23");

	input = "【文本-取数字-->>-21df.asd23】";
	expect(showTextBrowser(input)).toBe("-21.23");

	input = "【文本-取数字-->>-df.asd23】";
	expect(showTextBrowser(input)).toBe("-0.23");

	input = "【文本-取数字-->>df.asd23】";
	expect(showTextBrowser(input)).toBe("0.23");

	input = "【文本-取数字-->>21df.asd】";
	expect(showTextBrowser(input)).toBe("21");

	input = "【文本-取数字-->>df.afd】";
	expect(showTextBrowser(input)).toBe("");

	input = "【文本-取数字-->>】";
	expect(showTextBrowser(input)).toBe("");

	input = "【文本-取数字】";
	expect(showTextBrowser(input)).toBe("");
});

test("文本-替换", () => {
	let input = "【文本-替换-->>我是xtt-->>x-->>xx】";
	expect(showTextBrowser(input)).toBe("我是xxtt");

	input = "【文本-替换-->>1我是2xtt3-->>1,2,3-->>a,b,c】";
	expect(showTextBrowser(input)).toBe("a我是bxttc");

	input = "【文本-替换-->>1我是2xtt3-->>\\d-->>a】";
	expect(showTextBrowser(input)).toBe("a我是axtta");

	input = "【文本-替换-->>1我是2xtt3-->>\\d,x,t(?=t)-->>a,b,c】";
	expect(showTextBrowser(input)).toBe("a我是abcta");

	input = "【文本-替换-->>1我是2xtt3-->>\\d,x,t(?=t)-->>a,b】";
	expect(showTextBrowser(input)).toBe("a我是abta");

	input = "【文本-替换-->>1我是2xtt3-->>\\d,x,t(?=t)】";
	expect(showTextBrowser(input)).toBe("1我是2xtt3");

	input = "【文本-替换-->>】";
	expect(showTextBrowser(input)).toBe("");

	input = "【文本-替换】";
	expect(showTextBrowser(input)).toBe("");
});
