'use strict';

const fetchPlugin = ({ TextMatch }) => {
	return {
		访问: async (text) => {
			const [link] = await TextMatch.doTextMatchList(text);
			const res = await fetch(link);
			const json = await res.json();
			return JSON.stringify(json);
		}
	};
};

exports.fetchPlugin = fetchPlugin;
