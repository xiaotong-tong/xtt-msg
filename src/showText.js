/**
 * 个人日常使用和学习用库
 * 功能: 传入一串字符串, 返回按一定规则处理后的字符串
 * */

import { Replace } from "./replace.js";
import { TextMatch } from "./textToMatchList.js";

const replace = async (text) => {
	// 入口函数
	try {
		return await Replace.doReplace(text);
	} catch (e) {
		return e;
	}
};
/**
 * 格式化文本字符串
 * @param {string} text
 * @returns {Array} 字符串格式化后的数组
 * @example
 *
 */
const formatToParts = (text) => {
	return Replace.formatToParts(text);
};
const plugins = (plugin) => {
	if (!plugin) {
		return;
	}
	let addMatchTextList;
	if (typeof plugin === "function") {
		addMatchTextList = plugin({
			TextMatch
		});
	} else if (typeof plugin === "object") {
		addMatchTextList = plugin;
	}
	Object.assign(Replace.MatchTextList, addMatchTextList);
};

export { replace, formatToParts, plugins };
