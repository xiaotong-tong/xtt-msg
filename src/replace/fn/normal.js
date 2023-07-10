import { TextMatch } from "../../textToMatchList.js";
import { Replace } from "../../replace.js";
import { variableMap } from "../variable.js";

const normalMap = new Map();

function getDate(newDate = Date.now(), type) {
	const date = new Date(newDate),
		year = date.getFullYear(),
		month = (date.getMonth() + 1).toString().padStart(2, "0"),
		day = date.getDate().toString().padStart(2, "0"),
		hour = date.getHours().toString().padStart(2, "0"),
		minutes = date.getMinutes().toString().padStart(2, "0"),
		seconds = date.getSeconds().toString().padStart(2, "0"),
		week = date.getDay(),
		weekList = [
			"星期日",
			"星期一",
			"星期二",
			"星期三",
			"星期四",
			"星期五",
			"星期六"
		];

	if (!type) {
		return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
	}

	if (type === "all") {
		return `${year}-${month}-${day} ${hour}:${minutes}:${seconds} ${weekList[week]}`;
	}

	return type.replace(/=(?:[年月日时分秒]|星期)=/g, (value) => {
		switch (value) {
			case "=年=":
				return year;
			case "=月=":
				return month;
			case "=日=":
				return day;
			case "=时=":
				return hour;
			case "=分=":
				return minutes;
			case "=秒=":
				return seconds;
			case "=星期=":
				return weekList[week];
		}
	});
}
normalMap.set(["当前时间", "now"], async (text) => {
	const [range] = await TextMatch.doTextMatchList(text);
	return getDate(Date.now(), range);
});

normalMap.set(["返回", "return"], async (text) => {
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

normalMap.set(["变量", "variable"], async (text) => {
	const [variableName, variableValue] = await TextMatch.doTextMatchList(text);
	if (!variableName) {
		return "";
	}
	return variableValue
		? variableMap.setVariable(variableName, variableValue)
		: variableMap.getVariable(variableName);
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

normalMap.set(["循环", "forin"], async (text) => {
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
		variableMap.setVariable("循环变量值", v);
		variableMap.setVariable("循环变量次数", i);
		await Replace.doReplaceToText(foriBody);
		i++;
	}
	return "";
});

normalMap.set(["循环变量", "forVariable"], async (text) => {
	const [variableName] = await TextMatch.doTextMatchList(text);
	if (!variableName) {
		return "";
	}
	if (variableName === "值") {
		return variableMap.getVariable("循环变量值");
	} else if (variableName === "次数") {
		return variableMap.getVariable("循环变量次数");
	} else {
		return "";
	}
});

export { normalMap };
