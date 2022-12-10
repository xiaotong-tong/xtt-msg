import ReplaceText from "../.././../lib/BrowserReplaceText.js";
import { TextMatch } from "../../textToMatchList.js";

ReplaceText.setVariable("nyaLang", "nya,喵,~,!,\u200d,ニャー,にゃ,\u200e");

export const fnText = {
	async 喵语(text) {
		const [willnyaText] = await TextMatch.doTextMatchList(text);
		if (!willnyaText) {
			return "";
		}
		const nyaLang = ReplaceText.getVariable("nyaLang").split(",");

		return (
			ReplaceText.charToCodePoint(willnyaText, 8, true)
				.match(/0o\d+(?!o)/g)
				.map((char) => char.slice(2).replace(/\d/g, (num) => nyaLang[num]))
				.join("\u200c") + "."
		);
	},
	async 解喵语(text) {
		let [willnyaText] = await TextMatch.doTextMatchList(text);
		if (!willnyaText) {
			return "";
		}
		const nyaLang = ReplaceText.getVariable("nyaLang").split(",");
		willnyaText = willnyaText.substring(0, willnyaText.length - 1);

		const isNyaTextGrep = new RegExp(`^(${nyaLang.join("|")}|\u200c)+$`);
		if (!isNyaTextGrep.test(willnyaText)) {
			throw "遇到了不认识的喵语呢。";
		}

		return willnyaText
			.split("\u200c")
			.map((char) =>
				ReplaceText.codePointToChar(
					"0o" +
						char.replace(new RegExp(nyaLang.join("|"), "g"), (str) =>
							nyaLang.indexOf(str)
						)
				)
			)
			.join("");
	}
};
