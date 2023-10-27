import { db } from '../config/db.js'

class Mpef {
  static getAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM perfil'

      db.query(query, (err, results) => {
        if (err) {
          reject(err)
        } else {
          console.log(results)
          resolve(results)
        }
      })
    })
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      try {
        const sql =
          'INSERT INTO perfil ( perfilNom, paginaRuta) VALUES (?,?)'

        db.query(
          sql,
          [
            data.perfilNom,
            data.paginaRuta,
          ],
          (err, result) => {
            if (result.affectedRows === 1) {
              resolve(result)
            } else {
              reject(new Error(err))
            }
          }
        )
      } catch (err) {
        reject(err)
      }
    })
  }

  static update(data) {
    return new Promise((resolve, reject) => {
      try {
        const query =
          'UPDATE perfil' +
          ' ' +
          'SET perfilNom = ?, paginaRuta = ?' +
          ' ' +
          'WHERE perfilId = ?'
        db.query(
          query,
          [
            data.perfilNom,
            data.paginaRuta,
            data.perfilId
            
          ],
          (err, result) => {
            if (result.affectedRows == 1) {
              console.log(result)
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

  static delete(data) {
    return new Promise((resolve, reject) => {
      try {
        const query = 'DELETE FROM perfil WHERE perfilId = ?'

        db.query(query, [data.perfilId], (err, result) => {
          console.log(result);
          if (result.affectedRows == 1) {
            console.log(result)
            resolve(`Se elimino ${result.affectedRows} registro`)
          } else {
            reject(new Error(err))
          }
        })
      } catch (error) {
        reject(new Error(error))
      }
    })
  }

  static getPag(){
    return new Promise((resolve, reject) => {
      const sql =
      'SELECT paginaId, paginaNom, paginaIcon FROM pagina';

      db.query(sql, (error, result) => {
        if(error){
          reject(error);
        }else{
          resolve(results);
        }
      })
    })
  }

  static createPxP(data){
    return new Promise((resolve, reject) =>{
      try{
        const sql =
        'INSERT INTO perxpag(paginaId,perfilId) VALUES (?,?)'
        db.query(
          sql,
          [
            data.paginaId,
            data.PerfilId,
          ],
          (err, result) =>{
            if(result.affectedRows === 1){
              resolve(result)
            }else{
              reject(new Error(err))
            }
          }
        )
      }catch (error){
        reject(new Error(err))
      }
    })
  }

  static delPxP(data){
    return new Promise((resolve, reject) =>{
      try{
        const sql = 'DELETE FROM perxpag WHERE perfilId = ?';

        db.query(sql, [data.PerfilId], (err, result) =>{
          if(result.affectedRows == 1){
            resolve(`Se elimino ${result.affectedRows} registro`)
          }else{
            reject(new Error(err))
          }
        })
      }catch(error){
        reject(new Error(error))
      }
    })
  }

  static selPxp(){
    return new Promise((resolve, reject) => {
      const sql =
      'SELECT paginaId FROM perxpag WHERE perfilId = ?';

      db.query(sql, (error, result) => {
        if(error){
          reject(error);
        }else{
          resolve(results);
        }
      })
    })
  }

}

export default Mpef
