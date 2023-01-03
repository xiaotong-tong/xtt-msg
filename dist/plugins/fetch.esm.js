const fetchPlugin = ({ TextMatch, replaceText }) => {
	return {
		访问: async (text) => {
			const [link] = await TextMatch.doTextMatchList(text);
			try {
				const res = await fetch(link);
				const json = await res.json();
				return replaceText.escapeChar(JSON.stringify(json));
			} catch (e) {
				return `访问${link}失败.`;
			}
		}
	};
};

export { fetchPlugin };
