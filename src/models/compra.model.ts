import { db } from '../config/db';

interface CompraData {
	provId: number;
	fechaCompra: string;
}

class Compra {
	static getAll() {
		return new Promise((resolve, reject) => {
			try {
				const query = 'SELECT c.compraId, c.provId, c.fechaCompra, p.provNom FROM compra AS c INNER JOIN proveedor AS p ON c.provId=p.provId';
				db.query(query, (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			} catch (err) {
				reject(err);
			}
		});
	}

	static create(data: CompraData) {
		return new Promise((resolve, reject) => {
			try {
				const query = 'INSERT INTO compra (provId, fechaCompra) VALUES (?, ?)';
				const { provId, fechaCompra } = data;
				db.query(query, [provId, fechaCompra], (err, result: any) => {
					if (result && result?.affectedRows === 1) {
						resolve(result);
					} else {
						throw err;
					}
				});
			} catch (err) {
				reject(err);
			}
		});
	}

	static editar(data: CompraData & { compraId: number }) {
		return new Promise((resolve, reject) => {
			const query = 'UPDATE compra SET provId = ?, fechaCompra = ? WHERE compraId = ?';
			const { provId, fechaCompra, compraId } = data;
			db.query(query, [provId, fechaCompra, compraId], (err, result: any) => {
				if (result.affectedRows === 1) {
					resolve(`Se actualizó ${result.affectedRows} registro`);
				} else {
					throw err;
				}
			});
		});
	}

	static eliminar(data: { compraId: number }) {
		return new Promise((resolve, reject) => {
			try {
				const query = 'DELETE FROM compra WHERE compraId = ?';
				const { compraId } = data;
				db.query(query, [compraId], (err, result: any) => {
					if (result.affectedRows === 1) {
						resolve(`Se eliminó ${result.affectedRows} registro`);
					} else {
						throw err;
					}
				});
			} catch (err) {
				reject(err);
			}
		});
	}
}

export default Compra;

