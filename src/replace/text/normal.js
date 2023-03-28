import ReplaceText from "../.././../lib/BrowserReplaceText.js";
import { TextMatch } from "../../textToMatchList.js";
import { Replace } from "../../replace.js";

const normalMap = new Map();

normalMap.set(["当前时间"], async (text) => {
	const [range] = await TextMatch.doTextMatchList(text);
	return ReplaceText.getDate(Date.now(), range);
});

normalMap.set(["返回"], async (text) => {
	let [backText, level] = await TextMatch.doTextMatchList(text);
	if (!backText) {
		return "";
	}

	if (level === "0") {
		Replace.backText = backText;
	} else {
		Replace.backTextPrevLevel.value = backText;
		Replace.backTextPrevLevel.isCurrentLevel = false;
	}

	return "";
});

normalMap.set(["变量"], async (text) => {
	const [variableName, variableValue] = await TextMatch.doTextMatchList(text);
	if (!variableName) {
		return "";
	}
	return variableValue
		? ReplaceText.setVariable(variableName, variableValue)
		: ReplaceText.getVariable(variableName);
});

normalMap.set(["JSON"], async (text) => {
	const [jsonText, access] = await TextMatch.doTextMatchList(text);
	if (!jsonText) {
		return "";
	}
	const objTemp = JSON.parse(jsonText);
	let resValue = objTemp;
	for (const key of access.matchAll(/(?<=\[)[\s\S]+?(?=\])/g)) {
		if (resValue === undefined) {
			return "";
		}
		resValue = resValue?.[Array.isArray(key) ? key[0] : key];
	}
	if (Array.isArray(resValue) || resValue instanceof Object) {
		return JSON.stringify(resValue);
	} else {
		return resValue;
	}
});

normalMap.set(["循环"], async (text) => {
	const [foriText, foriStep, foriBody] = await TextMatch.doTextMatchList(
		text,
		true
	);
	if (!foriText) {
		return "";
	}
	const [allText, step] = await Promise.all([
		Replace.doReplaceToText(foriText),
		Replace.doReplaceToText(foriStep)
	]);
	const foriMap = allText.split(new RegExp(step));
	let i = 1;
	for (const v of foriMap) {
		ReplaceText.setVariable("循环变量值", v);
		ReplaceText.setVariable("循环变量次数", i);
		await Replace.doReplaceToText(foriBody);
		i++;
	}
	return "";
});

normalMap.set(["循环变量"], async (text) => {
	const [variableName] = await TextMatch.doTextMatchList(text);
	if (!variableName) {
		return "";
	}
	if (variableName === "值") {
		return ReplaceText.getVariable("循环变量值");
	} else if (variableName === "次数") {
		return ReplaceText.getVariable("循环变量次数");
	} else {
		return "";
	}
});

export { normalMap };
