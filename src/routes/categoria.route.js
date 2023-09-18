import express from "express";
import Mcat from "../models/mcat.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();

router.get('/getAll', async (req, res)  =>{
    try{
        const Categorias = await Mcat.getAll();
        res.json(Categorias);
    }catch(error){
        res.json(error);
    }

})

router.post('/create', verifyToken(process.env.SECRECT_KEY), async () => {});

export default router;