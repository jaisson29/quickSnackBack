import express from 'express'
import UserModel from "../models/user.model.js";
import verifyToken from '../middlewares/auth.js'

const router = express.Router()

router.get('/getAll', async (req, res) => {
  try {
    const users = await UserModel.getAllUsers()
    res.json(users)
  } catch (error) {
    res.json({error: 'Failed to obtain the users', mmesage: error})
  }
})

export default router