import { db } from '../config/db.js'

class Mcat {
  static getAllcategoria() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM categoria'

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

  static createCategoria(data) {
    return new Promise((resolve, reject) => {
      try {
        const query =
          'INSERT INTO categoria ( catNom) VALUES (?)'

        db.query(
          query,
          [
            data.catNom,
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

  static updateCategoria(data) {
    return new Promise((resolve, reject) => {
      try {
        const query =
          'UPDATE Categoria' +
          ' ' +
          'SET catNom = ?' +
          ' ' +
          'WHERE catId = ?'
        db.query(
          query,
          [
            data.catId,
            data.prodNom
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
        const query = 'DELETE FROM categoria WHERE catId = ?'

        db.query(query, [data.prodId], (err, result) => {
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

export default Mcat
