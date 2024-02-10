/** @format */

import { db } from '../config/db';
import bcrypt from 'bcrypt';
import { Usuario } from '../types';

class UserModel {
	static keysPermitidas = [
		'usuId',
		'usuTipoDoc',
		'usuNoDoc',
		'usuGen',
		'usuNom',
		'usuEmail',
		'usuContra',
		'usuIngreso',
		'usuImg',
		'perfilI',
		'usuKey',
		'usuOlvid',
	];
	static getAll() {
		return new Promise((resolve, reject) => {
			try {
				const sql =
					'SELECT usu.usuId, usu.usuTipoDoc, usu.usuNoDoc , usu.usuGen, usu.usuNom, usu.usuEmail, usu.usuContra, usu.usuIngreso, usu.usuImg, per.perfilNom, usu.usuKey ' +
					'FROM usuario AS usu ' +
					'INNER JOIN perfil AS per ' +
					'ON usu.perfilId = per.perfilId ';
				db.query(sql, (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			} catch (err) {
				reject(err);
			}
		});
	}

	static getOneXId(data: any) {
		return new Promise((resolve, reject) => {
			try {
				const sql =
					'SELECT usu.usuId, usu.usuTipoDoc, usu.usuNoDoc, usu.usuGen, usu.usuNom, usu.usuEmail, usu.usuContra, usu.usuIngreso, usu.usuImg, per.perfilNom, usu.usuKey ' +
					'FROM usuario AS usu ' +
					'INNER JOIN perfil AS per ' +
					'ON usu.perfilId = per.perfilId ' +
					'WHERE usu.usuId = ? ';
				const { usuId } = data;

				db.query(sql, [usuId], (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			} catch (err) {
				reject(err);
			}
		});
	}

	static getOne(data: any) {
		return new Promise((resolve, reject) => {
			if (typeof data !== 'object' || data === null || Array.isArray(data)) {
				reject(new Error('Los datos proporcionados no son válidos'));
				return;
			}

			const filterData = { ...data };
			const keys = Object.keys(filterData).filter((key) => this.keysPermitidas.includes(key));
			if (keys.length === 0) {
				reject(new Error('No se encontraron datos'));
				return;
			}

			const values = keys.map((key) => filterData[key]);
			let conditions = keys.map((key) => `${key} = ?`).join(' AND ');
			const sql = `SELECT usuId, usuTipoDoc, usuNoDoc, usuGen, usuNom, usuEmail, usuKey, usuOlvid, usuEst FROM usuario WHERE ${conditions}`;

			db.query(sql, values, (err, result: any) => {
				if (err) {
					reject(err);
				} else if (result.length === 0) {
					const error = new Error('Fallo en obtener los datos');
					reject(error);
				} else {
					resolve(result[0]);
				}
			});
		});
	}

	static getOneXEmailXContra(data: Usuario) {
		return new Promise((resolve, reject) => {
			try {
				const sql =
					'SELECT usu.usuId, usu.usuTipoDoc, usu.usuNoDoc, usu.usuGen, usu.usuNom, usu.usuEmail, usu.usuContra, usu.usuIngreso, usu.usuImg, per.perfilNom, per.perfilId, per.paginaRuta, usu.usuKey ' +
					'FROM usuario AS usu ' +
					'INNER JOIN perfil AS per ' +
					'ON usu.perfilId = per.perfilId ' +
					'WHERE usuEmail = ?';
				const { usuEmail } = data;
				db.query(sql, [usuEmail], (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			} catch (err) {
				reject(err);
			}
		});
	}

	static create(data: any) {
		return new Promise((resolve, reject) => {
			const sql = `INSERT INTO usuario(usuTipoDoc, usuNoDoc, usuGen, usuNom, usuEmail, usuContra, usuIngreso, perfilId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
			const { usuTipoDoc, usuNoDoc, usuGen, usuNom, usuEmail, usuContra, usuIngreso, perfilId } = data;
			bcrypt
				.hash(usuContra, 10)
				.then((hash) => {
					db.query(sql, [usuTipoDoc, usuNoDoc, usuGen, usuNom, usuEmail, hash, usuIngreso, perfilId], (err, result: any) => {
						if (result && result.affectedRows === 1) {
							resolve(result);
						} else {
							reject(err);
						}
					});
				})
				.catch((err) => {
					throw new Error(err);
				});
		});
	}

	static async update(data: any): Promise<any> {
		return new Promise((resolve, reject) => {
			if (!data.usuId) {
				reject(new Error('No se proporcionaron los datos necesarios'));
				return;
			}

			const updateData = { ...data };
			const { usuId, ...fieldsToUpdate } = updateData;

			const keys = Object.keys(fieldsToUpdate).filter((key) => this.keysPermitidas.includes(key));
			if (keys.length === 0) {
				reject(new Error('No se enviaron parámetros para actualizar'));
				return;
			}

			const values = keys.map((key) => fieldsToUpdate[key]);
			const seteos = keys.map((key) => `${key} = ?`).join(', ');
			const sql = `UPDATE usuario SET ${seteos} WHERE usuId = ?`;

			db.query(sql, [...values, usuId], (err, result: any) => {
				if (err) {
					reject(err);
				} else if (result && result.affectedRows === 1) {
					resolve(result);
				} else {
					reject(new Error('No se pudo actualizar el usuario'));
				}
			});
		});
	}

	static delete(data: any) {
		return new Promise((resolve, reject) => {
			try {
				const sql = 'DELETE FROM usuario WHERE usuId = ?';
				const { usuId } = data;

				db.query(sql, [usuId], (err, result: any) => {
					if (result && result.affectedRows === 1) {
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
}

export default UserModel;

