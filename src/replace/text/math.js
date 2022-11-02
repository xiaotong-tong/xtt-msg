import ReplaceText from "../.././../lib/BrowserReplaceText.js";
import { TextMatch } from "../../textToMatchList.js";

export const math = {
	选择(text) {
		const choiceList = TextMatch.doTextMatchList(text);
		let choiceNum = parseInt(ReplaceText.getTextNum(choiceList[0]));
		choiceNum =
			choiceNum > choiceList.length - 1
				? choiceList.length - 1
				: choiceNum;
		return choiceList[choiceNum];
	},
	判断(text) {
		const choiceList = TextMatch.doTextMatchList(text);
		// 此处使用了 Function() 来处理用户输入的数据
		return Function("return " + choiceList[0])()
			? choiceList[1]
			: choiceList[2];
	},
	计算(text) {
		const type = TextMatch.doTextMatchList(text);
		return Function("return " + type[0])();
	},
	随机数(text) {
		const minMax = TextMatch.doTextMatchList(text) || [];
		return ReplaceText.getRandom(minMax[0], minMax[1]);
	},
	权重随机数(text) {
		const type = TextMatch.doTextMatchList(text);
		return ReplaceText.getWeightedRandom(
			type[0].split(/[,，]/),
			type[1].split(/[,，]/)
		);
	},
	非重随机数(text) {
		const type = TextMatch.doTextMatchList(text);
		return ReplaceText.nonrandom(type[0], type[1], type[2]);
	},
	八进制(text) {
		const [char] = TextMatch.doTextMatchList(text) || [];
		if (!char) {
			return "";
		}
		return ReplaceText.charToCodePoint(char, 8);
	},
	十六进制(text) {
		const [char] = TextMatch.doTextMatchList(text) || [];
		if (!char) {
			return "";
		}
		return ReplaceText.charToCodePoint(char, 16);
	},
	十进制(text) {
		const [char] = TextMatch.doTextMatchList(text) || [];
		if (!char) {
			return "";
		}
		return ReplaceText.charToCodePoint(char, 10);
	},
	二进制(text) {
		const [char] = TextMatch.doTextMatchList(text) || [];
		if (!char) {
			return "";
		}
		return ReplaceText.charToCodePoint(char, 2);
	}
};
