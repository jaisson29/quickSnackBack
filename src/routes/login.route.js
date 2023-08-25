import express from 'express'

const router = express.Router()

router.use('/verify', async (req, res) => {
  res.json({ dasd: 'dasd' })
})

export default router
