import express from 'express'
import multer from 'multer'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { query } from '../db/connection.js'
import { randomUUID } from 'crypto'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const photosRouter = express.Router()

// Configurar multer para guardar archivos
const uploadsDir = join(__dirname, '../../uploads/workspaces')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    const uniqueName = `${randomUUID()}_${Date.now()}.${file.originalname.split('.').pop()}`
    cb(null, uniqueName)
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: (process.env.MAX_UPLOAD_SIZE_MB || 10) * 1024 * 1024 // MB a bytes
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|heic|webp/
    const extname = allowedTypes.test(file.originalname.toLowerCase().split('.').pop())
    const mimetype = allowedTypes.test(file.mimetype)

    if (extname && mimetype) {
      cb(null, true)
    } else {
      cb(new Error('Solo se permiten imágenes (JPG, PNG, HEIC, WEBP)'))
    }
  }
})

// Subir fotografías asociadas a una respuesta/instancia
photosRouter.post('/:instanceId', upload.array('photos', 10), async (req, res) => {
  try {
    const { instanceId } = req.params
    const files = req.files

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No se proporcionaron archivos' })
    }

    // Verificar que la instancia existe
    const instanceCheck = await query(
      `SELECT id_instance FROM nom037.checklist_instances WHERE id_instance = $1`,
      [instanceId]
    )

    if (instanceCheck.rows.length === 0) {
      // Limpiar archivos subidos si la instancia no existe
      files.forEach(file => fs.unlinkSync(file.path))
      return res.status(404).json({ error: 'Instancia de checklist no encontrada' })
    }

    // Crear validación si no existe
    let validationResult = await query(
      `SELECT id_validacion FROM nom037.validaciones WHERE id_instance = $1 LIMIT 1`,
      [instanceId]
    )

    let validationId
    if (validationResult.rows.length === 0) {
      const newValidation = await query(
        `INSERT INTO nom037.validaciones (id_instance, fecha_validacion, resultado)
         VALUES ($1, NOW(), 'requires_action')
         RETURNING id_validacion`,
        [instanceId]
      )
      validationId = newValidation.rows[0].id_validacion
    } else {
      validationId = validationResult.rows[0].id_validacion
    }

    // Guardar metadatos de cada foto en la tabla evidencias
    const evidencePromises = files.map(async (file, index) => {
      const relativePath = `/uploads/workspaces/${file.filename}`
      
      return query(
        `INSERT INTO nom037.evidencias 
         (id_validacion, tipo, nombre_archivo, uri_archivo, metadata)
         VALUES ($1, 'photo', $2, $3, $4)
         RETURNING id_evidencia`,
        [
          validationId,
          file.originalname,
          relativePath,
          JSON.stringify({
            size: file.size,
            mimeType: file.mimetype,
            uploadedAt: new Date().toISOString(),
            isPrimary: index === 0
          })
        ]
      )
    })

    const evidences = await Promise.all(evidencePromises)

    res.status(201).json({
      success: true,
      validationId,
      evidences: evidences.map(e => e.rows[0]),
      message: `${files.length} fotografía(s) guardada(s) correctamente`
    })

  } catch (error) {
    console.error('Error al subir fotografías:', error)
    
    // Limpiar archivos en caso de error
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path)
        }
      })
    }

    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Obtener fotografías de una instancia
photosRouter.get('/:instanceId', async (req, res) => {
  try {
    const { instanceId } = req.params

    const result = await query(
      `SELECT e.*, v.id_validacion
       FROM nom037.evidencias e
       JOIN nom037.validaciones v ON e.id_validacion = v.id_validacion
       WHERE v.id_instance = $1 AND e.tipo = 'photo'
       ORDER BY e.created_at DESC`,
      [instanceId]
    )

    res.json(result.rows)
  } catch (error) {
    console.error('Error al obtener fotografías:', error)
    res.status(500).json({ error: error.message })
  }
})

