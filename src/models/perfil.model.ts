/** @format */

import { db } from '../config/db';

class Mpef {
	static getAll() {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT * FROM perfil';

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
				const sql = 'INSERT INTO perfil ( perfilNom ) VALUES (?)';

				db.query(sql, [data.perfilNom], (err, result: any) => {
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
				const sql = 'UPDATE perfil' + ' ' + 'SET perfilNom = ?' + ' ' + 'WHERE perfilId = ?';
				db.query(sql, [data.perfilId, data.perfilNom], (err, result: any) => {
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
				const sql = 'DELETE FROM perfil WHERE perfilId = ?';

				db.query(sql, [data.perfilId], (err, result: any) => {
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
}

export default Mpef;

