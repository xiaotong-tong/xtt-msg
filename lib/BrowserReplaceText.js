import ReplaceText from "./ReplaceText.js";

class BrowserReplaceText extends ReplaceText {
	static #isNodeText(text) {
		return /^<[\s\S]+>$/.test(text);
	}
	static reverseText(text) {
		let resText = "";
		// 因为命令文本反转后无法正常解析，此处将一些命令用 {{{}}}包围，然后反转文本时将 {{{}}}内的内容文本排除
		text.split(/({{{[\s\S]*?}}})/).forEach(
			(text) =>
				(resText += /{{{[\s\S]*}}}/.test(text)
					? text
					: super.reverseText(text))
		);
		return resText;
	}
	static getRubyHTML(text, rt) {
		return `<ruby>${text}<rp>(</rp><rt>${rt}</rt><rp>)</rp></ruby>`;
	}
	static setTextColor(text, color) {
		// 如果文本就是一个标签文本的话 那直接追加 style属性，不是的话那就追加一个span标签
		if (this.#isNodeText(text)) {
			return text.replace(
				/^<([\s\S]+?)>/,
				`<$1 style="color: ${color}">`
			);
		} else {
			return `<span style="color: ${color}" >${text}</span>`;
		}
	}
	static getHeimuHTML(text) {
		if (this.#isNodeText(text)) {
			return text.includes("class=")
				? text.replace(/class="([\s\S]+?)"/, "class='$1 heimu'")
				: text.replace(/^<([\s\S]+?)>/, "<$1 class='heimu'>");
		} else {
			return `<span class="heimu">${text}</span>`;
		}
	}
}

export default BrowserReplaceText;
