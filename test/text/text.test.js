const { showTextBrowser } = require("../../dist/showText.cjs");

test("文本", () => {
	let input = "【文本-反转文本-->>我是xtt】";
	expect(showTextBrowser(input)).toBe("ttx是我");

	input = "【文本-取文本左-->>我是xtt-->>x】";
	expect(showTextBrowser(input)).toBe("我是");

	input = "【文本-取文本左-->>我是xttxttxtt-->>x-->>2】";
	expect(showTextBrowser(input)).toBe("我是xtt");

	input = "【文本-取文本左-->>x我是xttxttxtt-->>x-->>2】";
	expect(showTextBrowser(input)).toBe("x我是");

	input = "【文本-取文本左-->>我是xtt1xtt2xtt-->>\\d-->>2】";
	expect(showTextBrowser(input)).toBe("我是xtt1xtt");
});
