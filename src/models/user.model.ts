import { db, pool } from '../config/db';
import bcrypt from 'bcrypt';
import { MysqlError, Usuario } from '../types';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

class UserModel {
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

	static async getOne(data: Usuario) {
		const filterData = { ...data };
		const keys = Object.keys(filterData);
		if (!keys.length) {
			throw new Error('No se encontraron datos');
		}

		const values = Object.values(filterData);
		let conditions = keys.map((key) => `${key} = ?`).join(' AND ');
		const sql = `SELECT usuId, usuTipoDoc, usuNoDoc, usuGen, usuNom, usuEmail, usuKey, usuOlvid, usuEst FROM usuario WHERE ${conditions}`;

		const [results]: [RowDataPacket[], FieldPacket[]] = await pool.query<RowDataPacket[]>(sql, values);
		if (!results.length) {
			const _error: MysqlError = {
				name: 'MysqlError',
				errno: 502,
				code: 'DB_NOT_FOUND',
				message: 'No se encontraron resultados',
				fatal: false,
			};
			throw _error;
		}
		return results;
	}

	static async getOneXEmailXContra(data: Usuario): Promise<RowDataPacket[]> {
		const sql =
			'SELECT usu.usuId, usu.usuTipoDoc, usu.usuNoDoc, usu.usuGen, usu.usuNom, usu.usuEmail, usu.usuContra, usu.usuIngreso, usu.usuImg, per.perfilNom, per.perfilId, per.paginaRuta, usu.usuKey ' +
			'FROM usuario AS usu ' +
			'INNER JOIN perfil AS per ' +
			'ON usu.perfilId = per.perfilId ' +
			'WHERE usuEmail = ?';
		const { usuEmail } = data;
		const [results]: [RowDataPacket[], FieldPacket[]] = await pool.query<RowDataPacket[]>(sql, [usuEmail]);
		return results;
	}

	static async create(data: Usuario) {
		const sql = `INSERT INTO usuario(usuTipoDoc, usuNoDoc, usuGen, usuNom, usuEmail, usuContra, usuIngreso, perfilId, usuEst) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
		const { usuTipoDoc, usuNoDoc, usuGen, usuNom, usuEmail, usuContra, usuIngreso, perfilId, usuEst } = data;

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [
			usuTipoDoc,
			usuNoDoc,
			usuGen,
			usuNom,
			usuEmail,
			usuContra,
			usuIngreso,
			perfilId,
			usuEst,
		]);
		console.log(result);
		if (!result.insertId) {
			const _error: MysqlError = {
				name: 'MysqlError',
				errno: 503,
				code: 'DB_ERROR',
				message: 'Ocurrió un error al crear el registro',
				fatal: false,
			};
			throw _error;
		}

		return result;
	}

	static async update(data: any): Promise<any> {
		return new Promise((resolve, reject) => {
			if (!data.usuId) {
				reject(new Error('No se proporcionaron los datos necesarios'));
				return;
			}

			const updateData = { ...data };
			const { usuId, ...fieldsToUpdate } = updateData;

			const keys = Object.keys(fieldsToUpdate);
			if (!keys.length) {
				reject(new Error('No se enviaron parámetros para actualizar'));
				return;
			}

			const values = Object.values(fieldsToUpdate);
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
				const sql = 'UPDATE usuario SET usuEst = 0 WHERE usuId = ?';
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
