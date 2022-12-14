import { textList } from "./replace/text/index.js";

export class Replace {
	static backText;
	static backTextPrevLevel = {};

	static MatchTextList = textList;

	static async doReplace(text) {
		return await Replace.doReplaceToText(text);
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
		/**
		 * 【】 类型文本处理函数, 将当前文本中的第一层的【】内容取出并解析替换, 在解析过程中通过递归来处理第二层以及更多层的文本
		 * 如 【1【2】【3【4】】】【5】， 解析层级 1,5 -->> 2,3 -->> 4
		 * */
		if (/【[^】]+】/.test(text)) {
			let parts = text.match(/[【】]|[^【】]+/g),
				matches = [],
				balance = 0,
				index = 0;

			for (let i = 0; i < parts.length; i++) {
				if (parts[i] === "【") {
					if (balance === 0) {
						index = i;
					}
					balance++;
				} else if (parts[i] === "】") {
					if (balance === 1) {
						matches.push(parts.slice(index, i + 1).join(""));
					}
					balance--;
					if (balance < 0) {
						throw 'missing "【"';
					}
				}
			}
			if (balance > 0) {
				throw 'missing "】"';
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
		const type = match.match(/^【(.+?)(?=(?:-->>|】))/);
		if (Replace.MatchTextList[type[1]]) {
			return Replace.MatchTextList[type[1]](type.input);
		} else {
			return type.input;
		}
	}
}
