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

router.post('/create', verifyToken(process.env.SECRECT_KEY), async () => {});

export default router;

