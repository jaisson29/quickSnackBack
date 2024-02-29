import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/db';
import { MysqlError, Valor } from './../types/index';
export default class ValorModel {
	static async create(data: Valor): Promise<ResultSetHeader> {
		const sql = `
		INSERT INTO valor (param, domId) 
		VALUES (?, ?);
		`;

		const { param, domId } = data;

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [param, domId]);
		if (result.affectedRows !== 1) {
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

	static async getAll(): Promise<RowDataPacket[]> {
		const sql = `
		SELECT v.valorId, v.param, v.domId, d.domNom 
		FROM valor AS v 
		INNER JOIN dominio AS d 
		ON v.domId = d.domId
		`;
		const [results]: [RowDataPacket[], FieldPacket[]] = await pool.query<RowDataPacket[]>(sql);
		return results;
	}

	static async getOne(valorId: number): Promise<RowDataPacket[]> {
		const sql = `
			SELECT valorId, param, domId FROM valor WHERE valorId=?;
			`;
		const [result]: [RowDataPacket[], FieldPacket[]] = await pool.query<RowDataPacket[]>(sql, [valorId]);
		if (!result?.length) {
			const _error: MysqlError = {
				message: 'No se encontró el valor',
				name: 'NotFoundError',
				code: 'NOTFOUND_VALOR',
				fatal: false,
				errno: 502,
			};
			throw _error;
		}

		return result;
	}

	static async update(data: Valor): Promise<ResultSetHeader> {
		const updateData = { ...data };

		const { valorId, ...fieldsToUpdate } = updateData;

		if (!valorId) {
			const noDataError = {
				message: 'No se pudo actualizar al valor',
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
			UPDATE valor SET ${seteos} WHERE valorId=?;
		`;

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [...values, valorId]);

		if (result.affectedRows === 0) {
			const _error: MysqlError = {
				message: 'No se pudo actualizar al valor',
				name: 'NotUpdateError',
				code: 'NOTUPDATE_VALOR',
				fatal: false,
				errno: 503,
			};
			throw _error;
		}
		return result;
	}
	static async delete(valorId: number) {
		const sql = `
			DELETE FROM valor WHERE valorId = ?
		`;

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [valorId]);

		if (result.affectedRows === 0) {
			const _error: MysqlError = {
				message: 'No se puede eliminar el valor',
				name: 'NotDeleteError',
				code: 'NOT_DELETE_VALOR',
				fatal: false,
				errno: 504,
			};
			throw _error;
		}
		return result;
	}
}
