export class variableMap {
	static variableMap = {
		nyaLang: "nya,喵,~,!,\u200d,ニャー,にゃ,\u200e"
	};

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
		value = value.replace(/\\u[0123456789abcdef]{4,}/g, function (code) {
			return String.fromCharCode(parseInt(code.substr(2, 4), 16));
		});

		this.variableMap[key] = value;
		return "";
	}
}
