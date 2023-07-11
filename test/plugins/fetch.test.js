const { replace, plugins } = require("xtt-msg");
const { fetchPlugin } = require("xtt-msg/plugin/fetch");

test("访问", async () => {
	let input = '![访问](data:text/json,{"a":"b"})';
	expect(await replace(input)).toBe('![访问](data:text/json,{"a":"b"})');
	plugins(fetchPlugin);
	input = '![访问](data:text/json,{"a":"b"})';
	expect(await replace(input)).toMatch(/b/);
});
