/**
 * 个人日常使用和学习用库
 * 功能: 传入一串字符串, 返回按一定规则处理后的字符串
 * */

import { Replace } from "./replace.js";
import { TextMatch } from "./textToMatchList.js";

const catchPromiseList = [
	{
		promise: Promise.resolve(),
		resolve: Promise.resolve()
	}
];
const replace = (text) => {
	const catchPromist = {};

	catchPromist.promise = new Promise(async (resolve) => {
		catchPromist.resolve = resolve;

		try {
			// 等待上一个promise完成, 防止并发, 保证顺序, 即使上一个promise失败, 也不会影响当前promise的执行
			await catchPromiseList[catchPromiseList.length - 1].promise;
		} finally {
			try {
				const res = await Replace.doReplace(text);
				resolve(res);
			} catch (e) {
				resolve(e);
			}
		}
	});

	catchPromiseList.push(catchPromist);

	return catchPromist.promise;
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
