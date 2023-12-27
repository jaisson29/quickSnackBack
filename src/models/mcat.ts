import { db } from '../config/db';

class Mcat {
	static getAll() {
		return new Promise((resolve, reject) => {
			const query = 'SELECT * FROM categoria';

			db.query(query, (err, results) => {
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
				const query = 'INSERT INTO categoria ( catNom) VALUES (?)';

				db.query(query, [data.catNom], (err, result: any) => {
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
				const query = 'UPDATE categoria' + ' ' + 'SET catNom = ?' + ' ' + 'WHERE catId = ?';
				db.query(query, [data.catNom, data.catId], (err, result: any) => {
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
				const query = 'DELETE FROM categoria WHERE catId = ?';

				db.query(query, [data.catId], (err, result: any) => {
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
			const query = 'SELECT catId, COUNT(catId) as can FROM producto group by catId';
			db.query(query, (err, results: any) => {
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

