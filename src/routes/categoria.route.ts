/** @format */

import express, { Request, Response } from 'express';
import Mcat from '../models/mcat';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

router.get('/getAll', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	try {
		const categorias = await Mcat.getAll();
		res.json(categorias);
	} catch (error) {
		res.json(error);
	}
});

router.post('/create', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	const cont = req.body;
	Mcat.create(cont)
		.then((create) => {
			res.json(create);
		})
		.catch((error) => {
			res.json({
				code: 500,
				error: 'Fallo la creacion de la categoria',
				message: error,
			});
		});
});
router.put('/update', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	const cont = req.body;
	try {
		const update = await Mcat.update(cont);
		res.json(update);
	} catch (error) {
		res.json('Fallo la actualizacion de la categoria');
	}
});

router.delete('/delete/:catId', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	const cont = req.params;
	try {
		const del = await Mcat.delete({
			catId: cont.catId,
		});
		res.json(del);
	} catch (error) {
		res.json('Fallo al eliminar la categoria');
	}
});

router.get('/getmxp', async (req: Request, res: Response) => {
	try {
		Mcat.getMxP().then((result) => {
			res.status(200).json(result);
		});
	} catch (error) {
		console.log(error);
		res.json(error);
	}
});
export default router;

