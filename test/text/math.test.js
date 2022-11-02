const { showTextBrowser } = require("../../dist/showText.cjs");

test("计算", () => {
	let input = "【计算-->>3+2】";
	expect(showTextBrowser(input)).toBe("5");

	input = "【计算-->>0】";
	expect(showTextBrowser(input)).toBe("0");

	input = "【计算-->>】";
	expect(showTextBrowser(input)).toBe("");

	input = "【计算】";
	expect(showTextBrowser(input)).toBe("");
});
