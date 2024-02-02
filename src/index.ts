import 'dotenv/config'
import app from './src/app'


app.set('port', process.env.APP_PORT)

app.listen(app.get('port'))
console.log(`server run in http://localhost:${app.get('port')}`)
