/** @format */

import express, { Request, Response } from 'express';
import Mpef from '../models/perfil.model';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

router.get('/getAll', async (req: Request, res: Response) => {
	try {
		const perfiles = await Mpef.getAll();
		res.json(perfiles);
	} catch (error) {
		res.json(error);
	}
});

router.post('/crear', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	const cont = req.body;
	Mpef.create(cont)
		.then((create) => {
			res.json(create);
		})
		.catch((error) => {
			res.json({
				code: 500,
				error: 'Fallos la creacion del perfil',
				message: error,
			});
		});
});

router.put('/actualizar', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	const cont = req.body;
	try {
		const update = await Mpef.update(cont);
		res.json(update);
	} catch (error) {
		res.json('Fallo la actualizacion del perfil');
	}
});

router.post('/createPxP', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	const cont = req.body;
	Mpef.createPxP(cont)
		.then((create) => {
			res.json(create);
		})
		.catch((error) => {
			res.json({
				code: 500,
				error: 'Fallos la creacion de la relacion',
				message: error,
			});
		});
});

router.delete('/eliminar/:perfilId', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	const cont = req.params;
	try {
		const del = await Mpef.delPxP(cont?.perfilId);
		res.json(del);
	} catch (error) {
		res.json('Fallo al eliminar la relacion');
	}
});

router.get('/selPxp/:perfilId', async (req: Request, res: Response) => {
	const cont = req.params;
	try {
		const pagxper = await Mpef.selPxp(cont?.perfilId);
		res.json(pagxper);
	} catch (error) {
		res.json(error);
	}
});

export default router;
