import express, { Request, Response } from 'express';
import CompraModel from '../models/compra.model';
import { verifyToken } from '../middlewares/auth';
import { Compra, DetCompra } from 'index';
import DetCompraModel from '../models/detCompra.model';

const router = express.Router();

type CompraFact = Compra & { det: DetCompra[] };

router.get('/getAll', async (req: Request, res: Response) => {
	try {
		const Compra = await CompraModel.getAll();
		res.json(Compra);
	} catch (error) {
		res.json(error);
	}
});

router.post('/crear', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	try {
		const cont: CompraFact = req.body;
		const { provId, det } = cont;
		if (!provId || !det) {
			throw new Error('Faltan datos');
		}
		const transacData: CompraFact = {
			provId: provId,
			fechaCompra: new Date(Date.now()),
			det: det,
		};

		const transacResult = await CompraModel.create(transacData);

		const { insertId } = transacResult;

		await DetCompraModel.create({ compraId: insertId, det });

		res
			.status(200)
			.json({ message: `Transaccion realizada correctamente con ${det.length} productos}`, transacId: insertId });
	} catch (_error: any) {
		res.status(500).json({ message: 'Ocurrio un error al crear la transacción', error: _error.message });
	}
});

export default router;
