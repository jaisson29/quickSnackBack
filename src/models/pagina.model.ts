import { Pagina } from './../types';
import { pool } from '../config/db';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

class PaginaModel {
	static async getAll(data: any) {
		const sql =
			'SELECT pg.paginaId, pg.paginaNom, pg.paginaIcon, pg.paginaRuta, pxp.perfilId ' +
			'FROM pagina pg ' +
			'INNER JOIN perxpag pxp ' +
			'ON pg.paginaId = pxp.paginaId ' +
			'WHERE perfilId = ?';

		const [results]: [RowDataPacket[], FieldPacket[]] = await pool.query<RowDataPacket[]>(sql, [data.perfilId]);
		return results;
	}

	static async getOne(data: Pagina) {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT paginaId, paginaNom, paginaIcon, paginaRuta ' + 'FROM pagina ' + 'WHERE paginaId = ?';
		});
	}

	static async create(data: Pagina) {
		const sql = 'INSERT INTO pagina (paginaNom, paginaIcon, paginaRuta) VALUES(?,?,?)';

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [
			data.paginaNom,
			data.paginaIcon,
			data.paginaRuta,
		]);

		return result;
	}

	static async update(data: Pagina) {
		const sql =
			'UPDATE pagina' + ' ' + 'SET paginaNom = ?, paginaIcon = ?, paginaRuta = ?' + ' ' + 'WHERE paginaId = ?';
		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(sql, [
			data.paginaNom,
			data.paginaIcon,
			data.paginaRuta,
			data.paginaId,
		]);
		return result;
	}

	static async delete(data: Pagina) {
		const sql = 'DELETE FROM pagina WHERE paginaId = ?';

		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(sql, [data.paginaId]);
		return result;
	}

	static async getPagxpef() {
		const query = 'SELECT paginaId, COUNT(paginaId) as can FROM perxpag group by paginaId';
		const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query<ResultSetHeader>(query);
		return result;
	}

	static async getPefPag(perfilId: number) {
		const sql =
			'SELECT pg.paginaId, pg.paginaNom, pg.paginaIcon, pg.paginaRuta, pxp.perfilId ' +
			'FROM pagina pg ' +
			'INNER JOIN perxpag pxp ' +
			'ON pg.paginaId = pxp.paginaId ' +
			'WHERE perfilId = ?';

		const [results]: [RowDataPacket[], FieldPacket[]] = await pool.query<RowDataPacket[]>(sql, [perfilId]);
		return results
	}
}

export default PaginaModel;
