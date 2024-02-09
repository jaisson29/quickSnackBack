/** @format */

import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { db, pool } from '../config/db';
import { MysqlError, Transaccion } from '../types';

class TransacModel {
	static async create(data: any): Promise<ResultSetHeader | MysqlError> {
		const sql = 'INSERT INTO transaccion(transacFecha, transacTipo, usuId) ' + 'VALUES(?, ?, ?)';
		const { transacFecha, transacTipo, usuId } = data;

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [transacFecha, transacTipo, usuId]);
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

	static getAll(): Promise<RowDataPacket[] | Transaccion[]> {
		return new Promise((resolve, reject) => {
			const sql =
				'SELECT ts.transacId, ts.transacFecha, ts.transacTipo, ts.usuId, usu.usuNom ' +
				'FROM transaccion ts ' +
				'INNER JOIN usuario usu ' +
				'ON ts.usuId = usu.usuId';

			db.query(sql, function (err, res: any) {
				if (err) {
					reject(err);
				} else if (res.length === 0) {
					const error = new Error('No se encontraron transacciones realizadas');
					reject(error);
				} else {
					resolve(res);
				}
			});
		});
	}

	static getByUser(data: any) {
		return new Promise((resolve, reject) => {
			const sql =
				'SELECT ts.transacId, ts.transacFecha, ts.transacTipo, ts.usuId, usu.usuNom, usu.usuNoDoc, prv.catId, SUM(dtv.detVenCant * prv.prodValVen) AS tot ' +
				'FROM transaccion ts ' +
				'INNER JOIN usuario usu ' +
				'ON ts.usuId = usu.usuId ' +
				'INNER JOIN detVenta dtv ' +
				'ON ts.transacId = dtv.transacId ' +
				'INNER JOIN producto prv ' +
				'ON dtv.prodId = prv.prodId ' +
				'WHERE ts.usuId = ?' +
				'GROUP BY ts.transacId, ts.transacFecha, ts.transacTipo, ts.usuId, usu.usuNom, prv.catId ' +
				'ORDER BY ts.transacFecha';

			const { usuId } = data;

			db.query(sql, [usuId], (err, res: any) => {
				if (err) {
					const error = err;
					error.name = 'Fallo en la consulta';
					reject(error);
				} else {
					const error = new Error('No se encontraron datos');
					res.length !== 0 ? resolve(res) : reject(error);
				}
			});
		});
	}
}

export default TransacModel;

