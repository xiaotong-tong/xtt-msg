import ReplaceText from "../.././../lib/BrowserReplaceText.js";
import { TextMatch } from "../../textToMatchList.js";

export const text = {
	async "文本-反转文本"(text) {
		const [replaceText] = await TextMatch.doTextMatchList(text);
		if (!replaceText) {
			return "";
		}
		return ReplaceText.reverseText(replaceText);
	},
	async "文本-取文本左"(text) {
		const [replaceText, stamp, limit] = await TextMatch.doTextMatchList(text);
		if (!replaceText) {
			return "";
		}
		if (!stamp) {
			return replaceText;
		}

		return ReplaceText.getTextLeft(replaceText, stamp, limit);
	},
	async "文本-取文本右"(text) {
		const [replaceText, stamp, limit] = await TextMatch.doTextMatchList(text);
		if (!replaceText) {
			return "";
		}
		if (!stamp) {
			return replaceText;
		}

		return ReplaceText.getTextRight(replaceText, stamp, limit);
	},
	async "文本-取中间"(text) {
		const [replaceText, leftStamp, rightStamp] =
			await TextMatch.doTextMatchList(text);
		if (!replaceText) {
			return "";
		}
		return ReplaceText.getTextCenter(replaceText, leftStamp, rightStamp);
	},
	async "文本-替换"(text) {
		let [replaceText, willReplaceCharList, replaceCharList] =
			await TextMatch.doTextMatchList(text);
		if (!replaceText) {
			return "";
		}
		if (!willReplaceCharList || !replaceCharList) {
			return replaceText;
		}

		willReplaceCharList = willReplaceCharList.split(/[,，]/);
		replaceCharList = replaceCharList.split(/[,，]/);
		return replaceText.replaceAll(
			new RegExp(willReplaceCharList.map((v) => "(" + v + ")").join("|"), "g"),
			(char, ...catchList) =>
				replaceCharList[catchList.findIndex((temp) => temp !== undefined)] || ""
		);
	},
	async "文本-取数字"(text) {
		const [replaceText] = await TextMatch.doTextMatchList(text);
		if (!replaceText) {
			return "";
		}
		return ReplaceText.getTextNum(replaceText);
	}
};
