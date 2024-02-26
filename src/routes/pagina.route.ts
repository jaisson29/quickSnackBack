/** @format */

import express, { Request, Response } from 'express';
import PaginaModel from '../models/pagina.model';
import { verifyToken } from '../middlewares/auth';
import { Perfil } from 'index';

const router = express.Router();

router.get('/getAll', async (req: Request, res: Response) => {
	try {
		const cont = req.params;
		const paginas = await PaginaModel.getAll(cont);
		res.json(paginas);
	} catch (error) {
		res.json(error);
	}
});

router.post('/create', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	try {
		const cont = req.body;
		const resultado = await PaginaModel.create(cont);
		res.json(resultado);
	} catch (_error: any) {
		res.json({
			code: 500,
			error: 'Fallo la creacion de la pagina',
			message: _error?.message,
		});
	}
});

router.put('/update', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	const cont = req.body;
	try {
		const update = await PaginaModel.update(cont);
		res.json(update);
	} catch (error) {
		res.json('Fallo la actualizacion de la pagina');
	}
});

router.delete('/delete/:paginaId', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	const cont = req.params;
	try {
		const resultado = await PaginaModel.delete({
			paginaId: cont.paginaId,
		});
		res.json(resultado);
	} catch (_error: any) {
		res.json({ error: 'Fallo al eliminar la pagina', message: _error?.message });
	}
});

router.get('/getpagxpef', async (req: Request, res: Response) => {
	try {
		const resultado = await PaginaModel.getPagxpef();
		res.status(200).json(resultado);
	} catch (_error: any) {
		res.json({ error: 'No se encontraron datos', message: _error?.message });
	}
});

router.get('/getAll/:perfilId', async (req: Request, res: Response) => {
	try {
		const perfilId = Number(req?.params?.perfilId);
		const paginas = await PaginaModel.getPefPag(perfilId);
		res.json(paginas);
	} catch (error) {
		res.json(error);
	}
});
export default router;
