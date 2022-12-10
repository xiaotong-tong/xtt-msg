/**
 * 个人日常使用和学习用库
 * 功能: 传入一串字符串, 返回按一定规则处理后的字符串
 * */

import { Replace } from "./replace.js";
import { TextMatch } from "./textToMatchList";
import ReplaceText from "../lib/BrowserReplaceText.js";

class ShowText {
	static async showText(text) {
		/**
		 * 入口函数, 对数据进行预先处理, 清除 【 左侧的空格和换行 以及 】 右侧的空格和换行
		 * */
		if (/【[^】]+】/.test(text)) {
			try {
				text = text.replace(/\s+(?=【)|(?<=】)\s+/g, "");
				return await Replace.doReplace(text);
			} catch (e) {
				return e;
			}
		}
		return text;
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
			addMatchTextList = plugin({ TextMatch, ReplaceText });
		} else if (typeof plugin === "object") {
			addMatchTextList = plugin;
		}
		Object.assign(Replace.MatchTextList, addMatchTextList);
	}
};
