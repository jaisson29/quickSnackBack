/** @format */

import express, { Request, Response } from 'express';
import ProductModel from '../models/product.model';
import { verifyToken } from '../middlewares/auth';
import { upload } from '../utils/storage';

const router = express.Router();

router.get('/getAll', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	try {
		const products = await ProductModel.getAll();
		res.json(products);
	} catch (error) {
		res.json({ code: 500, error: 'Failed to load the products' });
	}
});

router.get('/getAll/:catId', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	const cont = req.params;
	try {
		const respuesta = await ProductModel.getAllXCat(cont);
		res.status(200).json(respuesta);
	} catch (_error: any) {
		res.status(500).json({ error: _error?.message, mensaje: _error?.name });
	}
});

router.get('/getVenXProd', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	try {
		const respuesta = await ProductModel.getVenXProd();
		res.status(200).json(respuesta);
	} catch (_error: any) {
		res.json({ error: _error?.message, mensaje: _error?.name });
	}
});

router.post(
	'/crear',
	verifyToken(process.env.SECRET_KEY),
	upload.single('prodImg'),
	async (req: Request, res: Response) => {
		const cont = req.body;
		const imgPath = req.file ? req.file.filename : 'default-img.webp';
		const prodData = {
			...cont,
			prodImg: imgPath,
		};
		try {
			const respuesta = await ProductModel.create(prodData);
			res.json(respuesta);
		} catch (_error: any) {
			res.json({
				code: 500,
				error: 'Failed to create a new product',
				message: _error?.message,
			});
		}
	},
);

router.put(
	'/actualizar',
	verifyToken(process.env.SECRET_KEY),
	upload.single('prodImg'),
	async (req: Request, res: Response) => {
		const cont = req.body;
		const imgPath = req.file ? req.file.filename : cont.prodImg;
		const newProdData = {
			...cont,

			prodImg: imgPath,
		};
		try {
			const update = await ProductModel.update(newProdData);

			res.json(update);
		} catch (error) {
			res.json('Fallo en actualizar el registro');
		}
	},
);

router.delete('/eliminar/:prodId', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	const cont = req.params;
	try {
		const del = await ProductModel.delete({
			prodId: cont.prodId,
		});
		res.status(200).json(del);
	} catch (error) {
		res.json('Failed to delete the product');
	}
});

export default router;
