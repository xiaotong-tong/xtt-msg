import ReplaceText from "../.././../lib/BrowserReplaceText.js";
import { TextMatch } from "../../textToMatchList.js";

export const htmlLabel = {
	注音(text) {
		const type = TextMatch.doHTMLMatchList(text);
		return ReplaceText.getRubyHTML(type[0], type[1]);
	},
	文字颜色(text) {
		const type = TextMatch.doHTMLMatchList(text);
		return ReplaceText.setTextColor(type[0], type[1]);
	},
	黑幕(text) {
		const type = TextMatch.doHTMLMatchList(text);
		return ReplaceText.getHeimuHTML(type[0]);
	},
	换行() {
		return "<br />";
	},
	空格() {
		return "&nbsp;";
	},
};
