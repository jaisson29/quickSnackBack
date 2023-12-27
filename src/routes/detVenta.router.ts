/** @format */

import DetVentaModel from '../models/detVenta.model';
import express, { Request, Response } from 'express';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

router.get('/', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	try {
		DetVentaModel.getAll()
			.then((rs) => {
				res.status(200).json(rs);
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	} catch (err) {
		res.status(500).json({ error: 'Fallo en obtener los detalles', message: err });
	}
});

router.get('/:transacId', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	try {
		DetVentaModel.getAll()
			.then((rs) => {
				res.status(200).json(rs);
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	} catch (err) {
		res.status(500).json({ error: 'Fallo en obtener los detalles', message: err });
	}
});

export default router;

