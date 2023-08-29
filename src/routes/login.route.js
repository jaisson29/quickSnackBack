import express from 'express';
import UserModel from '../models/user.model.js';
import { generateToken, verifyToken } from '../utils/jwt.js';

const router = express.Router();

router.get('/verify', async (req, res) => {
  try {
    const head = req.headers.authorization;
    const verificado = await verifyToken(head);
    res.json(verificado);
  } catch (error) {
    res.json(error);
  }
});

router.post('/loguear', async (req, res) => {
  try {
    const cont = req.body;
    const usuario = await UserModel.getOneXEmailXContra({
      usuEmail: cont.usuEmail,
      usuContra: cont.usuContra,
    });
    const usuarioPlano = {
      usuTipoDoc: usuario[0].usuTipoDoc,
      usuGen: usuario[0].usuGen,
      usuNom: usuario[0].usuNom,
      usuEmail: usuario[0].usuEmail,
      usuContra: usuario[0].usuContra,
      usuImg: usuario[0].usuImg,
      perfilId: usuario[0].perfilId,
      usuFecha: usuario[0].usuFecha,
      usuPassCode: usuario[0].usuPassCode,
    };
    const usuToken = await generateToken(usuarioPlano);
    res.json(usuToken);
  } catch (error) {
    res.json({
      error: 'Fallo en retornar una respuesta',
      message: error,
    });
  }
});

export default router;
