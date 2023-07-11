const { replace, plugins } = require("xtt-msg");
const { sqlitePlugin } = require("xtt-msg/plugin/sqlite");
const path = require("path");

plugins(sqlitePlugin);

test("sqlite-get", async () => {
	let input = `![sqlite-get](${path.join(__dirname, "./reply.sqlite")}-->>select keyword from Replies where id = 1;)`;
	expect(await replace(input)).toBe('{"keyword":"当前时间"}');
});

test("sqlite-run", async () => {
	let input = `![sqlite-run](${path.join(
		__dirname,
		"./reply.sqlite"
	)}-->>update Replies set keyword = "当前时间2"  where id = 1;)`;
	expect(await replace(input)).toBe("");

	input = `![sqlite-get](${path.join(__dirname, "./reply.sqlite")}-->>select keyword from Replies where id = 1;)`;
	expect(await replace(input)).toBe('{"keyword":"当前时间2"}');

	input = `![sqlite-run](${path.join(
		__dirname,
		"./reply.sqlite"
	)}-->>update Replies set keyword = "当前时间"  where id = 1;)`;
	replace(input);
});
