import { db } from '../config/db.js';

class PaginaModel {
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

  static create(data){
    return new Promise((resolve, reject)=>{
      try{
        const sql = 
        'INSERT INTO pagina (paginaNom, paginaIcon, paginaRuta) VALUES(?)'

        db.sql(
          sql,
          [
            data.paginaNom,
            data.paginaIcon,
            data.paginaRuta,
          ],
          (err, result) => {
            if(result.affectedRows === 1){
              resolve(result)
            }else{
              reject(new Error(err))
            }
          }
        )
      } catch(err){
        reject(err)
      }
    })
  }

  static update(data){
    return new Promise((resolve, reject) =>{
      try{
        const sql = 
        'UPDATE pagina' + 
        ' ' +
        'SET paginaNom = ?, paginaIcon = ?, paginaRuta = ?' +
        ' ' +
        'WHERE paginaId = ?'
        db.sql(
          query,
          [
            data.paginaNom,
            data.paginaIcon,
            data.paginaRuta,
            data.paginaId
          ],
          (err, result) =>{
            if(result.affectedRows == 1){
              resolve(`Se actualizo ${result.affectedRows} registro`)
            } else {
              reject(new Error(err))
            }
          }
        )
      } catch (error) {
        reject(error)
      }
    })
  }

  static delete(data){
    return new Promise((resolve, reject) =>{
      try{
        const sql = 'DELETE FROM pagina WHERE paginaId = ?'

        db.sql(sql, [data.paginaId], (err, result)  =>{
          if(result.affectedRows == 1 ){
            resolve(`Se elimino ${result.affectedRows} registro`)
          }else {
            reject(new Error(err))
          }
        })
      }catch(error){
        reject(new Error(error))
      }
    })
  }
}

export default PaginaModel
