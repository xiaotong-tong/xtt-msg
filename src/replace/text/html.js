import { TextMatch } from "../../textToMatchList.js";

export const html = {
	"文本-注音"(text) {
		const textState = TextMatch.doTextMatchList(text);
		return `{{{注音-${textState[0]}-${textState[1]}}}}`;
	},
	"文本-文字颜色"(text) {
		const textState = TextMatch.doTextMatchList(text);
		return `{{{文字颜色-${textState[0]}-${textState[1]}}}}`;
	},
	"文本-黑幕"(text) {
		const textState = TextMatch.doTextMatchList(text);
		return `{{{黑幕-${textState[0]}}}}`;
	},
	换行() {
		return "{{{换行}}}";
	},
	空格() {
		return "{{{空格}}}";
	},
};
