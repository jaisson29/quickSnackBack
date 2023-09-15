import { db } from '../config/db.js'

class Mpef {
  static getAllperfil() {
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

  static createperfil(data) {
    return new Promise((resolve, reject) => {
      try {
        const query =
          'INSERT INTO perfil ( perfilNom ) VALUES (?)'

        db.query(
          query,
          [
            data.perfilNom,
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

  static updatePerfil(data) {
    return new Promise((resolve, reject) => {
      try {
        const query =
          'UPDATE perfil' +
          ' ' +
          'SET perfilNom = ?' +
          ' ' +
          'WHERE perfilId = ?'
        db.query(
          query,
          [
            data.perfilId,
            data.perfilNom
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

  static deleteCategoria(data) {
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
}

export default Mpef
