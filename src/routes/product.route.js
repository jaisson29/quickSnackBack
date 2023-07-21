import express from 'express'
import ProductModel from '../models/product.model.js'

const router = express.Router()

router.get('/products', async (req, res) =>{
  try {
    const products = await ProductModel.getAllProducts()
    res.json(products)
  } catch (error) {
    console.log(error);
    res.json({error : 'Failed to load the products'})
  }
})

router.post('/product', async (req, res) =>{
  const cont = req.body
  console.log(cont);
  try {
    const create = await ProductModel.createProduct({
      catId : cont.catId,
      prodName : cont.prodName,
      prodDescr: cont.prodDescr,
      prodImg: cont.prodImg,
      prodPurchVal: cont.prodPurchVal,
      prodSaleVal: cont.prodSaleVal
    })

    res.json(create)
  } catch (error) {
    console.log(error);
    res.json({error:'Failed to create a new product'})
  } 
})

export default router