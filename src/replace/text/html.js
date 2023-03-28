import { TextMatch } from "../../textToMatchList.js";
import ReplaceText from "../.././../lib/BrowserReplaceText.js";

const htmlMap = new Map();

htmlMap.set(["文本-注音"], async (text) => {
	const [htmlText, rp] = await TextMatch.doTextMatchList(text);
	if (!htmlText && !rp) {
		return "";
	}
	return ReplaceText.getRubyHTML(htmlText, rp);
});

htmlMap.set(["文本-文字颜色"], async (text) => {
	const [htmlText, color] = await TextMatch.doTextMatchList(text);
	if (!htmlText) {
		return "";
	}
	return ReplaceText.setTextColor(htmlText, color);
});

htmlMap.set(["文本-黑幕"], async (text) => {
	const [htmlText] = await TextMatch.doTextMatchList(text);
	if (!htmlText) {
		return "";
	}
	return ReplaceText.getHeimuHTML(htmlText);
});

htmlMap.set(["换行"], () => {
	return "<br />";
});

htmlMap.set(["空格"], () => {
	return "&nbsp;";
});

export { htmlMap };
