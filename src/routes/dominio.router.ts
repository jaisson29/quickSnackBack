import DominioModel from '../models/dominio.model';
import express, { Request, Response } from 'express';
import { Dominio, SendError } from '../types';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

const router = express.Router();

//create endpoint
router.post('/crear', async (req: Request, res: Response) => {
	try {
		const cont: Dominio = req.body;
		const result: ResultSetHeader = await DominioModel.create(cont);
		res.status(201).json({ message: `Dominio con ID ${result.insertId} creado correctamente` });
	} catch (_error: any) {
		console.error(_error);
		const resError: SendError = {
			message: _error?.message || 'Ocurrió un error inesperado al crear el dominio',
			error: _error?.code,
		};
		return res.status(500).json(resError);
	}
});

// getAll endpoint
router.get('/getAll', async (req: Request, res: Response) => {
	try {
		const dominios: Dominio[] | RowDataPacket[] = await DominioModel.getAll();
		return res.status(200).json(dominios);
	} catch (_error: any) {
		console.error(_error);
		const resError: SendError = {
			message: 'Hubo un error obteniendo la informacion de los dominios',
			error: _error?.message,
		};
		return res.status(500).json(resError);
	}
});

// getOne endpoint
router.get('/getOne/:domId', async (req: Request, res: Response) => {
	try {
		const cont = req.params;
		const proveedor = await DominioModel.getOne(Number(cont.domId));
		if (!proveedor) res.status(404).json({ message: 'Dominio no encontrado' });
		res.status(200).json(proveedor[0]);
	} catch (_error: any) {
		console.error(_error);
		const resError: SendError = {
			message: 'Hubo un error obteniendo la informacion del dominio',
			error: _error?.message,
		};
		res.status(500).json(resError);
	}
});

// update endpoint
router.put('/actualizar', async (req: Request, res: Response) => {
	try {
		const cont: Dominio = req.body;
		const result = await DominioModel.update(cont);
		res.status(200).json({ message: `Se ha actializado ${result.affectedRows} dominio correctamente` });
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
router.delete('/eliminar/:domId', async (req: Request, res: Response) => {
	try {
		const cont: Dominio = req.params;
		const result = await DominioModel.delete(Number(cont.domId));
		res.status(200).json({ message: `${result.affectedRows} registro eliminado.` });
	} catch (_error: any) {
		console.error(_error);
		const resError = {
			message: _error?.message,
			error: _error?.name,
		};
		res.status(500).json(resError);
	}
});

export default router;

