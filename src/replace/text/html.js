import { TextMatch } from "../../textToMatchList.js";

const htmlMap = new Map();

function isNodeText(text) {
	return /^<[\s\S]+>$/.test(text);
}

htmlMap.set(["文本-注音"], async (text) => {
	const [htmlText, rt] = await TextMatch.doTextMatchList(text);
	if (!htmlText && !rt) {
		return "";
	}
	return `<ruby>${htmlText}<rp>(</rp><rt>${rt}</rt><rp>)</rp></ruby>`;
});

function setTextColor(text, color) {
	// 如果文本就是一个标签文本的话 那直接追加 style属性，不是的话那就追加一个span标签
	if (isNodeText(text)) {
		if (!color) {
			return text;
		}
		text = text.replaceAll("'", '"');
		return text.includes("style=")
			? text.replace(
					/style="([\s\S]*?)"(?![;,])/,
					`style="$1 color: ${color};"`
			  )
			: text.replace(/^<([^>]+?)>/, `<$1 style="color: ${color};">`);
	} else {
		if (!color) {
			return `<span>${text}</span>`;
		}
		return `<span style="color: ${color};" >${text}</span>`;
	}
}

htmlMap.set(["文本-文字颜色"], async (text) => {
	const [htmlText, color] = await TextMatch.doTextMatchList(text);
	if (!htmlText) {
		return "";
	}
	return setTextColor(htmlText, color);
});

function getHeimuHTML(text) {
	if (isNodeText(text)) {
		text = text.replaceAll("'", '"');
		return text.includes("class=")
			? text.replace(/class="([^"]*?)"/, 'class="$1 heimu"')
			: text.replace(/^<([^>]+?)>/, '<$1 class="heimu">');
	} else {
		return `<span class="heimu">${text}</span>`;
	}
}

htmlMap.set(["文本-黑幕"], async (text) => {
	const [htmlText] = await TextMatch.doTextMatchList(text);
	if (!htmlText) {
		return "";
	}
	return getHeimuHTML(htmlText);
});

htmlMap.set(["换行"], () => {
	return "<br />";
});

htmlMap.set(["空格"], () => {
	return "&nbsp;";
});

export { htmlMap };
