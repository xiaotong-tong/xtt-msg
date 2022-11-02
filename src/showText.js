/**
 * 个人日常使用和学习用库
 * 功能: 传入一串字符串, 返回按一定规则处理后的字符串
 * */

import { Replace } from "./replace.js";

class ShowText {
	static showText(text) {
		/**
		 * 入口函数, 对数据进行预先处理, 清除 【 左侧的空格和换行 以及 】 右侧的空格和换行
		 * */
		if (/【[^】]+】/.test(text)) {
			try {
				text = text.replace(/\s+(?=【)|(?<=】)\s+/g, "");
				return Replace.doReplace(text);
			} catch (e) {
				return e;
			}
		}
		return text;
	}
}

export const showTextBrowser = (text) => {
	return ShowText.showText(text);
};
