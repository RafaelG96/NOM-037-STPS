import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { pool } from './db/connection.js'
import { responsesRouter } from './routes/responses.js'
import { photosRouter } from './routes/photos.js'
import { questionnairesRouter } from './routes/questionnaires.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Servir archivos estáticos (fotografías)
app.use('/uploads', express.static(join(__dirname, '../uploads')))

// Rutas
app.use('/api/responses', responsesRouter)
app.use('/api/photos', photosRouter)
app.use('/api/questionnaires', questionnairesRouter)

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.json({ 
      status: 'ok', 
      database: 'connected',
      timestamp: result.rows[0].now 
    })
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      database: 'disconnected',
      error: error.message 
    })
  }
})

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor'
  })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/api/health`)
})

