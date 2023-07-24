import express from 'express'
import cors from 'cors'
import ProductRoutes from './routes/product.route.js'
import UserRoutes from './routes/user.route.js'

//instancias
const app = express()

app.use(cors())

app.use(express.json())
// app.use('/api/product')
app.get('/', (req, res) => {
  res.json({
    value: 'Hello',
    value2: 'World!',
  })
})

app.use('/api/product/', ProductRoutes)
app.use('/api/user/', UserRoutes)

export default app
