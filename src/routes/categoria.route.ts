/** @format */

import express, { Request, Response } from 'express';
import Mcat from '../models/categoria.model';
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

router.post('/crear', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	try {
		const cont = req.body;
		const respuesta = await Mcat.create(cont);
		res.json(respuesta);
	} catch (_error: any) {
		res.json({
			code: 500,
			error: 'Fallo la creacion de la categoria',
			message: _error.message,
		});
	}
});
router.put('/actualizar', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	const cont = req.body;
	try {
		const update = await Mcat.update(cont);
		res.json(update);
	} catch (error) {
		res.json('Fallo la actualizacion de la categoria');
	}
});

router.delete('/eliminar/:catId', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
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
		const respuesta = await Mcat.getMxP();
		res.status(200).json(respuesta);
	} catch (error) {
		console.log(error);
		res.json(error);
	}
});

export default router;
