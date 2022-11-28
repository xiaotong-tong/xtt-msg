import { TextMatch } from "../../textToMatchList.js";
import ReplaceText from "../.././../lib/BrowserReplaceText.js";

export const html = {
	"文本-注音"(text) {
		const textState = TextMatch.doTextMatchList(text);
		return ReplaceText.getRubyHTML(textState[0], textState[1]);
	},
	"文本-文字颜色"(text) {
		const textState = TextMatch.doTextMatchList(text);
		return ReplaceText.setTextColor(textState[0], textState[1]);
	},
	"文本-黑幕"(text) {
		const textState = TextMatch.doTextMatchList(text);
		return ReplaceText.getHeimuHTML(textState[0]);
	},
	换行() {
		return "<br />";
	},
	空格() {
		return "&nbsp;";
	}
};
