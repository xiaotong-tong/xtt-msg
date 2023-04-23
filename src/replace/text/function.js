import { TextMatch } from "../../textToMatchList.js";
import { variableMap } from "../variable.js";
import xttUtils from "xtt-utils";
const { charToCodePoint } = xttUtils;

const fnTextMap = new Map();

fnTextMap.set(["喵语"], async (text) => {
	const [willnyaText] = await TextMatch.doTextMatchList(text);
	if (!willnyaText) {
		return "";
	}
	const nyaLang = variableMap.getVariable("nyaLang").split(",");
	return (
		charToCodePoint(willnyaText, { separator: ",", base: 8 })
			.split(",")
			.map((char) => char.slice(2).replace(/\d/g, (num) => nyaLang[num]))
			.join("\u200c") + "."
	);
});

fnTextMap.set(["解喵语"], async (text) => {
	let [willnyaText] = await TextMatch.doTextMatchList(text);
	if (!willnyaText) {
		return "";
	}
	const nyaLang = variableMap.getVariable("nyaLang").split(",");
	willnyaText = willnyaText.substring(0, willnyaText.length - 1);

	const isNyaTextGrep = new RegExp(`^(${nyaLang.join("|")}|\u200c)+$`);
	if (!isNyaTextGrep.test(willnyaText)) {
		throw "遇到了不认识的喵语呢。";
	}

	return willnyaText
		.split("\u200c")
		.map((char) =>
			String.fromCodePoint(
				"0o" +
					char.replace(new RegExp(nyaLang.join("|"), "g"), (str) =>
						nyaLang.indexOf(str)
					)
			)
		)
		.join("");
});

export { fnTextMap };
