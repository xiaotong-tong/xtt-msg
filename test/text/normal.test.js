const { replace } = require("xtt-msg");

test("当前时间", async () => {
	const now = Date.now;
	const timestamp = new Date("2023-01-01 00:00:00").getTime();
	global.Date.now = () => timestamp;

	let input = "![当前时间]()";
	expect(await replace(input)).toBe("2023-01-01 00:00:00");

	input = "![当前时间](all)";
	expect(await replace(input)).toBe("2023-01-01 00:00:00 星期日");

	input = "![当前时间](现在是=年=年，=月=月份)";
	expect(await replace(input)).toBe("现在是2023年，01月份");

	input = "![当前时间](现在是=时=点=分=分)";
	expect(await replace(input)).toBe("现在是00点00分");

	global.Date.now = now;
});

test("返回", async () => {
	let input = "![文本-反转文本](我是xtt![返回](xtt))";
	expect(await replace(input)).toBe("xtt");

	input = "![文本-反转文本](我是xtt![返回](xtt))abc";
	expect(await replace(input)).toBe("xttabc");

	input = "![文本-反转文本](我是xtt![返回](xtt-->>0))";
	expect(await replace(input)).toBe("ttx");

	input = `![文本-反转文本](
				![文本-反转文本](
					我是xtt![返回](xtt)
				)abc
			)`;
	expect(await replace(input)).toBe("cbattx");

	input = "![文本-反转文本](我是xtt![返回]())";
	expect(await replace(input)).toBe("ttx是我");
});

test("变量", async () => {
	let input = "![变量](a-->>1)![变量](a)";
	expect(await replace(input)).toBe("1");

	input = "![变量](b)";
	expect(await replace(input)).toBe("没有变量b哦");

	input = "![变量](c-->>![变量](a))![变量](c)";
	expect(await replace(input)).toBe("1");

	input = "![变量]()";
	expect(await replace(input)).toBe("");

	input = "![变量]";
	expect(await replace(input)).toBe("![变量]");
});

test("JSON", async () => {
	const jsonStr = '{"message":"a", "value": { "message": "b", "value": "2" }}';
	let input = `![JSON](${jsonStr}-->>[message])`;
	expect(await replace(input)).toBe("a");

	input = `![JSON](${jsonStr}-->>[value][message])`;
	expect(await replace(input)).toBe("b");

	input = `![JSON](${jsonStr}-->>[value])`;
	expect(await replace(input)).toBe('{"message":"b","value":"2"}');

	input = `![JSON](${jsonStr}-->>)`;
	expect(await replace(input)).toBe('{"message":"a","value":{"message":"b","value":"2"}}');

	input = `![JSON]()`;
	expect(await replace(input)).toBe("");

	input = `![JSON]`;
	expect(await replace(input)).toBe("![JSON]");
});
