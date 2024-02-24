import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/db';
import { MysqlError, Proveedor } from './../types/index';
export default class ProveedorModel {
	static async create(data: Proveedor): Promise<ResultSetHeader> {
		const sql = `
		INSERT INTO proveedor (provNom, provNit) 
		VALUES (?, ?);
		`;

		const { provNom, provNit } = data;

		const [result] : [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [provNom, provNit]);
		if (result.affectedRows !== 1) {
			const _error: MysqlError = {
				name: 'MysqlError',
				code: 'ER_NOT_CREATED_ERROR',
				message: 'Ocurrió un error al crear el registro en la base de datos',
				fatal: false,
				errno: 501,
			};
			throw _error;
		}
		return result;
	}

	static async getAll(): Promise<RowDataPacket[] | Proveedor[]> {
		const sql = `
		SELECT provId, provNom, provNit FROM proveedor;
		`;
		const [results]: [RowDataPacket[], FieldPacket[]] = await pool.query<RowDataPacket[]>(sql);
		if (!results?.length) {
			const _error: MysqlError = {
				message: 'No se encontró el proveedor',
				name: 'NotFoundError',
				code: 'NOTFOUND_PROVEEDOR',
				fatal: false,
				errno: 502,
			};
			throw _error;
		}

		return results;
	}

	static async getOne(provId: number): Promise<RowDataPacket[]> {
		const sql = `
			SELECT provId, provNom, provNit FROM proveedor WHERE provId=?;
			`;
		const [result] : [RowDataPacket[], FieldPacket[]] = await pool.query<RowDataPacket[]>(sql, [provId]);
		if (!result?.length) {
			const _error: MysqlError = {
				message: 'No se encontró el proveedor',
				name: 'NotFoundError',
				code: 'NOTFOUND_PROVEEDOR',
				fatal: false,
				errno: 502,
			};
			throw _error;
		}

		return result;
	}

	static async update(data: Proveedor): Promise<ResultSetHeader> {
		const updateData = { ...data };

		const { provId, ...fieldsToUpdate } = updateData;

		if (!provId) {
			const noDataError = {
				message: 'No se pudo actualizar al proveedor',
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
			UPDATE proveedor SET ${seteos} WHERE provId=?;
		`;

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [...values, provId]);

		if (result.affectedRows === 0) {
			const _error: MysqlError = {
				message: 'No se pudo actualizar al proveedor',
				name: 'NotUpdateError',
				code: 'NOTUPDATE_PROVEEDOR',
				fatal: false,
				errno: 503,
			};
			throw _error;
		}
		return result;
	}
	static async delete(provId: number) {
		const sql = `
			DELETE FROM proveedor WHERE provId = ?
		`;

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [provId]);

		if (result.affectedRows === 0) {
			const _error: MysqlError = {
				message: 'No se puede eliminar el proveedor',
				name: 'NotDeleteError',
				code: 'NOT_DELETE_PROVEEDOR',
				fatal: false,
				errno: 504,
			};
			throw _error;
		}
		return result;
	}
}

