import ReplaceText from "./ReplaceText.js";

class BrowserReplaceText extends ReplaceText {
	static #isNodeText(text) {
		return /^<[\s\S]+>$/.test(text);
	}
	static getRubyHTML(text, rt) {
		return `<ruby>${text}<rp>(</rp><rt>${rt}</rt><rp>)</rp></ruby>`;
	}
	static setTextColor(text, color) {
		// 如果文本就是一个标签文本的话 那直接追加 style属性，不是的话那就追加一个span标签
		if (this.#isNodeText(text)) {
			if (!color) {
				return text;
			}
			text = text.replaceAll("'", "\"");
			return text.includes("style=")
				? text.replace(/style="([\s\S]*?)"(?![;,])/, `style="$1 color: ${color};"`)
				: text.replace(/^<([^>]+?)>/, `<$1 style="color: ${color};">`);
		} else {
			if (!color) {
				return `<span>${text}</span>`;
			}
			return `<span style="color: ${color};" >${text}</span>`;
		}
	}
	static getHeimuHTML(text) {
		if (this.#isNodeText(text)) {
			text = text.replaceAll("'", "\"");
			return text.includes("class=")
				? text.replace(/class="([^"]*?)"/, "class=\"$1 heimu\"")
				: text.replace(/^<([^>]+?)>/, "<$1 class=\"heimu\">");
		} else {
			return `<span class="heimu">${text}</span>`;
		}
	}
}

export default BrowserReplaceText;
