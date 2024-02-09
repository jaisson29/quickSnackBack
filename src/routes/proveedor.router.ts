import ProveedorModel from '../models/proveedor.model';
import express, { Request, Response } from 'express';
import { Proveedor, SendError } from '../types';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
	try {
		const cont: Proveedor = req.body;
		const result: ResultSetHeader  & RowDataPacket[] = await ProveedorModel.create(cont);
		if (!result[0].insertId) throw new Error('No se pudo crear el proveedor');
		res.status(201).json({ msg: `Proveedor con ID ${result[0].insertId} creado correctamente` });
	} catch (_error: any) {
		console.error(_error);
		const resError: SendError = {
			message: 'No se pudo crear el proveedor, intentelo de nuevo',
			error: _error?.message,
		};
		return res.status(500).json(resError);
	}
});

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

router.get('/:provId', async (req: Request, res: Response) => {
	try {
		const cont = req.params;
		const proveedor = await ProveedorModel.getOne(parseInt(cont.provId));
		if (!proveedor) res.status(404).send('Proveedor no encontrado');
		res.status(200).json(proveedor);
	} catch (_error: any) {
		console.error(_error);
		const resError: SendError = {
			message: 'Hubo un error obteniendo la informacion del proveedor',
			error: _error?.message,
		};
		res.status(500).json(resError);
	}
});

router.put('/', (req: Request, res: Response) => {
	try {
	} catch (error) {}
});

router.delete('/', (req: Request, res: Response) => {
	try {
	} catch (error) {}
});

export default router;

