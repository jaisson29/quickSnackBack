import { app, server } from './index.js'

app.set('port', process.env.PORT || 5000)

console.log(`server run in http://localhost:${app.get('port')}`);
server.listen(app.get('port'))