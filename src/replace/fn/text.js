import { TextMatch } from "../../textToMatchList.js";
import { reverse, getTermLeft, getTermRight, getRangeByTerm, strToNum } from "xtt-utils";

const textMap = new Map();

textMap.set(["文本-反转文本", "text-reverse"], async (text) => {
	const [replaceText] = await TextMatch.doTextMatchList(text);
	if (!replaceText) {
		return "";
	}
	return reverse(replaceText);
});

textMap.set(["文本-取文本左", "text-getLeft"], async (text) => {
	const [replaceText, stamp, limit] = await TextMatch.doTextMatchList(text);
	if (!replaceText) {
		return "";
	}
	if (!stamp) {
		return replaceText;
	}

	return getTermLeft(replaceText, stamp, limit);
});

textMap.set(["文本-取文本右", "text-getRight"], async (text) => {
	const [replaceText, stamp, limit] = await TextMatch.doTextMatchList(text);
	if (!replaceText) {
		return "";
	}
	if (!stamp) {
		return replaceText;
	}

	return getTermRight(replaceText, stamp, limit);
});

textMap.set(["文本-取中间", "text-getContent"], async (text) => {
	const [replaceText, leftStamp, rightStamp] = await TextMatch.doTextMatchList(text);
	if (!replaceText) {
		return "";
	}
	return getRangeByTerm(replaceText, [leftStamp, rightStamp]);
});

textMap.set(["文本-替换", "text-replace"], async (text) => {
	let [replaceText, willReplaceCharList, replaceCharList] = await TextMatch.doTextMatchList(text);
	if (!replaceText) {
		return "";
	}
	if (!willReplaceCharList || !replaceCharList) {
		return replaceText;
	}

	willReplaceCharList = willReplaceCharList.split(/[,，]/);
	replaceCharList = replaceCharList.split(/[,，]/);
	return replaceText.replaceAll(
		new RegExp(willReplaceCharList.map((v) => "(" + v + ")").join("|"), "g"),
		(char, ...catchList) => replaceCharList[catchList.findIndex((temp) => temp !== undefined)] || ""
	);
});

textMap.set(["文本-取数字", "text-getNumber"], async (text) => {
	const [replaceText] = await TextMatch.doTextMatchList(text);
	if (!replaceText) {
		return "";
	}
	const num = strToNum(replaceText);
	return Number.isNaN(num) ? "" : num;
});

export { textMap };
