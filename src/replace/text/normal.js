import ReplaceText from "../.././../lib/BrowserReplaceText.js";
import { TextMatch } from "../../textToMatchList.js";
import { Replace } from "../../replace.js";

export const normal = {
	当前时间(text) {
		const type = TextMatch.doTextMatchList(text);
		return ReplaceText.getDate(+new Date(), type && type[0]);
	},
	返回(text) {
		const type = TextMatch.doTextMatchList(text);
		Replace.backText = type[0];
		return "";
	},
	变量(text) {
		const type = TextMatch.doTextMatchList(text);
		return type.length === 1
			? ReplaceText.getVariable(type[0])
			: ReplaceText.setVariable(type[0], type[1]);
	},
};
