import express from 'express';
import verifyToken from '../middlewares/auth.js';
import TransacModel from '../models/transac.model.js';

const router = express.Router();

router.get('/getAll', async function (req, res) {
  TransacModel.getAll()
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (err) {
      if (err.error) {
        // Acceder al mensaje de error
        console.error('Mensaje de error: ' + err.error);
        res.status(500).json({ mensaje: err.error });
      } else {
        console.error('Error desconocido:', err);
        res.status(500).json({ mensaje: 'Error desconocido' });
      }
    });
});

router.post(
  '/create',
  verifyToken(process.env.SECRET_KEY),
  function (req, res) {
    const cont = req.body;

    let transacData = {
      ...cont,
      transacFecha: new Date(),
    };

    TransacModel.create(transacData)
      .then((res) => {
        res.json(res);
      })
      .catch((err) => {
        res.send(err);
      });
  }
);

export default router;
