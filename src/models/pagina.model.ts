import {  Pagina } from './../types';
import { db } from '../config/db';

class PaginaModel {
	static getAll(data: any) {
		return new Promise((resolve, reject) => {
			const sql =
				'SELECT pg.paginaId, pg.paginaNom, pg.paginaIcon, pg.paginaRuta, pxp.perfilId ' +
				'FROM pagina pg ' +
				'INNER JOIN perxpag pxp ' +
				'ON pg.paginaId = pxp.paginaId ' +
				'WHERE perfilId = ?';

			db.query(sql, [data.perfilId], (error, results) => {
				if (error) {
					reject(error);
				} else {
					resolve(results);
				}
			});
		});
	}

	static getOne(data: Pagina) {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT paginaId, paginaNom, paginaIcon, paginaRuta ' + 'FROM pagina ' + 'WHERE paginaId = ?';
		});
	}

	static create(data: Pagina) {
		return new Promise((resolve, reject) => {
			try {
				const sql = 'INSERT INTO pagina (paginaNom, paginaIcon, paginaRuta) VALUES(?,?,?)';

				db.query(sql, [data.paginaNom, data.paginaIcon, data.paginaRuta], (err: any, result: any) => {
					if (result.affectedRows === 1) {
						resolve(result);
					} else {
						reject(new Error(err));
					}
				});
			} catch (err) {
				console.log(err);
				reject(err);
			}
		});
	}

	static update(data: Pagina) {
		return new Promise((resolve, reject) => {
			try {
				const sql = 'UPDATE pagina' + ' ' + 'SET paginaNom = ?, paginaIcon = ?, paginaRuta = ?' + ' ' + 'WHERE paginaId = ?';
				db.query(sql, [data.paginaNom, data.paginaIcon, data.paginaRuta, data.paginaId], (err: any, result: any) => {
					if (result.affectedRows == 1) {
						resolve(`Se actualizo ${result.affectedRows} registro`);
					} else {
						reject(new Error(err));
					}
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	static delete(data: Pagina) {
		return new Promise((resolve, reject) => {
			try {
				const sql = 'DELETE FROM pagina WHERE paginaId = ?';

				db.query(sql, [data.paginaId], (err: any, result: any) => {
					if (result.affectedRows == 1) {
						resolve(`Se elimino ${result.affectedRows} registro`);
					} else {
						reject(new Error(err));
					}
				});
			} catch (error: any) {
				reject(new Error(error));
			}
		});
	}

	static getPagxpef() {
		return new Promise((resolve, reject) => {
			const query = 'SELECT paginaId, COUNT(paginaId) as can FROM perxpag group by paginaId';
			db.query(query, (err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
			});
		});
	}

	static getPefPag(perfilId: number) {
		return new Promise((resolve, reject) => {
			const sql =
				'SELECT pg.paginaId, pg.paginaNom, pg.paginaIcon, pg.paginaRuta, pxp.perfilId ' +
				'FROM pagina pg ' +
				'INNER JOIN perxpag pxp ' +
				'ON pg.paginaId = pxp.paginaId ' +
				'WHERE perfilId = ?';

			db.query(sql, [perfilId], (error: any, results: any) => {
				if (error) {
					reject(error);
				} else {
					resolve(results);
				}
			});
		});
	}
}

export default PaginaModel;
