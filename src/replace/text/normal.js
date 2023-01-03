import ReplaceText from "../.././../lib/BrowserReplaceText.js";
import { escapeChar, unescapeChar } from "../.././../lib/char.js";
import { TextMatch } from "../../textToMatchList.js";
import { Replace } from "../../replace.js";

export const normal = {
	async 当前时间(text) {
		const [range] = await TextMatch.doTextMatchList(text);
		return ReplaceText.getDate(Date.now(), range);
	},
	async 返回(text) {
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
	},
	async 变量(text) {
		const [variableName, variableValue] = await TextMatch.doTextMatchList(
			text
		);
		if (!variableName) {
			return "";
		}
		return variableValue
			? ReplaceText.setVariable(variableName, variableValue)
			: ReplaceText.getVariable(variableName);
	},
	async 字符(text) {
		const [char] = await TextMatch.doTextMatchList(text);
		if (!char) {
			return "";
		}
		return `<&${char}>`;
	},
	async 转义(text) {
		let [char] = await TextMatch.doTextMatchList(text, true);
		if (!char) {
			return "";
		}
		return escapeChar(char);
	},
	async 反转义(text) {
		let [char] = await TextMatch.doTextMatchList(text, true);
		if (!char) {
			return "";
		}

		return await Replace.doReplaceToText(unescapeChar(char));
	},
	async JSON(text) {
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
	},
	async 循环(text) {
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
	},
	async 循环变量(text) {
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
	}
};
