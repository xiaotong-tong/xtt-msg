import { TextMatch } from "../../textToMatchList.js";
import ReplaceText from "../.././../lib/BrowserReplaceText.js";

export const html = {
	async "文本-注音"(text) {
		const [htmlText, rp] = await TextMatch.doTextMatchList(text);
		if (!htmlText && !rp) {
			return "";
		}
		return ReplaceText.getRubyHTML(htmlText, rp);
	},
	async "文本-文字颜色"(text) {
		const [htmlText, color] = await TextMatch.doTextMatchList(text);
		if (!htmlText) {
			return "";
		}
		return ReplaceText.setTextColor(htmlText, color);
	},
	async "文本-黑幕"(text) {
		const [htmlText] = await TextMatch.doTextMatchList(text);
		if (!htmlText) {
			return "";
		}
		return ReplaceText.getHeimuHTML(htmlText);
	},
	换行() {
		return "<br />";
	},
	空格() {
		return "&nbsp;";
	}
};
