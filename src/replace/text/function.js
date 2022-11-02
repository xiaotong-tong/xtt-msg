import ReplaceText from "../.././../lib/BrowserReplaceText.js";
import { TextMatch } from "../../textToMatchList.js";

ReplaceText.setVariable("nyaLang", "nya,喵,~,!,\u200d,ニャー,にゃ,\u200e");

export const fnText = {
	喵语(text) {
		const [willnyaText] = TextMatch.doTextMatchList(text);
		if (!willnyaText) {
			return "";
		}
		const nyaLang = ReplaceText.getVariable("nyaLang").split(",");

		return (
			ReplaceText.charToCodePoint(willnyaText, 8, true)
				.match(/0o\d+(?!o)/g)
				.map((char) =>
					char.slice(2).replace(/\d/g, (num) => nyaLang[num])
				)
				.join("\u200c") + "."
		);
	},
	解喵语(text) {
		const [willnyaText] = TextMatch.doTextMatchList(text);
		if (!willnyaText) {
			return "";
		}
		const nyaLang = ReplaceText.getVariable("nyaLang").split(",");
		return willnyaText
			.splice(0, -1)
			.split("\u200c")
			.map((char) =>
				ReplaceText.codePointToChar(
					"0o" +
						char.replace(
							new RegExp(nyaLang.join("|"), "g"),
							(str) => nyaLang.indexOf(str)
						)
				)
			)
			.join("");
	}
};
