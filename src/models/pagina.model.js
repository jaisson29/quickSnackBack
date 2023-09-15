import { db } from '../config/db.js';

export default class PaginaModel {
  static getPaginas() {
    return new Promise((resolve, reject) => {
      const sql =
        'SELECT paginaId, paginaNom, paginaIcon, paginaRuta ' + 'FROM pagina';

      db.query(sql, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static getOne(data) {
    return new Promise((resolve, reject) => {
      const sql =
        'SELECT paginaId, paginaNom, paginaIcon, paginaRuta ' +
        'FROM pagina ' +
        'WHERE paginaId = ?';
    });
  }
}
