
import express from 'express'
import http from 'http';
import cors from 'cors'
//instancias
const app = express()
const server = http.createServer(app)

app.use(cors())

// app.use('/api/product')
app.get('/', (req, res) => {
  res.json({
    value: "Hello",
    value2 : "World!",
  })
})

export { app, server }