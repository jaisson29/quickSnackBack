/** @format */

import express, { Request, Response } from 'express';
import { verifyToken } from '../middlewares/auth';
import TransacModel from '../models/transac.model';
import DetVenTaModel from '../models/detVenta.model';
import { Producto, SendError, Transaccion } from 'index';
import { ResultSetHeader } from 'mysql2';

const router = express.Router();

interface Venta {
	transacTipo: number;
	usuId: number;
	transacFecha: Date;
	det: Producto[];
}

//Endpoint para crear una transaccion
router.post('/crear', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	try {
		const cont: Venta = req.body;
		const { usuId, transacTipo, det } = cont;
		console.log(cont)
		if (!usuId || !transacTipo || !det) {
			throw new Error('Faltan datos');
		}
		const transacData: Venta = {
			usuId: usuId,
			transacTipo: transacTipo,
			transacFecha: new Date(Date.now()),
			det: det,
		};

		const transacResult = await TransacModel.create(transacData);

		const { insertId } = transacResult;

		await DetVenTaModel.create({ transacId: insertId, det });

		res.status(200).json({ message: `Transaccion realizada correctamente con ${det.length} productos}`, transacId: insertId });
	} catch (_error: any) {
		res.status(500).json({ message: 'Ocurrio un error al crear la transacción', error: _error.message });
	}
});

router.get('/getAll', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	try {
		const results = await TransacModel.getAll();
		res.status(200).json(results);
	} catch (_error: any) {
		const resError: SendError = {
			message: _error?.message || 'Ocurrió un error inesperado al obtener los datos',
			error: _error?.code,
		};
		res.status(500).json(resError);
	}
});

router.get('/getByUser/:usuId', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	try {
		const cont = req.params;
		const respuesta = await TransacModel.getByUser(Number(cont.usuId));
		if (respuesta.length === 0) {
			res.status(204).json(respuesta);
		} else {
			res.status(200).json(respuesta);
		}
	} catch (_error: any) {
		console.error(_error);
		res.status(500).json({ error: _error.message, mensaje: _error.name });
	}
});


export default router;
