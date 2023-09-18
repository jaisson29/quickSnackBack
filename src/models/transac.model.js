import { db, query } from '../config/db.js';

class TransacModel {
  static getAll() {
    return new Promise((resolve, reject) => {
      const sql =
        'SELECT ts.transacId, ts.transacFecha, ts.transacCant, usu.usuId, usu.usuNom ' +
        'FROM transaccion ts ' +
        'INNER JOIN usuario usu ' +
        'ON ts.usuId = usu.usuId';

      db.query(sql, function (err, res) {
        if (err) {
          reject(new Error(err));
        } else if (res.length === 0) {
          reject(new Error('No se encontraron resultados'));
        } else {
          resolve(res);
        }
      });
    });
  }

  static getByUser(data) {
    return new Promise((resolve, reject) => {
      const sql =
        'SELECT ts.transacId, ts.transacFecha, ts.transacCant, ts.usuId, usu.usuNom ' +
        'FROM transaccion ts ' +
        'INNER JOIN usuario usu ' +
        'ON ts.usuId = usu.usuId ' +
        'WHERE usuId = ?';

      const { usuId } = data;

      db.query(sql, [usuId], (err, respuesta) => {
        if (err) {
          reject(
            new Error({
              error: err,
              mensaje: 'Fallo en obtener datos del usuario',
            })
          );
        } else {
          resolve(respuesta);
        }
      });
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      const sql =
        'INSERT INTO transaccion(transacFecha, transacCant, usuId) ' +
        'VALUES(?, ?, ?)';
      const { transacFecha, transacCant, usuId } = data;

      query(sql, [transacFecha, transacCant, usuId])
        .then((resultado) => {
          resolve(resultado);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default TransacModel;
