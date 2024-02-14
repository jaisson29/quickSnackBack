/** @format */

import express, { Request, Response } from 'express';
import { verifyToken } from '../middlewares/auth';
import TransacModel from '../models/transac.model';
import DetVenTaModel from '../models/detVenta.model';
import { SendError, Transaccion } from 'index';
import { ResultSetHeader } from 'mysql2';

const router = express.Router();

//Endpoint para crear una transaccion
router.post('/', verifyToken(process.env.SECRET_KEY), function (req: Request, res: Response) {
	try{

	}catch(_error:any){
		res.status(500).json({message: "Ocurrio un error al crear la transacción"})
	}
	const { usuId, transacTipo, det } = req.body;
	TransacModel.create({ usuId, transacTipo, transacFecha: new Date() })
		.then((result: any) => {
			console.log('1', result);
			const { insertId } = result;
			DetVenTaModel.create({ transacId: insertId, det })
				.then((result) => {
					console.log('2', result);
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

router.post('/', async (req: Request, res: Response) => {
	try {
		const cont: Transaccion = req.body;
		cont.transacFecha = new Date(Date.now());
		const result: ResultSetHeader = await TransacModel.create(cont);
		if (!result.insertId) throw new Error('No se pudo crear el proveedor');
		res.status(201).json({ message: `Transaccion con ID ${result.insertId} creado correctamente` });
	} catch (_error: any) {
		console.error(_error);
		const resError: SendError = {
			message: _error?.message || 'Ocurrió un error inesperado al crear el proveedor',
			error: _error?.code,
		};
		return res.status(500).json(resError);
	}
});

router.get('/getAll', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	try {
		const results = await TransacModel.getAll();
		res.status(200).json(results);
	} catch (_error) {
		console.error(_error);
		const resError: SendError = {
			message: _error?.message || 'Ocurrió un error inesperado al obtener los datos',
			error: _error?.code,
		};
		res.status(500).json(resError);
	}
});

router.get('/getByUser/:usuId', verifyToken(process.env.SECRET_KEY), (req: Request, res: Response) => {
	const cont = req.params;
	TransacModel.getByUser(Number(cont.usuId))
		.then((respuesta: any) => {
			if (respuesta.length === 0) {
				res.status(204).json(respuesta);
			} else {
				res.status(200).json(respuesta);
			}
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({ error: err.message, mensaje: err.name, codigo: err.cod });
		});
});


export default router;

