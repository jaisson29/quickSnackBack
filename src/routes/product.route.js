import express from 'express';
import ProductModel from '../models/product.model.js';
import verifyToken from '../middlewares/auth.js';

const router = express.Router();

router.get('/getAll', verifyToken(process.env.SECRET_KEY), async (req, res) => {
  try {
    const products = await ProductModel.getAllProducts();
    res.json(products);
  } catch (error) {
    res.json({ code: 500, error: 'Failed to load the products' });
  }
});

router.post(
  '/create',
  verifyToken(process.env.SECRET_KEY),
  async (req, res) => {
    const cont = req.body;
    try {
      const create = await ProductModel.createProduct(cont);

      res.json(create);
    } catch (error) {
      res.json({ code: 500, error: 'Failed to create a new product' });
    }
  }
);

router.put('/update', verifyToken(process.env.SECRET_KEY), async (req, res) => {
  const cont = req.body;
  try {
    const update = await ProductModel.updateProduct({
      prodId: cont.prodId,
      catId: cont.catId,
      prodName: cont.prodName,
      prodDescr: cont.prodDescr,
      prodImg: cont.prodImg,
      prodPurchVal: cont.prodPurchVal,
      prodSaleVal: cont.prodSaleVal,
    });

    res.json(update);
  } catch (error) {
    res.json('Failed to update the product');
  }
});

router.delete(
  '/delete',
  verifyToken(process.env.SECRET_KEY),
  async (req, res) => {
    const cont = req.body;
    try {
      const del = await ProductModel.deleteProduct({
        prodId: cont.prodId,
      });
      res.json(del);
    } catch (error) {
      res.json('Failed to delete the product');
    }
  }
);

export default router;
