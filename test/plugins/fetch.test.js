const { showTextBrowser, plugins } = require("../../dist/showText.cjs");
const { fetchPlugin } = require("../../dist/plugins/fetch.cjs");

test("访问", async () => {
	let input = '![访问](data:text/json,{"a":"b"})';
	expect(await showTextBrowser(input)).toBe(
		'![访问](data:text/json,{"a":"b"})'
	);
	plugins(fetchPlugin);
	input = '![访问](data:text/json,{"a":"b"})';
	expect(await showTextBrowser(input)).toMatch(/b/);
});
