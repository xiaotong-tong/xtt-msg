class XttJS {
	static reverseText(text) {
		let resText = "";

		for (let i = text.length - 1; i >= 0; i--) {
			resText += text[i];
		}
		return resText;
	}
	static getTextNum(text) {
		let sign = 1;
		if (typeof text === "number") {
			return text;
		}
		if (!~text.search(/\d/)) {
			return "";
		}
		const removeNaNChar = (str) => {
			return str.replace(/\D/g, "");
		};
		if (text.startsWith("-")) {
			sign = -1;
		}
		const pointIndex = text.indexOf(".");
		if (~pointIndex) {
			return (
				sign *
				`${removeNaNChar(text.slice(0, pointIndex))}.${removeNaNChar(
					text.slice(pointIndex + 1)
				)}`
			);
		} else {
			return sign * removeNaNChar(text);
		}
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
	static conversionBase(num, base) {
		if (base === 16) {
			return "0x" + num.toString(16);
		} else if (base === 8) {
			return "0o" + num.toString(8);
		} else if (base === 10) {
			return "" + num.toString(10);
		} else if (base === 2) {
			return "0b" + num.toString(2);
		} else {
			return num;
		}
	}
	static charToCodePoint(char, base, numAsChar) {
		if (isNaN(Number(char)) || numAsChar) {
			return XttJS.stringToCodePointList(char)
				.map((charPoint) => XttJS.conversionBase(charPoint, base))
				.join("");
		} else {
			return XttJS.conversionBase(Number(char), base);
		}
	}
	static codePointToChar(codePoint, isNumber) {
		if (isNumber) {
			return XttJS.conversionBase(Number(codePoint), 10);
		}
		return String.fromCodePoint(codePoint);
	}
	static stringToCodePointList(str) {
		if (!str) {
			return;
		}
		return [...str].map((char) => char.codePointAt());
	}
}

export default XttJS;
