import express from 'express';
import UserModel from '../models/user.model.js';
import { generateToken, verifyToken } from '../utils/jwt.js';

const router = express.Router();

router.get('/verify', async (req, res) => {
  try {
    const head = req.headers.authorization;
    const verificado = await verifyToken(head);
    console.log(verificado);
    res.json(verificado);
  } catch (error) {
    res.json(error);
  }
});

router.post('/loguear', async (req, res) => {
  const cont = req.body;
  try {
    const usuario = await UserModel.getOneXEmailXContra({
      usuEmail: cont.usuEmail,
      usuContra: cont.usuContra,
    });
    if (usuario.length !== 0) {
      const usuToken = await generateToken(usuario);
      res.status(200).json(usuToken);
    } else {
      res.status(401).json({
        error: 'No existe un usuario con las credenciales',
        message: error,
      });
    }
  } catch (error) {
    res.status(401).json({
      error: 'No existe un usuario con las credenciales enviadas',
      message: error,
    });
  }
});

router.post('/crearUsu', async (req, res) => {
  try {
    const cont = req.body;
    const usuario = await UserModel.createUser({
      ...cont,
      usuIngreso: new Date(),
      perfilId: 2,
    });
    res
      .status(200)
      .json({ response: usuario, message: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(401).json({
      error: 'Faltan credenciales para crear al ususario',
      message: error,
    });
  }
});

export default router;
