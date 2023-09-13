import express from 'express';
import ProductModel from '../models/product.model.js';
import verifyToken from '../middlewares/auth.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

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
  upload.single('prodImg'),
  async (req, res) => {
    const cont = req.body;
    const imgPath = req.file.originalname;
    const prodData = {
      ...cont,
      prodImg: imgPath,
    };
    try {
      const create = await ProductModel.createProduct(prodData);

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
  '/delete/:prodId',
  verifyToken(process.env.SECRET_KEY),
  async (req, res) => {
    const cont = req.params;
    console.log(cont);
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
