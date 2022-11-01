class XttJS {
	static reverseText(text) {
		let resText = "";

		for (let i = text.length - 1; i >= 0; i--) {
			resText += text[i];
		}
		return resText;
	}
	static getTextNum(text) {
		if (typeof text === "number") {
			return text;
		}
		return parseFloat(text) || +text.replace(/\D/g, "");
	}
	static getRandom(min, max) {
		// 返回一个包含 min 和 max 的随机数
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	static getListSum(list) {
		return list.reduce((a, b) => a + b);
	}
	static getWeightedRandom(randomList, weightedList) {
		let sum = 0;

		const r = XttJS.getRandom(1, XttJS.getListSum(weightedList));
		for (let i = 0; i < randomList.length; i++) {
			sum += weightedList[i];
			if (r <= sum) {
				return randomList[i];
			}
		}
	}
	static shuffle(list) {
		for (let i = list.length - 1; i >= 0; i--) {
			const r = XttJS.getRandom(0, i);
			const temp = list[r];
			list[r] = list[i];
			list[i] = temp;
		}
		return list;
	}
	static getNonrandom(min, max) {
		if (min === max) {
			return max;
		}
		let randomArr = Array.from(
			{ length: max - min + 1 },
			(v, i) => i + min
		);
		return XttJS.shuffle(randomArr);
	}
}

export default XttJS;
