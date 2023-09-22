import express from 'express'
import Mcat from '../models/mcat.js'
import verifyToken from '../middlewares/auth.js'

const router = express.Router()

router.get('/getAll',verifyToken(process.env.SECRET_KEY), async (req, res) => {
  try {
    const Categorias = await Mcat.getAll()
    res.json(Categorias)
  } catch (error) {
    res.json(error)
  }
})


router.post('/create', verifyToken(process.env.SECRET_KEY), async (req, res) => {
    
});

export default router
