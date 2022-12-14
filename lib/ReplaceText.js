import XttJS from "./xtt.js";

class ReplaceText extends XttJS {
	static variableMap = {};

	static getTextLeft(text, stamp, limit = 1) {
		// 处理要匹配的字符在字符串第一位的情况
		const startGrep = new RegExp("^" + stamp);
		if (startGrep.test(text)) {
			if (limit <= 1) {
				return "";
			} else {
				limit -= 1;
			}
		}

		const grep = new RegExp(`.+?(?=${stamp})`, "g");
		// text.replace(/(?<!\\)\\(?!\\)/, "//"); // 好像不需要处理，js字符串没有一个反斜杠的情况
		return text.match(grep).slice(0, super.getTextNum(limit)).join("");
	}
	static getTextRight(text, stamp, limit = 1) {
		let step = super.getTextNum(limit);
		const grep = new RegExp(`(?<=(^|${stamp})).*?(${stamp}|$)`, "g");
		const matchList = text.match(grep);

		return matchList.slice(step).join("");
	}
	static getTextCenter(text, leftStamp, rightStamp) {
		let matchType = text.match(
			new RegExp(`${leftStamp}([\\s\\S]*?)${rightStamp}`)
		);

		if (matchType) {
			return matchType[1];
		} else {
			matchType = text.match(
				new RegExp(`${rightStamp}([\\s\\S]*?)${leftStamp}`)
			);
			return matchType ? matchType[1] : text;
		}
	}
	static getRandom(min = 1, max = 100) {
		return super.getRandom(super.getTextNum(min), super.getTextNum(max));
	}
	static getWeightedRandom(randomList, weightedList) {
		return super.getWeightedRandom(
			randomList,
			weightedList
				.slice(0, randomList.length)
				.map((v) => super.getTextNum(v))
		);
	}
	static nonrandom(min = 1, max = 10, variable) {
		if ((min = super.getTextNum(min)) === (max = super.getTextNum(max))) {
			return max; // 如果两值相等则返回
		}
		if (min > max) {
			let temp = min;
			min = max;
			max = temp;
		}
		let arr = super.getNonrandom(min, max);

		if (variable) {
			this.setVariable(variable, arr[Symbol.iterator]());
			return "";
		} else {
			return arr;
		}
	}
	static getDate(newDate = Date.now(), type) {
		const date = new Date(newDate),
			year = date.getFullYear(),
			month = (date.getMonth() + 1).toString().padStart(2, "0"),
			day = date.getDate().toString().padStart(2, "0"),
			hour = date.getHours().toString().padStart(2, "0"),
			minutes = date.getMinutes().toString().padStart(2, "0"),
			seconds = date.getSeconds().toString().padStart(2, "0"),
			week = date.getDay(),
			weekList = [
				"星期日",
				"星期一",
				"星期二",
				"星期三",
				"星期四",
				"星期五",
				"星期六"
			];

		if (!type) {
			return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
		}

		if (type === "all") {
			return `${year}-${month}-${day} ${hour}:${minutes}:${seconds} ${weekList[week]}`;
		}

		return type.replace(/=(?:[年月日时分秒]|星期)=/g, (value) => {
			switch (value) {
				case "=年=":
					return year;
				case "=月=":
					return month;
				case "=日=":
					return day;
				case "=时=":
					return hour;
				case "=分=":
					return minutes;
				case "=秒=":
					return seconds;
				case "=星期=":
					return weekList[week];
			}
		});
	}
	static getVariable(key) {
		let res = this.variableMap[key];
		if (res === undefined) {
			throw "没有变量" + key + "哦";
		}
		if (res.next) {
			let data = res.next();
			if (data.done) {
				return "已经获取完了哦~再重新赋值一个吧！";
			} else {
				return data.value;
			}
		}
		return res;
	}
	static setVariable(key, value) {
		this.variableMap[key] = value;
		return "";
	}
}

export default ReplaceText;
