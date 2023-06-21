import { textList } from "./replace/text/index.js";

import { endsWith } from "xtt-utils";

export class Replace {
	static backText;
	static backTextPrevLevel = {};

	static MatchTextList = textList;

	static doReplace(text) {
		return Replace.doReplaceToText(text);
	}

	static async replaceAsync(str, regex, asyncFn) {
		const promises = [];
		str.replace(regex, (match, ...args) => {
			const promise = asyncFn(match, ...args);
			promises.push(promise);
		});
		const data = await Promise.all(promises);
		return str.replace(regex, () => data.shift());
	}

	static async doReplaceToText(text) {
		if (/!\[[^\]]+\]\([\s\S]*\)/.test(text)) {
			let parts = text.match(/[()]|[^()]+/g);
			let matches = [];
			let balance = 0;
			let index = 0;

			for (let i = 1; i < parts.length; i++) {
				if (parts[i] === "(") {
					const isCommand = endsWith(parts[i - 1], /!\[[^\]]+\]$/);
					if (balance === 0 && !isCommand) {
						continue;
					}
					if (balance === 0) {
						index = i;
					}
					balance++;
				} else if (parts[i] === ")") {
					if (balance <= 0) {
						continue;
					}
					if (balance === 1) {
						matches.push(
							(parts[index - 1].match(/!\[[^\]]+\]$/)[0] ?? "") + parts.slice(index, i + 1).join("")
						);
					}
					balance--;
				}
			}
			for (const matchText of matches) {
				const replaceFn = async (match) => {
					const resText = await Replace.#doTextMatch(match);
					if (Replace.backTextPrevLevel.isCurrentLevel === true) {
						const value = Replace.backTextPrevLevel.value;
						Replace.backTextPrevLevel = {};
						return value;
					} else if (Replace.backTextPrevLevel.isCurrentLevel === false) {
						Replace.backTextPrevLevel.isCurrentLevel = true;
					}
					return resText;
				};
				text = await Replace.replaceAsync(text, matchText, replaceFn);
				if (Replace.backText) {
					text = Replace.backText;
					Replace.backText = "";
				}
			}
		}

		return text;
	}
	static #doTextMatch(match) {
		/**
		 * 根据文本的内容 查找是否有对应的解析，如果有就调用，没有就返回文本
		 * */
		const type = match.match(/^!\[([^\]]+)\]/);
		if (Replace.MatchTextList[type[1]]) {
			return Replace.MatchTextList[type[1]](type.input);
		} else {
			return type.input;
		}
	}
}
