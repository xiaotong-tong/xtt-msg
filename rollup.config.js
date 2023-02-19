export default [
	{
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
	},
	{
		input: "plugins/fetch.js",
		output: [
			{
				file: "dist/plugins/fetch.cjs",
				format: "cjs",
				name: "fetchNode"
			},
			{
				file: "dist/plugins/fetch.esm.js",
				format: "esm",
				name: "fetchEsm"
			}
		]
	},
	{
		input: "plugins/file.js",
		output: [
			{
				file: "dist/plugins/file.cjs",
				format: "cjs",
				name: "fileNode"
			},
			{
				file: "dist/plugins/file.esm.js",
				format: "esm",
				name: "fileEsm"
			}
		]
	}
];
