import express from 'express';
import verifyToken from '../middlewares/auth.js';
import TransacModel from '../models/transac.model.js';

const router = express.Router();

router.get(
  '/getAll',
  verifyToken(process.env.SECRET_KEY),
  async function (req, res) {
    TransacModel.getAll()
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (err) {
        res
          .status(500)
          .json({ error: err.message, mensaje: err.name, codigo: err.cod });
      });
  }
);

router.get(
  '/getByUser/:usuId',
  verifyToken(process.env.SECRET_KEY),
  (req, res) => {
    const cont = req.params;
    TransacModel.getByUser(cont)
      .then((respuesta) => {
        res.status(200).json(respuesta);
      })
      .catch((err) => {
        res
          .status(err.codigo)
          .json({ error: err.message, mensaje: err.name, codigo: err.cod });
      });
  }
);

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
