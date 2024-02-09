/** @format */

import express, { Request, Response } from 'express';
import { verifyToken } from '../middlewares/auth';
import TransacModel from '../models/transac.model';
import DetVenTaModel from '../models/detVenta.model';

const router = express.Router();

router.get('/getAll', verifyToken(process.env.SECRET_KEY), function (req: Request, res: Response) {
	TransacModel.getAll()
		.then(function (resultado) {
			res.json(resultado);
		})
		.catch(function (err) {
			res.status(500).json({ error: err.message, mensaje: err.name, codigo: err.cod });
		});
});

router.get('/getByUser/:usuId', verifyToken(process.env.SECRET_KEY), (req: Request, res: Response) => {
	const cont = req.params;
	TransacModel.getByUser(Number(cont.usuId))
		.then((respuesta: any) => {
			res.status(200).json(respuesta);
		})
		.catch((err) => {
			res.status(500).json({ error: err.message, mensaje: err.name, codigo: err.cod });
		});
});

//Endpoint para crear una transaccion
router.post('/', verifyToken(process.env.SECRET_KEY), function (req: Request, res: Response) {
	const { usuId, transacTipo, det } = req.body;
	TransacModel.create({ usuId, transacTipo, transacFecha: new Date() })
		.then((result: any) => {
			console.log("1",result)
			const { insertId } = result;
			DetVenTaModel.create({ transacId: insertId, det })
				.then((result) => {
					console.log("2",result)
					res.status(200).json(result);
				})
				.catch((err) => {
					res.status(500).json({ error: 'Fallo en la creacion del detalle', message: err.message });
				});
		})
		.catch((err) => {
			res.json(err);
		});
});

export default router;

