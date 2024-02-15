"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
class PaginaModel {
    static getAll(data) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT pg.paginaId, pg.paginaNom, pg.paginaIcon, pg.paginaRuta, pxp.perfilId ' +
                'FROM pagina pg ' +
                'INNER JOIN perxpag pxp ' +
                'ON pg.paginaId = pxp.paginaId ' +
                'WHERE perfilId = ?';
            db_1.db.query(sql, [data.perfilId], (error, results) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(results);
                }
            });
        });
    }
    static getOne(data) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT paginaId, paginaNom, paginaIcon, paginaRuta ' + 'FROM pagina ' + 'WHERE paginaId = ?';
        });
    }
}
exports.default = PaginaModel;
//# sourceMappingURL=pagina.model.js.map