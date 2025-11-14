import express from 'express'
import { query } from '../db/connection.js'

export const questionnairesRouter = express.Router()

// Obtener todos los templates de cuestionarios disponibles
questionnairesRouter.get('/', async (req, res) => {
  try {
    const result = await query(
      `SELECT id_template, nombre, descripcion, version, activo, created_at
       FROM nom037.checklist_templates
       WHERE activo = true
       ORDER BY nombre, version DESC`
    )

    res.json(result.rows)
  } catch (error) {
    console.error('Error al obtener cuestionarios:', error)
    res.status(500).json({ error: error.message })
  }
})

// Obtener items de un template específico
questionnairesRouter.get('/:templateId/items', async (req, res) => {
  try {
    const { templateId } = req.params

    const result = await query(
      `SELECT id_item, orden, categoria, pregunta, tipo_respuesta, obligatorio
       FROM nom037.checklist_items
       WHERE id_template = $1
       ORDER BY orden ASC`,
      [templateId]
    )

    res.json(result.rows)
  } catch (error) {
    console.error('Error al obtener items del cuestionario:', error)
    res.status(500).json({ error: error.message })
  }
})

