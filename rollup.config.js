export default {
	input: "src/showText.js",
	output: [
		{
			file: "dist/showText.js",
			name: "showText",
			format: "umd"
		},
		{
			file: "dist/showText.cjs",
			format: "cjs",
			name: "showTextNode"
		},
		{
			file: "dist/showText.esm.js",
			format: "esm",
			name: "showTextEsm"
		}
	]
};
