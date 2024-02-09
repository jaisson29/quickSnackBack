import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/db';
import { MysqlError, Proveedor } from './../types/index';
export default class ProveedorModel {
	static async create(data: Proveedor): Promise<ResultSetHeader> {
		const query = `
		INSERT INTO proveedor (provNom, provNit) 
		VALUES (?, ?);
		`;

		const { provNom, provNit } = data;

		const [result] = await pool.query<ResultSetHeader>(query, [provNom, provNit]);
		if (result.affectedRows !== 1) {
			const _error: MysqlError = {
				name: 'MysqlError',
				errno: 503,
				code: 'DB_ERROR',
				message: 'Ocurrió un error al crear el registro en la base de datos',
				fatal: false,
			};
			throw _error;
		}
		return result;
	}

	static async getAll(): Promise<RowDataPacket[] | Proveedor[]> {
		const query = `
		SELECT provId, provNom, provNit FROM proveedor;
		`;
		const results = await pool.query<RowDataPacket[]>(query);
		if (!results?.length) {
			const _error: MysqlError = {
				message: 'No se encontró el proveedor',
				name: 'NotFoundError',
				code: 'NOTFOUND_PROVEEDOR',
				fatal: false,
				errno: 404,
			};
			throw _error;
		}

		return results[0];
	}

	static async getOne(provId: number): Promise<Proveedor> {
		const query = `
			SELECT provId, provNom, provNit FROM proveedor WHERE provId=?;
			`;
		const [result]: [RowDataPacket[], FieldPacket[]] = await pool.query<RowDataPacket[]>(query, [provId]);
		if (!result?.length) {
			const _error: MysqlError = {
				message: 'No se encontró el proveedor',
				name: 'NotFoundError',
				code: 'NOTFOUND_PROVEEDOR',
				fatal: false,
				errno: 404,
			};
			throw _error;
		}
		const proveedor = result[0][0];

		return proveedor;
	}

	static async update(data: Proveedor): Promise<ResultSetHeader> {
		const updateData = { ...data };

		const { provId, ...fieldsToUpdate } = updateData;

		const seteos = Object.keys(fieldsToUpdate)
			.map((field) => `${Object.keys(field)} = ?`)
			.join(', ');
		const query = `
			UPDATE proveedor SET ${seteos} WHERE provId=?;
		`;

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(query, []);

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
	static async delete() {}
}

