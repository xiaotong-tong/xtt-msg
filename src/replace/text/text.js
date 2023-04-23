import { TextMatch } from "../../textToMatchList.js";
import xttUtils from "xtt-utils";
const { reverse, getTermLeft, getTermRight, getRangeByTerm, strToNum } =
	xttUtils;

const textMap = new Map();

textMap.set(["文本-反转文本"], async (text) => {
	const [replaceText] = await TextMatch.doTextMatchList(text);
	if (!replaceText) {
		return "";
	}
	return reverse(replaceText);
});

textMap.set(["文本-取文本左"], async (text) => {
	const [replaceText, stamp, limit] = await TextMatch.doTextMatchList(text);
	if (!replaceText) {
		return "";
	}
	if (!stamp) {
		return replaceText;
	}

	return getTermLeft(replaceText, stamp, limit);
});

textMap.set(["文本-取文本右"], async (text) => {
	const [replaceText, stamp, limit] = await TextMatch.doTextMatchList(text);
	if (!replaceText) {
		return "";
	}
	if (!stamp) {
		return replaceText;
	}

	return getTermRight(replaceText, stamp, limit);
});

textMap.set(["文本-取中间"], async (text) => {
	const [replaceText, leftStamp, rightStamp] =
		await TextMatch.doTextMatchList(text);
	if (!replaceText) {
		return "";
	}
	return getRangeByTerm(replaceText, [leftStamp, rightStamp]);
});

textMap.set(["文本-替换"], async (text) => {
	let [replaceText, willReplaceCharList, replaceCharList] =
		await TextMatch.doTextMatchList(text);
	if (!replaceText) {
		return "";
	}
	if (!willReplaceCharList || !replaceCharList) {
		return replaceText;
	}

	willReplaceCharList = willReplaceCharList.split(/[,，]/);
	replaceCharList = replaceCharList.split(/[,，]/);
	return replaceText.replaceAll(
		new RegExp(
			willReplaceCharList.map((v) => "(" + v + ")").join("|"),
			"g"
		),
		(char, ...catchList) =>
			replaceCharList[
				catchList.findIndex((temp) => temp !== undefined)
			] || ""
	);
});

textMap.set(["文本-取数字"], async (text) => {
	const [replaceText] = await TextMatch.doTextMatchList(text);
	if (!replaceText) {
		return "";
	}
	const num = strToNum(replaceText);
	return Number.isNaN(num) ? "" : num;
});

export { textMap };
