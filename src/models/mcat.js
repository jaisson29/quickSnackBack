import { db } from '../config/db.js'

class Mcat {
  static getAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM categoria'

      db.query(query, (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  }

  static create(data) {
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

  static update(data) {
    return new Promise((resolve, reject) => {
      try {
        const query =
          'UPDATE categoria' +
          ' ' +
          'SET catNom = ?' +
          ' ' +
          'WHERE catId = ?'
        db.query(
          query,
          [
            data.catNom,
            data.catId
          ],
          (err, result) => {
            if (result.affectedRows == 1) {
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
        const query = 'DELETE FROM categoria WHERE catId = ?'

        db.query(query, [data.catId], (err, result) => {
          if (result.affectedRows == 1) {
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

  static getMxP(){
    return new Promise((resolve, reject) => {
        const query = 'SELECT catId, COUNT(catId) as can FROM producto group by catId'
        db.query(query, (err, results) => {
          console.log(err,query, results)
          if (err) {
            reject(err)
          } else {
            resolve(results)
          }
        })
    })
  }
}

export default Mcat
