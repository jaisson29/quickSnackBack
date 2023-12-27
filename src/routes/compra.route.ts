import express, { Request, Response } from 'express';
import CompraModel from '../models/compra.model';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

router.get('/getAll', async (req: Request, res: Response) => {
	try {
		const Compra = await CompraModel.getAll();
		res.json(Compra);
	} catch (error) {
		res.json(error);
	}
});

router.post('/create', verifyToken(process.env.SECRET_KEY), async () => {});

export default router;

