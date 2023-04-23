/**
 * 个人日常使用和学习用库
 * 功能: 传入一串字符串, 返回按一定规则处理后的字符串
 * */

import { Replace } from "./replace.js";
import { TextMatch } from "./textToMatchList.js";

class ShowText {
	static async showText(text) {
		// 入口函数
		try {
			return await Replace.doReplace(text);
		} catch (e) {
			return e;
		}
	}
}

export default {
	showTextBrowser: (text) => {
		return ShowText.showText(text);
	},
	plugins: (plugin) => {
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
	}
};
