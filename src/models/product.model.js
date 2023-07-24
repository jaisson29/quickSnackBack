import { db } from '../config/db.js'

class ProductModel {
  static getAllProducts() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM product'

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

  static createProduct(data) {
    return new Promise((resolve, reject) => {
      try {
        const query =
          'INSERT INTO product (catId, prodName, prodDescr, prodImg, prodPurchVal, prodSaleVal) VALUES (?, ?, ?, ?, ?, ?)'

        db.query(
          query,
          [
            data.catId,
            data.prodName,
            data.prodDescr,
            data.prodImg,
            data.prodPurchVal,
            data.prodSaleVal,
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

  static updateProduct(data) {
    return new Promise((resolve, reject) => {
      try {
        const query =
          'UPDATE product' +
          ' ' +
          'SET catId = ?, prodName = ?, prodDescr = ?, prodImg = ?, prodPurchVal = ?, prodSaleVal = ?' +
          ' ' +
          'WHERE prodId = ?'
        db.query(
          query,
          [
            data.catId,
            data.prodName,
            data.prodDescr,
            data.prodImg,
            data.prodPurchVal,
            data.prodSaleVal,
            data.prodId,
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

  static deleteProduct(data) {
    return new Promise((resolve, reject) => {
      try {
        const query = 'DELETE FROM product WHERE prodId = ?'

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

export default ProductModel
