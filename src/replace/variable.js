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
		this.variableMap[key] = value;
		return "";
	}
}
