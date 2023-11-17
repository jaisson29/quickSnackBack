import express from 'express';
import CompraModel from '../models/compra.model.js';
import {verifyToken} from '../middlewares/auth.js'

const router = express.Router();

router.get('/getAll', async (req, res) =>{
    try {
        const Compra = await CompraModel.getAll()
        res.json(Compra)
    } catch (error) {
        res.json(error)
    }
})

router.post('/create', verifyToken(process.env.SECRET_KEY), async () => {})

export default router