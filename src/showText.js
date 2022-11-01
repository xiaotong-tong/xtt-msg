/**
 * 个人日常使用和学习用库
 * 功能: 传入一串字符串, 返回按一定规则处理后的字符串
 *  如：  【文本-反转文本-->>反转文本】, 将返回 本文转反 四个字符
 * */

import { Replace } from "./replace.js";

class ShowText {
	static showText(text) {
		/**
		 * 入口函数, 对数据进行预先处理, 如将 【 左侧的空格和换行 以及 】 右侧的空格和换行删除
		 * */
		let resText = text;

		if (/【[\s\S]*】/.test(text)) {
			try {
				text = text.replace(/\s+(?=【)|(?<=】)\s+/g, "");
				resText = Replace.doReplace(text);
			} catch (e) {
				resText = e;
			}
		}
		return resText;
	}
}

export const showTextBrowser = (text) => {
	return ShowText.showText(text);
};
