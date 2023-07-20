import { pool } from '../config/db.js'

class ProductModel {
  static getAllProducts() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM product'

      pool.query(query, (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  }

  static createProduct(productData) {
    return new Promise(async (resolve, reject) => {
      try {
        const query =
          'INSERT INTO product (catId, prodName, productDescr, productImg, prodPurchVal, prodSaleVal) VALUES (?, ?, ?, ?, ?, ?)'
        const {
          catId,
          prodName,
          productDescr,
          productImg,
          prodPurchVal,
          prodSaleVal,
        } = productData

        pool.query(
          query,
          [
            catId,
            prodName,
            productDescr,
            productImg,
            prodPurchVal,
            prodSaleVal,
          ],
          (err, result) => {
            if (result.affectedRows === 1) {
              resolve(result.insertId)
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
}

const productData = {
  catId: 1, // ID de la categoría a la que pertenece el producto
  prodName: 'Producto de prueba',
  productDescr: 'Descripción del producto de prueba',
  productImg: 'imagen-del-producto.jpg',
  prodPurchVal: 1000, // Valor de compra del producto
  prodSaleVal: 1500, // Valor de venta del producto
}

ProductModel.createProduct(productData)
  .then((productId) => {
    console.log(`Producto creado con ID: ${productId}`)
  })
  .catch((err) => {
    console.error(err)
  })

ProductModel.getAllProducts()
  .then((products) => {
    console.log(products)
  })
  .catch((err) => {
    console.error(err)
  })
