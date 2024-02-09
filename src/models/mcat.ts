import { db } from '../config/db';

class Mcat {
	static getAll() {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT * FROM categoria';

			db.query(sql, (err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
			});
		});
	}

	static create(data: any) {
		return new Promise((resolve, reject) => {
			try {
				const sql = 'INSERT INTO categoria ( catNom) VALUES (?)';

				db.query(sql, [data.catNom], (err, result: any) => {
					if (result.affectedRows === 1) {
						resolve(result);
					} else {
						reject(err);
					}
				});
			} catch (err) {
				reject(err);
			}
		});
	}

	static update(data: any) {
		return new Promise((resolve, reject) => {
			try {
				const sql = 'UPDATE categoria' + ' ' + 'SET catNom = ?' + ' ' + 'WHERE catId = ?';
				db.query(sql, [data.catNom, data.catId], (err, result: any) => {
					if (result.affectedRows == 1) {
						resolve(`Se actualizo ${result.affectedRows} registro`);
					} else {
						reject(err);
					}
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	static delete(data: any) {
		return new Promise((resolve, reject) => {
			try {
				const sql = 'DELETE FROM categoria WHERE catId = ?';

				db.query(sql, [data.catId], (err, result: any) => {
					if (result.affectedRows == 1) {
						resolve(`Se elimino ${result.affectedRows} registro`);
					} else {
						reject(err);
					}
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	static getMxP() {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT catId, COUNT(catId) as can FROM producto group by catId';
			db.query(sql, (err, results: any) => {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
			});
		});
	}
}

export default Mcat;

