import { app, server } from './src/app.js'
import 'dotenv/config'

app.set('port', process.env.PORT)

console.log(`server run in http://localhost:${app.get('port')}`);
server.listen(app.get('port'))
