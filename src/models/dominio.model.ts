import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/db';
import { MysqlError, Dominio } from './../types/index';
export default class DominioModel {
	static async create(data: Dominio): Promise<ResultSetHeader> {
		const sql = `
		INSERT INTO dominio (domNom) 
		VALUES (?);
		`;

		const { domNom } = data;

		const [result] = await pool.query<ResultSetHeader>(sql, [domNom]);
		if (result.affectedRows !== 1 || !result.insertId) {
			const _error: MysqlError = {
				name: 'MysqlError',
				code: 'ER_NOT_CREATED_ERROR',
				message: 'Ocurrió un error al crear el registro',
				fatal: false,
				errno: 501,
			};
			throw _error;
		}
		return result;
	}

	static async getAll(): Promise<RowDataPacket[] | Dominio[]> {
		const sql = `
		SELECT domId, domNom FROM dominio;
		`;
		const results = await pool.query<RowDataPacket[]>(sql);
		if (!results?.length) {
			const _error: MysqlError = {
				message: 'No se encontró el dominio',
				name: 'NotFoundError',
				code: 'NOTFOUND_DOMINIO',
				fatal: false,
				errno: 502,
			};
			throw _error;
		}

		return results[0];
	}

	static async getOne(domId: number): Promise<RowDataPacket[]> {
		const sql = `
			SELECT domId, domNom FROM dominio WHERE domId=?;
			`;
		const [result]: [RowDataPacket[], FieldPacket[]] = await pool.query<RowDataPacket[]>(sql, [domId]);
		if (!result?.length) {
			const _error: MysqlError = {
				message: 'No se encontró el dominio',
				name: 'NotFoundError',
				code: 'NOTFOUND_DOMINIO',
				fatal: false,
				errno: 502,
			};
			throw _error;
		}

		return result;
	}

	static async update(data: Dominio): Promise<ResultSetHeader> {
		const updateData = { ...data };

		const { domId, ...fieldsToUpdate } = updateData;

		if (!domId) {
			const noDataError = {
				message: 'No se pudo actualizar el dominio',
				code: 'NotIdSendError',
				name: 'NOT_DATA_SEND',
				fatal: false,
				errno: 503,
			};
			throw noDataError;
		}

		const seteos = Object.keys(fieldsToUpdate)
			.map((field) => `${field} = ?`)
			.join(', ');

		const values = Object.values(fieldsToUpdate);
		const sql = `
			UPDATE dominio SET ${seteos} WHERE domId=?;
		`;

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [...values, domId]);

		if (result.affectedRows === 0) {
			const _error: MysqlError = {
				message: 'No se pudo actualizar el dominio',
				name: 'NotUpdateError',
				code: 'NOTUPDATE_DOMINIO',
				fatal: false,
				errno: 503,
			};
			throw _error;
		}
		return result;
	}
	static async delete(domId: number) {
		const sql = `
			DELETE FROM dominio WHERE domId = ?
		`;

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [domId]);

		if (result.affectedRows === 0) {
			const _error: MysqlError = {
				message: 'No se puede eliminar el dominio',
				name: 'NotDeleteError',
				code: 'NOT_DELETE_DOMINIO',
				fatal: false,
				errno: 504,
			};
			throw _error;
		}
		return result;
	}
}

