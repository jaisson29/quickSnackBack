/** @format */
import express from 'express'
import cors from 'cors'
import ProductRoutes from './routes/product.route.ts'
import UserRoutes from './routes/user.route.ts'
import PaginaRoutes from './routes/pagina.route.ts'
import Autenticacion from './routes/autenticacion.route.ts'
import PerfilRoutes from './routes/perfil.route.ts'
import TransacRouter from './routes/transac.router.ts'
import CategoRouter from './routes/categoria.route.ts'
import CompraRoutes from './routes/compra.route.ts'
import DetVentaRouter from './routes/detVenta.router.ts'
import morgan from 'morgan'

//instancias
const app = express()

app.use('/uploads', express.static('uploads'))

app.use(morgan('dev'));

app.use(cors())
app.use(express.json())

app.use('/api/perfil/', PerfilRoutes)
app.use('/api/compra/', CompraRoutes)
app.use('/api/producto/', ProductRoutes)
app.use('/api/usuario/', UserRoutes)
app.use('/api/pagina/', PaginaRoutes)
app.use('/api/auth/', Autenticacion)
app.use('/api/transac/', TransacRouter)
app.use('/api/catego/', CategoRouter)
app.use('/api/detventa/', DetVentaRouter)

app.use((err, req, res, next) => {
	res.status(500).send({ message: 'Algo salió mal', codigo: 1005, error: err })
})

export default app
