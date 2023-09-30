import express from 'express';
import PaginaModel from '../models/pagina.model.js';
import verifyToken from '../middlewares/auth.js';

const router = express.Router();

router.get('/getAll/:perfilId', async (req, res) => {
  try {
    const cont = req.params;
    const paginas = await PaginaModel.getAll(cont);
    res.json(paginas);
  } catch (error) {
    res.json(error);
  }
});

router.post('/create', verifyToken(process.env.SECRET_KEY), async () => {});

export default router;
