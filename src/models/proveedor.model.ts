import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { db } from '../config/db';
import { Proveedor } from './../types/index';
import { error } from 'console';
export default class ProveedorModel {
	static async create(data: Proveedor) {
		const query = `
		INSERT INTO proveedor (provNom, provNit) 
		VALUES (?, ?);
		`;

		const { provNom, provNit } = data;

		db.query<ResultSetHeader>(query, [provNom, provNit], (_error, result) => {
			if (_error) throw _error;
			if (result.affectedRows === 1) return result;
		});
	}
	static async getAll() {
		const query = `
		SELECT provId, provNom, provNit FROM proveedor;
		`
		db.query<RowDataPacket[]>(query, (_error, result) => {
			if(_error) throw _error;
			return result;
		}) 
	}
	static async getOne() {}
	static async update() {}
	static async delete() {}
}

