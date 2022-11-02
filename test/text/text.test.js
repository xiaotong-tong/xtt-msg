const { showTextBrowser } = require("../../dist/showText.cjs");

test("文本", () => {
	expect(showTextBrowser("【文本-反转文本-->>我是xtt】")).toBe("ttx是我");

	expect(showTextBrowser("【文本-取文本左-->>我是xtt-->>x】")).toBe("我是");

	expect(
		showTextBrowser("【文本-取文本左-->>我是xttxttxtt-->>x-->>2】")
	).toBe("我是xtt");

	expect(
		showTextBrowser("【文本-取文本左-->>x我是xttxttxtt-->>x-->>2】")
	).toBe("x我是");

	expect(
		showTextBrowser("【文本-取文本左-->>我是xtt1xtt2xtt-->>\\d-->>2】")
	).toBe("我是xtt1xtt");
});
