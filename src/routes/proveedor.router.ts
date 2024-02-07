import ProveedorModel from '../models/proveedor.model';
import express, { Request, Response } from 'express';
import { Proveedor } from '../types';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
	try {
		const cont: Proveedor = req.body;

	} catch (error) {
    console.error()
  }
});

router.get('/', (req: Request, res: Response) => {
	try {
	} catch (error) {}
});

export default router;

