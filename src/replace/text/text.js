import ReplaceText from "../.././../lib/BrowserReplaceText.js";
import { TextMatch } from "../../textToMatchList.js";

export const text = {
	"文本-反转文本"(text) {
		const [replaceText] = TextMatch.doTextMatchList(text);
		return ReplaceText.reverseText(replaceText);
	},
	"文本-取文本左"(text) {
		const [replaceText, stamp, limit] = TextMatch.doTextMatchList(text);
		return ReplaceText.getTextLeft(replaceText, stamp, limit);
	},
	"文本-取文本右"(text) {
		const [replaceText, stamp, limit] = TextMatch.doTextMatchList(text);
		return ReplaceText.getTextRight(replaceText, stamp, limit);
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
		let [replaceText, willReplaceCharList, replaceCharList] =
			TextMatch.doTextMatchList(text);
		if (!replaceText) {
			return "";
		}
		if (!willReplaceCharList || !replaceCharList) {
			return replaceText;
		}

		willReplaceCharList = willReplaceCharList.split(/[,，]/);
		replaceCharList = replaceCharList.split(/[,，]/);
		return replaceText.replaceAll(
			new RegExp(willReplaceCharList.join("|"), "g"),
			(char) =>
				replaceCharList[
					willReplaceCharList.findIndex((willReplace) =>
						new RegExp(willReplace).test(char)
					)
				] || ""
		);
	},
	"文本-取数字"(text) {
		const textState = TextMatch.doTextMatchList(text);
		return ReplaceText.getTextNum(textState[0]);
	}
};
