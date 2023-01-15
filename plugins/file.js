import fs from "node:fs";
import process from "node:process";
import path from "node:path";

export const filePlugin = ({ TextMatch, replaceText }) => {
	return {
		"文件-读": async (text) => {
			const [filePath] = await TextMatch.doTextMatchList(text);
			if (!filePath) {
				return "";
			}
			try {
				const data = fs.readFileSync(filePath);
				return replaceText.escapeChar(data.toString());
			} catch (e) {
				return `读取文件 ${filePath} 失败`;
			}
		},
		"文件-新建": async (text) => {
			const [filePath] = await TextMatch.doTextMatchList(text);
			if (!filePath) {
				return "";
			}
			if (!/^[A-z]:[\\/]/.test(filePath)) {
				throw `${filePath}不是一个路径`;
			}
			try {
				if (fs.existsSync(filePath)) {
					return "";
				}
				fs.mkdirSync(path.dirname(filePath), { recursive: true });
				if (~filePath.search(/[\\/][^.]*\.[^.\\/]+$/)) {
					fs.writeFileSync(filePath, "");
				} else {
					fs.mkdirSync(filePath);
				}
				return "";
			} catch (e) {
				return `新建 ${filePath} 失败`;
			}
		},
		"文件-写": async (text) => {
			const [filePath, content] = await TextMatch.doTextMatchList(text);
			if (!filePath) {
				return "";
			}
			if (!/^[A-z]:[\\/].*\.[^.\\/]+$/.test(filePath)) {
				throw `${filePath}不是一个文件路径`;
			}
			try {
				fs.writeFileSync(filePath, replaceText.unescapeChar(content));
				return "";
			} catch (e) {
				return `写入文件 ${filePath} 失败`;
			}
		},
		当前目录: async () => {
			return process.cwd();
		}
	};
};
