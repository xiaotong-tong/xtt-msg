const { replace, plugins } = require("xtt-msg");
const { filePlugin } = require("xtt-msg/plugin/file");
const path = require("path");
const process = require("process");

plugins(filePlugin);

test("当前目录", async () => {
	let input = "![当前目录]()";
	const curPath = await replace(input);
	expect(curPath).toBe(process.cwd());
	expect(curPath).toBe(path.join(__dirname, "../../").replace(/[\/\\]$/, ""));
});

test("文件-新建", async () => {
	let input = `![文件-新建](${path.join(__dirname, "/test/a")})`;
	expect(await replace(input)).toBe("");

	input = `![文件-新建](${path.join(__dirname, "/test/b/test.txt")})`;
	expect(await replace(input)).toBe("");

	input = `![文件-新建](abcd)`;
	expect(await replace(input)).toBe("abcd不是一个路径");
});

test("文件-写", async () => {
	let input = `![文件-写](${path.join(__dirname, "/test/b/test.txt")}-->>Hello World!)`;
	expect(await replace(input)).toBe("");
});

test("文件-读", async () => {
	let input = `![文件-读](${path.join(__dirname, "/test/b/test.txt")})`;
	expect(await replace(input)).toBe("Hello World!");
});
