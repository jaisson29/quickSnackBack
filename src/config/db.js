import mysql from 'mysql'

const dbConfig = {
  host: 'localhost',
  database: 'quickSnack',
  user: 'root',
  password: '',
}

const pool = mysql.createPool(dbConfig)

export { pool }
