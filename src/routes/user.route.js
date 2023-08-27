import express from 'express';
import UserModel from '../models/user.model.js';
import verifyToken from '../middlewares/auth.js';

const router = express.Router();

router.get('/getAll', async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.json({ error: 'Failed to obtain the users', mmesage: error });
  }
});

router.post('/getOne', async (req, res) => {
  const cont = req.body;
  try {
    const user = await UserModel.getOneXEmailXContra({
      usuEmail: cont.usuEmail,
      usuContra: cont.usuContra,
    });
    res.json({ ...user });
  } catch (error) {
    res.json({ error: 'Failed to obtain the user', message: error });
  }
});

export default router;
