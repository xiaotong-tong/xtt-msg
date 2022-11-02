const { showTextBrowser } = require("../../dist/showText.cjs");

test("计算", () => {
	expect(showTextBrowser("【计算-->>3+2】")).toBe("5");
});
