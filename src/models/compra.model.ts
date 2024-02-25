import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/db';
import { MysqlError, Compra } from './../types/index';

class CompraModel {
	static async getAll(): Promise<RowDataPacket[]> {
		const sql = 'SELECT c.compraId, c.provId, c.fechaCompra, p.provNom FROM compra AS c INNER JOIN proveedor AS p ON c.provId=p.provId';
		const [result]: [RowDataPacket[], FieldPacket[]] = await pool.query<RowDataPacket[]>(sql);
		return result;
	}

	static async create(data: Compra): Promise<ResultSetHeader> {
		const sql = 'INSERT INTO compra (provId, fechaCompra) VALUES (?, ?)';
		const { provId, fechaCompra } = data;
		const [result] = await pool.query<ResultSetHeader>(sql, [provId, fechaCompra]);
		if (result.affectedRows === 1) {
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

	static async getOne(compraId: number): Promise<RowDataPacket[]> {
		const sql = `
			SELECT compraId, provId, fechaCompra FROM compra WHERE compraId=?;
			`;
		const [result]: [RowDataPacket[], FieldPacket[]] = await pool.query<RowDataPacket[]>(sql, [compraId]);
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

	static async update(data: Compra): Promise<ResultSetHeader> {
		const updateData = { ...data };

		const { compraId, ...fieldsToUpdate } = updateData;
		if (!compraId) {
			const noDataError = {
				message: 'No se pudo actualizar la compra',
				code: 'NotIdSentError',
				name: 'NOT_DATA_SEND',
				fatal: false,
				errno: 503,
			};
			throw noDataError;
		}

		const seteos = Object.keys(fieldsToUpdate)
			.map((field) => `${field}= ?`)
			.join(', ');

		const values = Object.values(fieldsToUpdate);
		const sql = `UPDATE compra SET ${seteos} WHERE compraId=?`;
		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [...values, compraId]);
		if (result.affectedRows === 0) {
			const _error: MysqlError = {
				message: 'No se pudo actualizar la compra',
				name: 'NotUpdateError',
				code: 'NOTUPDATE_COMPRA',
				fatal: false,
				errno: 503,
			};
			throw _error;
		}
		return result;
	}
	static async delete(compraId: number) {
		const sql = 'DELETE FROM compra WHERE compraId = ?';

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [compraId]);

		if (result.affectedRows === 0) {
			const _error: MysqlError = {
				message: 'No se puede eliminar la compra',
				name: 'NotDeleteError',
				code: 'NOT_DELETE_COMPRA',
				fatal: false,
				errno: 504,
			};
			throw _error;
		}
		return result;
	}
}

export default CompraModel;
