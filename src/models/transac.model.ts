/** @format */

import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/db';
import { MysqlError, Transaccion } from '../types';

class TransacModel {
	static async create(data: Transaccion): Promise<ResultSetHeader> {
		const sql = `
			INSERT INTO transaccion(transacFecha, transacTipo, usuId, transacEst) 
			VALUES(?, ?, ?, ?)
		`;

		const { transacFecha, transacTipo, usuId } = data;

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [transacFecha, transacTipo, usuId, 1]);
		if (result.affectedRows === 0) {
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

	static async getAll(): Promise<RowDataPacket[]> {
		const sql =
			'SELECT ts.transacId, ts.transacFecha, ts.transacTipo, ts.usuId, ts.transacEst, usu.usuNom ' +
			'FROM transaccion ts ' +
			'INNER JOIN usuario usu ' +
			'ON ts.usuId = usu.usuId';

		const [result]: [RowDataPacket[], FieldPacket[]] = await pool.query<RowDataPacket[]>(sql);
		return result;
	}

	static async getByUser(usuId: number): Promise<RowDataPacket[]> {
		const sql = `
				SELECT ts.transacId, ts.transacFecha, ts.transacTipo, ts.usuId, ts.transacEst, usu.usuNom, usu.usuNoDoc, prv.catId, SUM(dtv.detVenCant * prv.prodValVen) AS tot
				FROM transaccion AS ts
				INNER JOIN usuario AS usu
				ON ts.usuId = usu.usuId
				INNER JOIN detVenta AS dtv
				ON ts.transacId = dtv.transacId
				INNER JOIN producto AS prv
				ON dtv.prodId = prv.prodId
				WHERE ts.usuId = ?
				GROUP BY ts.transacId, ts.transacFecha, ts.transacTipo, ts.usuId, usu.usuNom, prv.catId
				ORDER BY ts.transacFecha
			`;

		const [results]: [RowDataPacket[], FieldPacket[]] = await pool.query<RowDataPacket[]>(sql, [usuId]);
		return results;
	}

	static async delete(transacId: number): Promise<ResultSetHeader> {
		const sql = `
			UPDATE transaccion 
			SET transacEst = 0
			WHERE transacId = ?
		`;
		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [transacId]);
		return result;
	}

	static async complete(transacId: number): Promise<ResultSetHeader> {
		const sql = `
			UPDATE transaccion 
			SET transacEst = 2
			WHERE transacId = ?
		`;

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [transacId]);
		return result;
	}
}

export default TransacModel;
