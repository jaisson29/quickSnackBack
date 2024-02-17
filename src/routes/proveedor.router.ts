import ProveedorModel from '../models/proveedor.model';
import express, { Request, Response } from 'express';
import { Proveedor, SendError } from '../types';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

const router = express.Router();

//create endpoint
router.post('/', async (req: Request, res: Response) => {
	try {
		const cont: Proveedor = req.body;
		const result: ResultSetHeader = await ProveedorModel.create(cont);
		if (!result.insertId) throw new Error('No se pudo crear el proveedor');
		res.status(201).json({ message: `Proveedor con ID ${result.insertId} creado correctamente` });
	} catch (_error: any) {
		console.error(_error);
		const resError: SendError = {
			message: _error?.message || 'Ocurrió un error inesperado al crear el proveedor',
			error: _error?.code,
		};
		return res.status(500).json(resError);
	}
});

// getAll endpoint
router.get('/', async (req: Request, res: Response) => {
	try {
		const proveedores: Proveedor[] | RowDataPacket[] = await ProveedorModel.getAll();
		return res.status(200).json(proveedores);
	} catch (_error: any) {
		console.error(_error);
		const resError: SendError = {
			message: 'Hubo un error obteniendo la informacion del proveedor',
			error: _error?.message,
		};
		return res.status(500).json(resError);
	}
});

// getOne endpoint
router.get('/:provId', async (req: Request, res: Response) => {
	try {
		const cont = req.params;
		const proveedor = await ProveedorModel.getOne(Number(cont.provId));
		if (!proveedor) res.status(404).send('Proveedor no encontrado');
		res.status(200).json(proveedor[0]);
	} catch (_error: any) {
		console.error(_error);
		const resError: SendError = {
			message: 'Hubo un error obteniendo la informacion del proveedor',
			error: _error?.message,
		};
		res.status(500).json(resError);
	}
});

// update endpoint
router.put('/', async (req: Request, res: Response) => {
	try {
		const cont: Proveedor = req.body;
		const result = await ProveedorModel.update(cont);
		res.status(200).json({ message: `Se ha actializado ${result.affectedRows} proveedor correctamente` });
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
router.delete('/:provId', async (req: Request, res: Response) => {
	try {
		const cont: Proveedor = req.params;
		const result = await ProveedorModel.delete(Number(cont.provId));
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

