export const charList = {
	"<&1>": "【",
	"<&2>": "】",
	"<&3>": "-->>"
};

export const escapeChar = (str) => {
	const values = Object.values(charList);
	const keys = Object.keys(charList);
	return str.replace(new RegExp(values.join("|"), "g"), (matched) => {
		return keys[values.indexOf(matched)];
	});
};

export const unescapeChar = (str) => {
	return str.replaceAll(/<&\d+>/g, (value) => {
		return charList[value];
	});
};
