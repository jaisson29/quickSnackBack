import { db } from '../config/db.ts';

export default class PaginaModel {
  static getAll(data) {
    return new Promise((resolve, reject) => {
      const sql =
        'SELECT pg.paginaId, pg.paginaNom, pg.paginaIcon, pg.paginaRuta, pxp.perfilId ' +
        'FROM pagina pg ' +
        'INNER JOIN perxpag pxp ' +
        'ON pg.paginaId = pxp.paginaId ' +
        'WHERE perfilId = ?';

      db.query(sql, [data.perfilId], (error, results) => {
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
