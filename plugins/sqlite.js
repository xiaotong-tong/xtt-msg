import sqlite3 from "sqlite3";

export const sqlitePlugin = ({ TextMatch, replaceText }) => {
	return {
		"sqlite-get": async (text) => {
			const [dbPath, select] = await TextMatch.doTextMatchList(text);

			if (!dbPath || !select) {
				return "";
			}

			try {
				const dbPromise = new Promise((resolve, reject) => {
					const db = new sqlite3.Database(dbPath);

					db.get(select, (err, row) => {
						if (err) {
							reject(err);
							return;
						}
						resolve(JSON.stringify(row));
					});

					db.close();
				});

				return dbPromise;
			} catch (e) {
				return `读取db ${dbPath} 失败`;
			}
		},
		"sqlite-run": async (text) => {
			const [dbPath, select] = await TextMatch.doTextMatchList(text);

			if (!dbPath || !select) {
				return "";
			}

			try {
				const dbPromise = new Promise((resolve, reject) => {
					const db = new sqlite3.Database(dbPath);

					db.run(select, (err) => {
						if (err) {
							reject(err);
							return;
						}
						resolve("");
					});

					db.close();
				});

				return dbPromise;
			} catch (e) {
				return `运行db ${dbPath} 失败`;
			}
		},
		"sqlite-all": async (text) => {
			const [dbPath, select] = await TextMatch.doTextMatchList(text);

			if (!dbPath || !select) {
				return "";
			}

			try {
				const dbPromise = new Promise((resolve, reject) => {
					const db = new sqlite3.Database(dbPath);

					db.all(select, (err, rows) => {
						if (err) {
							reject(err);
							return;
						}
						resolve(JSON.stringify(rows));
					});

					db.close();
				});

				return dbPromise;
			} catch (e) {
				return `读取db ${dbPath} 失败`;
			}
		}
	};
};
