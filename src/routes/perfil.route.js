import express from "express";
import Mpef from "../models/perfil.model.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router();

router.get('/getAll', async (req, res)  =>{
    try{
        const perfiles = await Mpef.getAll();
        res.json(perfiles);
    }catch(error){
        res.json(error);
    }

})

router.post('/create', verifyToken(process.env.SECRECT_KEY), async () => {});

export default router;