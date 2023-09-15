import express from 'express'
import verifyToken from '../middlewares/auth.js'
import TransacModel from '../models/transac.model.js'

const router = express.Router()

router.get('/getAll', async function (req, res) {
  TransacModel.getAll()
    .then(function (resultado) {
      res.json(resultado)
    })
    .catch(function (err) {
      res.json(err)
    })
})

router.post(
  '/create',
  verifyToken(process.env.SECRET_KEY),
  function (req, res) {
    res.json({
      mensaje: 'bien',
      secu: 'hola',
    })
  }
)

export default router
