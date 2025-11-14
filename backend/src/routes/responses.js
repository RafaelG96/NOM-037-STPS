import express from 'express'
import { query } from '../db/connection.js'

export const responsesRouter = express.Router()

// Crear una nueva respuesta (checklist instance)
responsesRouter.post('/', async (req, res) => {
  try {
    const { 
      questionnaireType, // 'primera_vez' o 'revision'
      respondentName,
      respondentEmail,
      respondentPhone,
      answers, // objeto con las respuestas
      generalInfo // información general del formulario
    } = req.body

    // 1. Buscar o crear el template de checklist según el tipo
    let templateResult = await query(
      `SELECT id_template FROM nom037.checklist_templates 
       WHERE nombre = $1 AND activo = true 
       ORDER BY version DESC LIMIT 1`,
      [questionnaireType === 'primera_vez' 
        ? 'Solicitud inicial para Teletrabajo' 
        : 'Revisión de condiciones en Teletrabajo']
    )

    let templateId
    if (templateResult.rows.length === 0) {
      // Crear template si no existe
      const newTemplate = await query(
        `INSERT INTO nom037.checklist_templates (nombre, descripcion, version, activo)
         VALUES ($1, $2, 1, true)
         RETURNING id_template`,
        [
          questionnaireType === 'primera_vez' 
            ? 'Solicitud inicial para Teletrabajo' 
            : 'Revisión de condiciones en Teletrabajo',
          `Template para ${questionnaireType}`
        ]
      )
      templateId = newTemplate.rows[0].id_template
    } else {
      templateId = templateResult.rows[0].id_template
    }

    // 2. Obtener o crear empleador genérico del sistema (sin datos de empresa)
    // Este empleador se usa para todos los trabajadores que no especifican empresa
    let empleadorResult = await query(
      `SELECT id_empleador FROM nom037.empleadores 
       WHERE razon_social = 'Sistema NOM-037' LIMIT 1`
    )

    let empleadorId
    if (empleadorResult.rows.length === 0) {
      // Crear empleador genérico del sistema si no existe
      const newEmpleador = await query(
        `INSERT INTO nom037.empleadores (razon_social, actividad_principal) 
         VALUES ('Sistema NOM-037', 'Teletrabajo - Sin especificar empresa') 
         RETURNING id_empleador`
      )
      empleadorId = newEmpleador.rows[0].id_empleador
    } else {
      empleadorId = empleadorResult.rows[0].id_empleador
    }

    // 3. Crear o buscar trabajador (solo con datos del trabajador, sin datos de empresa)
    // Buscar por nombre y empleador genérico
    let workerResult = await query(
      `SELECT id_trabajador FROM nom037.trabajadores 
       WHERE nombre = $1 AND id_empleador = $2 LIMIT 1`,
      [respondentName, empleadorId]
    )

    let workerId
    if (workerResult.rows.length === 0) {
      // Crear nuevo trabajador con datos básicos del formulario
      const actividades = generalInfo?.actividad ? [generalInfo.actividad] : null
      const newWorker = await query(
        `INSERT INTO nom037.trabajadores 
         (id_empleador, nombre, telefono, actividades, activo)
         VALUES ($1, $2, $3, $4, true)
         RETURNING id_trabajador`,
        [
          empleadorId, 
          respondentName, 
          respondentPhone || null,
          actividades ? JSON.stringify(actividades) : null
        ]
      )
      workerId = newWorker.rows[0].id_trabajador
    } else {
      workerId = workerResult.rows[0].id_trabajador
    }

    // 4. Crear instancia del checklist
    const instanceResult = await query(
      `INSERT INTO nom037.checklist_instances 
       (id_template, id_trabajador, fecha_aplicacion, aplicado_por, metodo_aplicacion)
       VALUES ($1, $2, NOW(), $3, 'self')
       RETURNING id_instance`,
      [templateId, workerId, respondentName]
    )

    const instanceId = instanceResult.rows[0].id_instance

    // 5. Guardar respuestas
    const answerPromises = Object.entries(answers).map(async ([questionId, answerValue]) => {
      // Buscar el item del checklist que corresponde a esta pregunta
      const itemResult = await query(
        `SELECT id_item FROM nom037.checklist_items 
         WHERE id_template = $1 AND orden = (SELECT orden FROM nom037.checklist_items WHERE id_template = $1 LIMIT 1)`,
        [templateId]
      )

      if (itemResult.rows.length > 0) {
        const itemId = itemResult.rows[0].id_item
        const answerText = Array.isArray(answerValue) ? answerValue.join(', ') : String(answerValue)
        
        await query(
          `INSERT INTO nom037.checklist_answers 
           (id_instance, id_item, respuesta_text)
           VALUES ($1, $2, $3)
           ON CONFLICT (id_instance, id_item) 
           DO UPDATE SET respuesta_text = EXCLUDED.respuesta_text`,
          [instanceId, itemId, answerText]
        )
      }
    })

    await Promise.all(answerPromises)

    res.status(201).json({
      success: true,
      instanceId,
      message: 'Respuesta guardada correctamente'
    })

  } catch (error) {
    console.error('Error al guardar respuesta:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Obtener una respuesta por ID
responsesRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const result = await query(
      `SELECT * FROM nom037.checklist_instances WHERE id_instance = $1`,
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Respuesta no encontrada' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Error al obtener respuesta:', error)
    res.status(500).json({ error: error.message })
  }
})

