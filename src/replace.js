import { textList } from "./replace/fn/index.js";

import { endsWith } from "xtt-utils";

export class Replace {
	static backText;
	static backTextPrevLevel = {};

	static MatchTextList = textList;

	static doReplace(text) {
		return Replace.doReplaceToText(text);
	}

	static formatToParts(text) {
		return Replace.getParts(text).formatParts;
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

	static getParts(text, onlyParts = false) {
		let parts = text.match(/[()]|[^()]+/g);
		let formatParts = [];
		let matches = [];
		let balance = 0;
		let index = 0;
		let lastIndex = 0;

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
					const script =
						(parts[index - 1].match(/!\[[^\]]+\]$/)[0] ?? "") + parts.slice(index, i + 1).join("");

					matches.push(script);

					parts[index - 1] = parts[index - 1].replace(/!\[[^\]]+\]$/, "");

					formatParts.push(parts.slice(lastIndex, index).join(""));
					formatParts.push(script);
					lastIndex = i + 1;
				}
				balance--;
			}
		}

		formatParts = formatParts
			.filter((item) => item !== "")
			.map((item) => {
				if (item.startsWith("![") && item.endsWith(")") && /.+!\[[^\]]+\]\([\s\S]*\)/.test(item)) {
					return {
						value: item,
						children: Replace.getParts(item.replace(/.+?\(|\)$/, ""), true)
					};
				}
				return item;
			});

		if (onlyParts) {
			return formatParts;
		}

		return { matches, formatParts };
	}

	static async doReplaceToText(text) {
		if (/!\[[^\]]+\]\([\s\S]*\)/.test(text)) {
			const { matches } = Replace.getParts(text);

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
