import { TextMatch } from "../../textToMatchList.js";
import ReplaceText from "../.././../lib/BrowserReplaceText.js";

export const html = {
	"文本-注音"(text) {
		const [htmlText, rp] = TextMatch.doTextMatchList(text);
		if (!htmlText && !rp) {
			return "";
		}
		return ReplaceText.getRubyHTML(htmlText, rp);
	},
	"文本-文字颜色"(text) {
		const [htmlText, color] = TextMatch.doTextMatchList(text);
		if (!htmlText) {
			return "";
		}
		return ReplaceText.setTextColor(htmlText, color);
	},
	"文本-黑幕"(text) {
		const [htmlText] = TextMatch.doTextMatchList(text);
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
