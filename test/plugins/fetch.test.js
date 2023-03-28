const { showTextBrowser, plugins } = require("../../dist/showText.cjs");
const { fetchPlugin } = require("../../dist/plugins/fetch.cjs");

test("访问", async () => {
	let input = "![访问](https://dog.ceo/api/breeds/image/random)";
	expect(await showTextBrowser(input)).toBe(
		"![访问](https://dog.ceo/api/breeds/image/random)"
	);
	plugins(fetchPlugin);
	input = "![访问](https://dog.ceo/api/breeds/image/random)";
	expect(await showTextBrowser(input)).toMatch(/https:\/\/images\.dog\.ceo/);
});
