import ReplaceText from "../.././../lib/BrowserReplaceText.js";
import { TextMatch } from "../../textToMatchList.js";

export const text = {
	"文本-反转文本"(text) {
		const type = TextMatch.doTextMatchList(text);
		return ReplaceText.reverseText(type[0]);
	},
	"文本-取文本左"(text) {
		const textState = TextMatch.doTextMatchList(text);
		return ReplaceText.getTextLeft(textState[0], textState[1]);
	},
	"文本-取文本右"(text) {
		const textState = TextMatch.doTextMatchList(text);
		return ReplaceText.getTextRight(textState[0], textState[1]);
	},
	"文本-取中间"(text) {
		const textState = TextMatch.doTextMatchList(text);
		return ReplaceText.getTextCenter(
			textState[0],
			textState[1],
			textState[2]
		);
	},
	"文本-替换"(text) {
		const textState = TextMatch.doTextMatchList(text);
		return textState[0].replaceAll(textState[1], textState[2]);
	},
	"文本-取出数字"(text) {
		const textState = TextMatch.doTextMatchList(text);
		return ReplaceText.getTextNum(textState[0]);
	},
};
