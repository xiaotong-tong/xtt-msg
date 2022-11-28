(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.showText = {}));
})(this, (function (exports) { 'use strict';

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
			let randomArr = Array.from({ length: max - min + 1 }, (v, i) => i + min);
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
				weightedList.slice(0, randomList.length).map((v) => super.getTextNum(v))
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

			return type.replace(/年|月|日|时|分|秒|星期/g, (value) => {
				switch (value) {
					case "年":
						return year;
					case "月":
						return month;
					case "日":
						return day;
					case "时":
						return hour;
					case "分":
						return minutes;
					case "秒":
						return seconds;
					case "星期":
						return weekList[week];
				}
			});
		}
		static getVariable(key) {
			let res = this.variableMap[key];
			if (res === undefined) {
				throw "没有" + key + "变量哦";
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
				return text.replace(/^<([\s\S]+?)>/, `<$1 style="color: ${color}">`);
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

	class TextMatch {
		static #getMatchList(type, divide, left, right) {
			/**
			 * 用分隔符将文本分为对应的数组
			 * 如 【选择-->>2-->>【随机数-->>1-->>5】-->>【随机数-->>1-->>10】】
			 * 将返回数组 ["【随机数-->>1-->>5】", "【随机数-->>1-->>10】"]
			 * */
			let list = [],
				balance = 0,
				cacheList = [];
			type.forEach((item) => {
				if (~item.search(new RegExp(left + "|" + right))) {
					balance =
						balance +
						(item.match(new RegExp(left, "g")) || []).length -
						(item.match(new RegExp(right, "g")) || []).length;

					cacheList.push(item);
					if (balance === 0) {
						list.push(cacheList.join(divide));
						cacheList = [];
					}
				} else if (balance) {
					cacheList.push(item);
				} else {
					list.push(item);
				}
			});
			return list;
		}

		static doTextMatchList(text, noParseContent) {
			const type = text.match(/(?<=-->>)[\s\S]*?(?=-->>|】$)/g);
			if (!type) {
				return [];
			}

			const content = TextMatch.#getMatchList(type, "-->>", "【", "】");

			if (noParseContent) {
				return content;
			} else {
				return content.map(Replace.doReplaceToText);
			}
		}
	}

	const text = {
		"文本-反转文本"(text) {
			const [replaceText] = TextMatch.doTextMatchList(text);
			if (!replaceText) {
				return "";
			}
			return BrowserReplaceText.reverseText(replaceText);
		},
		"文本-取文本左"(text) {
			const [replaceText, stamp, limit] = TextMatch.doTextMatchList(text);
			if (!replaceText) {
				return "";
			}
			if (!stamp) {
				return replaceText;
			}

			return BrowserReplaceText.getTextLeft(replaceText, stamp, limit);
		},
		"文本-取文本右"(text) {
			const [replaceText, stamp, limit] = TextMatch.doTextMatchList(text);
			if (!replaceText) {
				return "";
			}
			if (!stamp) {
				return replaceText;
			}

			return BrowserReplaceText.getTextRight(replaceText, stamp, limit);
		},
		"文本-取中间"(text) {
			const [replaceText, leftStamp, rightStamp] =
				TextMatch.doTextMatchList(text);
			if (!replaceText) {
				return "";
			}
			return BrowserReplaceText.getTextCenter(replaceText, leftStamp, rightStamp);
		},
		"文本-替换"(text) {
			let [replaceText, willReplaceCharList, replaceCharList] =
				TextMatch.doTextMatchList(text);
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
				(char, ...catchList) =>
					replaceCharList[catchList.findIndex((temp) => temp !== undefined)] || ""
			);
		},
		"文本-取数字"(text) {
			const [replaceText] = TextMatch.doTextMatchList(text);
			if (!replaceText) {
				return "";
			}
			return BrowserReplaceText.getTextNum(replaceText);
		}
	};

	const normal = {
		当前时间(text) {
			const type = TextMatch.doTextMatchList(text);
			return BrowserReplaceText.getDate(Date.now(), type && type[0]);
		},
		返回(text) {
			const type = TextMatch.doTextMatchList(text);
			Replace.backText = type[0];
			return "";
		},
		变量(text) {
			const type = TextMatch.doTextMatchList(text);
			return type.length === 1
				? BrowserReplaceText.getVariable(type[0])
				: BrowserReplaceText.setVariable(type[0], type[1]);
		}
	};

	const math = {
		选择(text) {
			let [choicePoint, ...choiceList] = TextMatch.doTextMatchList(text, true);
			if (!choicePoint) {
				return "";
			}
			choicePoint = Replace.doReplaceToText(choicePoint);
			if (isNaN(+choicePoint)) {
				let startText = "?<" + choicePoint + ">";
				let resChoickText = choiceList
					.map((v) => Replace.doReplaceToText(v))
					.find((choiceText) => choiceText.startsWith(startText));

				if (!resChoickText) {
					return "";
				}
				return resChoickText.substring(startText.length);
			} else {
				let choiceNum = parseInt(choicePoint);
				if (choiceNum > 0) {
					choiceNum = choiceNum - 1;
					if (choiceNum >= choiceList.length) {
						choiceNum = choiceList.length - 1;
					}
				} else if (choiceNum === 0) {
					return "";
				} else if (choiceNum < 0) {
					choiceNum = choiceNum + choiceList.length;
					if (choiceNum < 0) {
						choiceNum = 0;
					}
				}
				return Replace.doReplaceToText(choiceList[choiceNum]);
			}
		},
		判断(text) {
			const [contentText, success = "", fail = ""] = TextMatch.doTextMatchList(
				text,
				true
			);
			if (!contentText) {
				return "";
			}
			const content = Replace.doReplaceToText(contentText);

			try {
				// 此处使用了 Function() 来处理用户输入的数据
				return Function("return " + content)()
					? Replace.doReplaceToText(success)
					: Replace.doReplaceToText(fail);
			} catch (error) {
				throw `请将${text}改为正确的判断公式`;
			}
		},
		计算(text) {
			const [content] = TextMatch.doTextMatchList(text);
			if (!content) {
				return "";
			}

			try {
				return Function("return " + content)();
			} catch (error) {
				throw `请将${text}改为正确的计算公式`;
			}
		},
		随机数(text) {
			const [min, max] = TextMatch.doTextMatchList(text);
			return BrowserReplaceText.getRandom(min || 1, max || 100);
		},
		权重随机数(text) {
			const [randomText, weightedText] = TextMatch.doTextMatchList(text);
			if (!randomText) {
				return "";
			}
			const randomList = randomText.split(/[,，]/);
			let weightedList = [];
			if (!weightedText) {
				for (let i = 0; i < randomList.length - 1; i++) {
					weightedList.push(1);
				}
			} else {
				weightedList = weightedText.split(/[,，]/);
			}
			return BrowserReplaceText.getWeightedRandom(randomList, weightedList);
		},
		非重随机数(text) {
			const [min, max, variable] = TextMatch.doTextMatchList(text);
			return BrowserReplaceText.nonrandom(min || 1, max || 10, variable);
		},
		八进制(text) {
			const [char] = TextMatch.doTextMatchList(text) || [];
			if (!char) {
				return "";
			}
			return BrowserReplaceText.charToCodePoint(char, 8);
		},
		十六进制(text) {
			const [char] = TextMatch.doTextMatchList(text) || [];
			if (!char) {
				return "";
			}
			return BrowserReplaceText.charToCodePoint(char, 16);
		},
		十进制(text) {
			const [char] = TextMatch.doTextMatchList(text) || [];
			if (!char) {
				return "";
			}
			return BrowserReplaceText.charToCodePoint(char, 10);
		},
		二进制(text) {
			const [char] = TextMatch.doTextMatchList(text) || [];
			if (!char) {
				return "";
			}
			return BrowserReplaceText.charToCodePoint(char, 2);
		}
	};

	const html = {
		"文本-注音"(text) {
			const textState = TextMatch.doTextMatchList(text);
			return BrowserReplaceText.getRubyHTML(textState[0], textState[1]);
		},
		"文本-文字颜色"(text) {
			const textState = TextMatch.doTextMatchList(text);
			return BrowserReplaceText.setTextColor(textState[0], textState[1]);
		},
		"文本-黑幕"(text) {
			const textState = TextMatch.doTextMatchList(text);
			return BrowserReplaceText.getHeimuHTML(textState[0]);
		},
		换行() {
			return "<br />";
		},
		空格() {
			return "&nbsp;";
		}
	};

	BrowserReplaceText.setVariable("nyaLang", "nya,喵,~,!,\u200d,ニャー,にゃ,\u200e");

	const fnText = {
		喵语(text) {
			const [willnyaText] = TextMatch.doTextMatchList(text);
			if (!willnyaText) {
				return "";
			}
			const nyaLang = BrowserReplaceText.getVariable("nyaLang").split(",");

			return (
				BrowserReplaceText.charToCodePoint(willnyaText, 8, true)
					.match(/0o\d+(?!o)/g)
					.map((char) => char.slice(2).replace(/\d/g, (num) => nyaLang[num]))
					.join("\u200c") + "."
			);
		},
		解喵语(text) {
			let [willnyaText] = TextMatch.doTextMatchList(text);
			if (!willnyaText) {
				return "";
			}
			const nyaLang = BrowserReplaceText.getVariable("nyaLang").split(",");
			willnyaText = willnyaText.substring(0, willnyaText.length - 1);

			const isNyaTextGrep = new RegExp(`^(${nyaLang.join("|")}|\u200c)+$`);
			if (!isNyaTextGrep.test(willnyaText)) {
				throw "遇到了不认识的喵语呢。";
			}

			return willnyaText
				.split("\u200c")
				.map((char) =>
					BrowserReplaceText.codePointToChar(
						"0o" +
							char.replace(new RegExp(nyaLang.join("|"), "g"), (str) =>
								nyaLang.indexOf(str)
							)
					)
				)
				.join("");
		}
	};

	const textList = Object.assign({}, text, normal, math, html, fnText);

	class Replace {
		static backText;

		static doReplace(text) {
			/**
			 * 【】解析的内容如果需要格外添加 html标签的话，会暂时返回 {{{}}} 格式内容
			 * doReplaceToHTML 会将 {{{}}}格式转为对应的 html标签文本
			 * */
			return Replace.doReplaceToText(text);
		}

		static doReplaceToText(text) {
			/**
			 * 【】 类型文本处理函数, 将当前文本中的第一层的【】内容取出并解析替换, 在解析过程中通过递归来处理第二层以及更多层的文本
			 * 如 【1【2】【3【4】】】【5】， 解析层级 1,5 -->> 2,3 -->> 4
			 * */
			if (/【[^】]+】/.test(text)) {
				let parts = text.match(/[【】]|[^【】]+/g),
					matches = [],
					balance = 0,
					index = 0;

				for (let i = 0; i < parts.length; i++) {
					if (parts[i] === "【") {
						if (balance === 0) {
							index = i;
						}
						balance++;
					} else if (parts[i] === "】") {
						if (balance === 1) {
							matches.push(parts.slice(index, i + 1).join(""));
						}
						balance--;
						if (balance < 0) {
							throw 'missing "【"';
						}
					}
				}
				if (balance > 0) {
					throw 'missing "】"';
				}

				matches.forEach((matchText) => {
					text = text.replace(matchText, (match) => Replace.#doTextMatch(match));
					if (Replace.backText) {
						text = Replace.backText;
						Replace.backText = "";
					}
				});
			}
			return text;
		}
		static #doTextMatch(match) {
			/**
			 * 根据文本的内容 查找是否有对应的解析，如果有就调用，没有就返回文本
			 * */
			const type = match.match(/^【(.+?)(?=(?:-->>|】))/);
			if (textList[type[1]]) {
				return textList[type[1]](type.input);
			} else {
				return type.input;
			}
		}
	}

	/**
	 * 个人日常使用和学习用库
	 * 功能: 传入一串字符串, 返回按一定规则处理后的字符串
	 * */

	class ShowText {
		static showText(text) {
			/**
			 * 入口函数, 对数据进行预先处理, 清除 【 左侧的空格和换行 以及 】 右侧的空格和换行
			 * */
			if (/【[^】]+】/.test(text)) {
				try {
					text = text.replace(/\s+(?=【)|(?<=】)\s+/g, "");
					return Replace.doReplace(text);
				} catch (e) {
					return e;
				}
			}
			return text;
		}
	}

	const showTextBrowser = (text) => {
		return ShowText.showText(text);
	};

	exports.showTextBrowser = showTextBrowser;

}));
