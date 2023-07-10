import { textMap } from "./text.js";
import { normalMap } from "./normal.js";
import { mathMap } from "./math.js";
import { htmlMap } from "./html.js";
import { fnTextMap } from "./function.js";

const textList = {};

htmlMap.forEach((value, key) => {
	key.forEach((k) => {
		textList[k] = value;
	});
});

fnTextMap.forEach((value, key) => {
	key.forEach((k) => {
		textList[k] = value;
	});
});

mathMap.forEach((value, key) => {
	key.forEach((k) => {
		textList[k] = value;
	});
});

normalMap.forEach((value, key) => {
	key.forEach((k) => {
		textList[k] = value;
	});
});

textMap.forEach((value, key) => {
	key.forEach((k) => {
		textList[k] = value;
	});
});

export { textList };
