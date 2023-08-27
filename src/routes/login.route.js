import express from 'express';
import UserModel from '../models/user.model.js';
import { generateToken } from '../utils/jwt.js';

const router = express.Router();

router.use('/verify', async (req, res) => {
  res.json({ dasd: 'dasd' });
});

router.post('/loguear', async (req, res) => {
  try {
    const cont = req.body;
    const usuario = await UserModel.getOneXEmailXContra({
      usuEmail: cont.usuEmail,
      usuContra: cont.usuContra,
    });

    const usuarioPlano = {
      usuTipoDoc: usuario.usuTipoDoc,
      usuGen: usuario.usuGen,
      usuNom: usuario.usuNom,
      usuEmail: usuario.usuEmail,
      usuContra: usuario.usuContra,
      usuImg: usuario.usuImg,
      perfilId: usuario.perfilId,
      usuFecha: usuario.usuFecha,
      usuPassCode: usuario.usuPassCode,
    };
    const usuToken = await generateToken(usuarioPlano);
    console.log(usuToken);
    res.json(usuToken);
  } catch (error) {
    res.json({
      error: 'Fallo en retornar una respuesta',
      message: error,
    });
  }
});

export default router;
