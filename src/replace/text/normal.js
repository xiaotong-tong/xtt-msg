import ReplaceText from "../.././../lib/BrowserReplaceText.js";
import { TextMatch } from "../../textToMatchList.js";
import { Replace } from "../../replace.js";

export const normal = {
	async 当前时间(text) {
		const type = await TextMatch.doTextMatchList(text);
		return ReplaceText.getDate(Date.now(), type && type[0]);
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
		const [variableName, variableValue] = await TextMatch.doTextMatchList(text);
		if (!variableName) {
			return "";
		}
		return variableValue
			? ReplaceText.setVariable(variableName, variableValue)
			: ReplaceText.getVariable(variableName);
	}
};
