import ReplaceText from "../.././../lib/BrowserReplaceText.js";
import { TextMatch } from "../../textToMatchList.js";
import { Replace } from "../../replace.js";

export const math = {
	选择(text) {
		let [choicePoint, ...choiceList] = TextMatch.doTextMatchList(text, true);
		if (!choicePoint) {
			return "";
		}
		choicePoint = Replace.doReplaceToText(choicePoint);
		if (isNaN(+choicePoint)) {
			let startText = "?<" + choicePoint + ">";
			let resChoickText = choiceList
				.map((v) => Replace.doReplaceToText(v))
				.find((choiceText) => choiceText.startsWith(startText));

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
	},
	判断(text) {
		const [contentText, success = "", fail = ""] = TextMatch.doTextMatchList(
			text,
			true
		);
		if (!contentText) {
			return "";
		}
		const content = Replace.doReplaceToText(contentText);

		try {
			// 此处使用了 Function() 来处理用户输入的数据
			return Function("return " + content)()
				? Replace.doReplaceToText(success)
				: Replace.doReplaceToText(fail);
		} catch (error) {
			throw `请将${text}改为正确的判断公式`;
		}
	},
	计算(text) {
		const [content] = TextMatch.doTextMatchList(text);
		if (!content) {
			return "";
		}

		try {
			return Function("return " + content)();
		} catch (error) {
			throw `请将${text}改为正确的计算公式`;
		}
	},
	随机数(text) {
		const [min, max] = TextMatch.doTextMatchList(text);
		return ReplaceText.getRandom(min || 1, max || 100);
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
