import 'dotenv/config'
import app from './src/app.js'

app.set('port', process.env.PORT)

app.listen(app.get('port'))
console.log(`server run in http://localhost:${app.get('port')}`)
