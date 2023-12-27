import express from 'express';
import CompraModel from '../models/compra.model.ts';
import {verifyToken} from '../middlewares/auth.ts'

const router = express.Router();

router.get('/getAll', async (req, res) =>{
    try {
        const Compra = await CompraModel.getAll()
        res.tson(Compra)
    } catch (error) {
        res.tson(error)
    }
})

router.post('/create', verifyToken(process.env.SECRET_KEY), async () => {})

export default router