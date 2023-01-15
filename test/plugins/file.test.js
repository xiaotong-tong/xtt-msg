const { showTextBrowser, plugins } = require("../../dist/showText.cjs");
const { filePlugin } = require("../../dist/plugins/file.cjs");
const path = require("path");
const process = require("process");

plugins(filePlugin);

test("当前目录", async () => {
	let input = "【当前目录】";
	const curPath = await showTextBrowser(input);
	expect(curPath).toBe(process.cwd());
	expect(curPath).toBe(path.join(__dirname, "../../").replace(/[\/\\]$/, ""));
});

test("文件-新建", async () => {
	let input = `【文件-新建-->>${path.join(__dirname, "/test/a")}】`;
	expect(await showTextBrowser(input)).toBe("");

	input = `【文件-新建-->>${path.join(__dirname, "/test/b/test.txt")}】`;
	expect(await showTextBrowser(input)).toBe("");

	input = `【文件-新建-->>abcd】`;
	expect(await showTextBrowser(input)).toBe("abcd不是一个路径");
});

test("文件-写", async () => {
	let input = `【文件-写-->>${path.join(
		__dirname,
		"/test/b/test.txt"
	)}-->>Hello World!】`;
	expect(await showTextBrowser(input)).toBe("");
});

test("文件-读", async () => {
	let input = `【文件-读-->>${path.join(__dirname, "/test/b/test.txt")}】`;
	expect(await showTextBrowser(input)).toBe("Hello World!");
});
