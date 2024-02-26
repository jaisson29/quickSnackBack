import UserModel from '../models/user.model';
import { verifyToken } from '../middlewares/auth';
import { Usuario } from 'index';
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { upload } from '../utils/storage';

const router = express.Router();

router.get('/getAll', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	try {
		const users = await UserModel.getAll();
		res.status(200).json(users);
	} catch (_error: any) {
		res.status(400).json({
			error: 'Fallo en intentar obtener los usuarios',
			mesage: _error?.message,
		});
	}
});

router.post('/getOne', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	try {
		const cont: Usuario = req.body;
		const result = await UserModel.getOne(cont);
		if (result.length === 0) {
			res.status(500).json({ message: 'No se encontraron datos' });
		}
		res.status(200).json(result[0]);
	} catch (_error: any) {
		console.error(_error);
		res.status(500).json({ error: 'Fallo en intentar buscar al usuario', message: _error?.message });
	}
});

router.post(
	'/crear',
	verifyToken(process.env.SECRET_KEY),
	upload.single('usuImg'),
	async (req: Request, res: Response) => {
		try {
			const cont: Usuario = req.body;
			const imgPath: string =
				req.file?.originalname ?? (cont.usuGen === 1 ? 'icon-male-100-png' : 'icon-female-100.png');
			const hashedPass: string = await bcrypt.hash(cont?.usuContra!, 10);

			const usuData: Usuario = {
				...cont,
				usuContra: hashedPass,
				usuImg: imgPath,
			};

			const result = await UserModel.create(usuData);

			res.status(200).json({ message: 'Registro realizado exitosamente', id: result.insertId });
		} catch (_error: any) {
			console.error(_error);
			res.status(400).json({ error: _error.code, message: _error.message });
		}
	},
);

router.put('/actualizar', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	try {
		const cont = req.body;
		const respuesta = await UserModel.update(cont);
		res.status(200).json({
			message: 'Usuario actualizado correctamente',
			content: respuesta,
		});
	} catch (_error: any) {
		res.status(500).json({ error: 'No se pudo actualizar a el usuario', message: _error?.message });
	}
});
// http://localhost:5000/api/usuario/borrar/#
router.delete('/eliminar/:usuId', verifyToken(process.env.SECRET_KEY), async (req: Request, res: Response) => {
	try {
		const cont = req.params;
		const respuesta = await UserModel.delete(cont);
		res.status(200).json({
			message: 'Usuario eliminado',
			content: respuesta,
		});
	} catch (_error: any) {
		res.status(400).json({
			error: 'Error al eliminar al usuario',
			message: _error.message,
		});
	}
});

export default router;
