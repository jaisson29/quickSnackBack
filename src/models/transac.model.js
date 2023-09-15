import { db } from '../config/db.js'

class TransacModel {
  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM transaccion'

      db.query(sql, function (err, res) {
        if (err) {
          reject(
            new Error({
              message: 'Error al obtener las transacciones',
              status: 500,
              error: err,
            })
          )
        } else {
          resolve(res)
        }
      })
    })
  }

  static getByUser(data) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM transaccion WHERE usuId = ?'

      const { usuId } = data

      db.query(sql, [usuId], (err, respuesta) => {
        if (err) {
          reject(
            new Error({
              error: err,
              mensaje: 'Fallo en obtener datos del usuario',
            })
          )
        } else {
          resolve(respuesta)
        }
      })
    })
  }
}

export default TransacModel
