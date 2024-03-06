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
	} catch (_error: any) {
		res.json({ error: 'Fallo la actualizacion del perfil', message: _error.message });
	}
});

router.post('/createPxP', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	try {
		const cont = req.body;
		await Mpef.delPxP(cont.perfilId);
		const result = await Mpef.createPxP(cont);
		res.json(result);
	} catch (error) {
		res.json({
			code: 500,
			error: 'Fallos la creacion de la relacion',
			message: error,
		});
	}
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

router.get('/selPxp', async (req: Request, res: Response) => {
	try {
		const pagxper = await Mpef.selPxp();
		res.json(pagxper);
	} catch (error) {
		res.json(error);
	}
});
router.get('/selPxp/:perfilId', async (req: Request, res: Response) => {
	try {
		const cont = req.params;
		const pagxper = await Mpef.selPxpId(cont.perfilId);
		res.json(pagxper);
	} catch (error) {
		res.json(error);
	}
});

export default router;
