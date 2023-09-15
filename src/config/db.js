import mysql from 'mysql'

const dbConfig = {
  host: 'localhost',
  database: 'quicksnack',
  user: 'root',
  password: '',
}

const db = mysql.createPool(dbConfig)

export { db }
