import { TextMatch } from "../../textToMatchList.js";
import { Replace } from "../../replace.js";
import { randomList, weightedRandom, conversionBase, charToCodePoint } from "xtt-utils";

import { variableMap } from "../variable.js";

const mathMap = new Map();

mathMap.set(["选择", "choice"], async (text) => {
	let [choicePoint, ...choiceList] = await TextMatch.doTextMatchList(text, true);
	if (!choicePoint) {
		return "";
	}
	choicePoint = await Replace.doReplaceToText(choicePoint);
	if (isNaN(+choicePoint)) {
		let startText = "?<" + choicePoint + ">";
		let resChoickText = "";
		for await (const choiceItem of choiceList) {
			const temp = await Replace.doReplaceToText(choiceItem);
			if (temp.startsWith(startText)) {
				resChoickText = temp;
			}
		}

		if (!resChoickText) {
			return "";
		}
		return resChoickText.substring(startText.length);
	} else {
		let choiceNum = parseInt(choicePoint);
		if (choiceNum > 0) {
			choiceNum = choiceNum - 1;
			if (choiceNum >= choiceList.length) {
				choiceNum = choiceList.length - 1;
			}
		} else if (choiceNum === 0) {
			return "";
		} else if (choiceNum < 0) {
			choiceNum = choiceNum + choiceList.length;
			if (choiceNum < 0) {
				choiceNum = 0;
			}
		}
		return Replace.doReplaceToText(choiceList[choiceNum]);
	}
});

mathMap.set(["判断", "judge", "if"], async (text) => {
	const [contentText, success = "", fail = ""] = await TextMatch.doTextMatchList(text, true);
	if (!contentText) {
		return "";
	}
	const content = await Replace.doReplaceToText(contentText);

	try {
		// 此处使用了 Function() 来处理用户输入的数据
		return Function("return " + content)() ? Replace.doReplaceToText(success) : Replace.doReplaceToText(fail);
	} catch (error) {
		throw `请将${text}改为正确的判断公式`;
	}
});

mathMap.set(["计算", "calc"], async (text) => {
	const [content] = await TextMatch.doTextMatchList(text);
	if (!content) {
		return "";
	}

	try {
		return Function("return " + content)();
	} catch (error) {
		throw `请将${text}改为正确的计算公式`;
	}
});

mathMap.set(["随机数", "random", "r"], async (text) => {
	let [min, max, times] = await TextMatch.doTextMatchList(text);
	times = parseInt(times);
	if (isNaN(times)) {
		times = 1;
	}

	return randomList(min || 1, max || 100, times).join(",");
});

mathMap.set(["权重随机数", "weidgeRandom", "WR"], async (text) => {
	const [randomText, weightedText] = await TextMatch.doTextMatchList(text);
	if (!randomText) {
		return "";
	}
	const randomList = randomText.split(/[,，]/);
	let weightedList = [];
	if (!weightedText) {
		for (let i = 0; i < randomList.length - 1; i++) {
			weightedList.push(1);
		}
	} else {
		weightedList = weightedText.split(/[,，]/).map((item) => parseInt(item));
	}
	return weightedRandom(randomList, weightedList);
});

mathMap.set(["非重随机数"], async (text) => {
	const [min, max, variable] = await TextMatch.doTextMatchList(text);

	const arr = randomList(min || 1, max || 10, { unique: true });

	if (variable) {
		variableMap.setVariable(variable, arr[Symbol.iterator]());
		return "";
	} else {
		return arr;
	}
});

mathMap.set(["八进制"], async (text) => {
	const [char] = (await TextMatch.doTextMatchList(text)) || [];
	if (!char) {
		return "";
	}
	const num = Number(char);
	if (Number.isNaN(num)) {
		return charToCodePoint(char, { base: 8 });
	} else {
		return conversionBase(num, 8);
	}
});

mathMap.set(["十六进制"], async (text) => {
	const [char] = (await TextMatch.doTextMatchList(text)) || [];
	if (!char) {
		return "";
	}
	const num = Number(char);
	if (Number.isNaN(num)) {
		return charToCodePoint(char, { base: 16 });
	} else {
		return conversionBase(num, 16);
	}
});

mathMap.set(["二进制"], async (text) => {
	const [char] = (await TextMatch.doTextMatchList(text)) || [];
	if (!char) {
		return "";
	}
	const num = Number(char);
	if (Number.isNaN(num)) {
		return charToCodePoint(char, { base: 2 });
	} else {
		return conversionBase(num, 2);
	}
});

mathMap.set(["十进制"], async (text) => {
	const [char] = (await TextMatch.doTextMatchList(text)) || [];
	if (!char) {
		return "";
	}
	const num = Number(char);
	if (Number.isNaN(num)) {
		return charToCodePoint(char, { base: 10 });
	} else {
		return conversionBase(num, 10);
	}
});

export { mathMap };
