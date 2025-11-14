import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

// Parsear DATABASE_URL o usar variables individuales
let poolConfig

if (process.env.DATABASE_URL) {
  poolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  }
} else {
  poolConfig = {
    user: process.env.DB_USER || 'nom037_user',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'nom037',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 5432
  }
}

export const pool = new Pool(poolConfig)

// Verificar conexión
pool.on('connect', () => {
  console.log('Conectado a PostgreSQL')
})

pool.on('error', (err) => {
  console.error('Error inesperado en la conexión a PostgreSQL:', err)
  process.exit(-1)
})

// Función helper para ejecutar queries
export const query = async (text, params) => {
  const start = Date.now()
  try {
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('Query ejecutada', { text, duration, rows: res.rowCount })
    return res
  } catch (error) {
    console.error('Error en query:', { text, error: error.message })
    throw error
  }
}

