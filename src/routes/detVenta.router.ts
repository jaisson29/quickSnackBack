/** @format */

import DetVentaModel from '../models/detVenta.model';
import express, { Request, Response } from 'express';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

//Obtener todas los detalles
router.get('/', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	try {
		const result: any = DetVentaModel.getAll();
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json({ error: 'Fallo en obtener los detalles', message: err });
	}
});

router.get('/:transacId', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	try {
		const cont: any = req.params;
		const result: any = await DetVentaModel.getAllXTrsId(cont);
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json({ error: 'Fallo en obtener los detalles', message: err });
	}
});

export default router;

