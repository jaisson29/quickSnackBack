import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { db, pool } from '../config/db';
import bcrypt from 'bcrypt';
import { MysqlError, Usuario } from '../types';

class UserModel {
	static async getAll() {
		const sql =
			'SELECT usu.usuId, usu.usuTipoDoc, usu.usuNoDoc , usu.usuGen, usu.usuNom, usu.usuEmail, usu.usuContra, usu.usuIngreso, usu.usuImg, per.perfilNom, usu.usuKey ' +
			'FROM usuario AS usu ' +
			'INNER JOIN perfil AS per ' +
			'ON usu.perfilId = per.perfilId ';
		const [results]: [RowDataPacket[], FieldPacket[]] = await pool.query<RowDataPacket[]>(sql);
		if (results.length === 0) {
			const _error: MysqlError = {
				message: 'No se encontraron registros',
				name: 'NotFoundError',
				code: 'NOT_FOUND_VALOR',
				fatal: false,
				errno: 502,
			};
			throw _error;
		}
		return results;
	}

	static async getOneXId(data: any) {
		const sql =
			'SELECT usu.usuId, usu.usuTipoDoc, usu.usuNoDoc, usu.usuGen, usu.usuNom, usu.usuEmail, usu.usuContra, usu.usuIngreso, usu.usuImg, per.perfilNom, usu.usuKey ' +
			'FROM usuario AS usu ' +
			'INNER JOIN perfil AS per ' +
			'ON usu.perfilId = per.perfilId ' +
			'WHERE usu.usuId = ? ';
		const { usuId } = data;

		const [result]: [RowDataPacket[], FieldPacket[]] = await pool.query<RowDataPacket[]>(sql, [usuId]);
		if (result.length === 0) {
			const _error: MysqlError = {
				message: 'No se encontraron registros',
				name: 'NotFoundError',
				code: 'NOT_FOUND_VALOR',
				fatal: false,
				errno: 502,
			};
			throw _error;
		}

		return result;
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
		if (!data.usuId) {
			throw new Error('No se proporcionaron los datos necesarios');
		}

		const updateData = { ...data };
		const { usuId, ...fieldsToUpdate } = updateData;

		const keys = Object.keys(fieldsToUpdate);
		if (!keys.length) {
			throw new Error('No se enviaron parámetros para actualizar');
		}

		const values = Object.values(fieldsToUpdate);
		const seteos = keys.map((key) => `${key} = ?`).join(', ');
		const sql = `UPDATE usuario SET ${seteos} WHERE usuId = ?`;

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [...values, usuId]);
		return result;
	}

	static async delete(data: any) {
		const sql = 'UPDATE usuario SET usuEst = 0 WHERE usuId = ?';
		const { usuId } = data;

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [usuId]);
		return result;
	}
}

export default UserModel;
