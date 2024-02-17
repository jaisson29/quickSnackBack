import ValorModel from '../models/valor.model';
import express, { Request, Response, Router } from 'express';
import { Valor, SendError } from '../types';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

const router = express.Router();

//create endpoint
router.post('/', async (req: Request, res: Response) => {
	try {
		const cont: Valor = req.body;
		const result: ResultSetHeader = await ValorModel.create(cont);
		if (!result.insertId) throw new Error('No se pudo crear el valor');
		res.status(201).json({ msg: `Valor con ID ${result.insertId} creado correctamente` });
	} catch (_error: any) {
		console.error(_error);
		const resError: SendError = {
			message: _error?.message || 'Ocurrió un error inesperado al crear el Valor',
			error: _error?.code,
		};
		return res.status(500).json(resError);
	}
});

// getAll endpoint
router.get('/', async (req: Request, res: Response) => {
	try {
		const Valores: Valor[] | RowDataPacket[] = await ValorModel.getAll();
		return res.status(200).json(Valores);
	} catch (_error: any) {
		console.error(_error);
		const resError: SendError = {
			message: 'Hubo un error obteniendo la informacion del Valor',
			error: _error?.message,
		};
		return res.status(500).json(resError);
	}
});

// getOne endpoint
router.get('/:valorId', async (req: Request, res: Response) => {
	try {
		const cont = req.params;
		const Valor = await ValorModel.getOne(Number(cont.valorId));
		if (!Valor) res.status(404).send('Valor no encontrado');
		res.status(200).json(Valor[0]);
	} catch (_error: any) {
		console.error(_error);
		const resError: SendError = {
			message: 'Hubo un error obteniendo la informacion del Valor',
			error: _error?.message,
		};
		res.status(500).json(resError);
	}
});

// update endpoint
router.put('/', async (req: Request, res: Response) => {
	try {
		const cont: Valor = req.body;
		const result = await ValorModel.update(cont);
		res.status(200).json({ message: `Se ha actializado ${result.affectedRows} Valor correctamente` });
	} catch (_error: any) {
		console.error(_error);
		const resError = {
			message: _error.message,
			error: _error.name,
		};
		res.status(500).json(resError);
	}
});

// delete endpoint
router.delete('/:valorId', async (req: Request, res: Response) => {
	try {
		const cont: Valor = req.params;
		const result = await ValorModel.delete(Number(cont.valorId));
		res.status(200).json({ message: `${result.affectedRows} registro eliminado.` });
	} catch (_error: any) {
		const resError = {
			message: _error?.message,
			error: _error?.name,
		};
		res.status(500).json(resError);
	}
});

export default router;

