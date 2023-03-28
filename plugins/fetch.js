export const fetchPlugin = ({ TextMatch }) => {
	return {
		访问: async (text) => {
			const [link] = await TextMatch.doTextMatchList(text);
			try {
				const res = await fetch(link);
				const json = await res.json();
				return JSON.stringify(json);
			} catch (e) {
				return `访问${link}失败.`;
			}
		}
	};
};
