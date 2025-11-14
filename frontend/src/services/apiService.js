const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

/**
 * Servicio para interactuar con la API del backend
 */
export const apiService = {
  /**
   * Guardar una respuesta de cuestionario
   * @param {Object} data - Datos del cuestionario
   * @param {string} data.questionnaireType - 'primera_vez' o 'revision'
   * @param {string} data.respondentName - Nombre del respondiente
   * @param {string} data.respondentEmail - Email (opcional)
   * @param {string} data.respondentPhone - Teléfono (opcional)
   * @param {Object} data.answers - Objeto con las respuestas
   * @param {Object} data.generalInfo - Información general del formulario
   * @returns {Promise<Object>} Respuesta del servidor con instanceId
   */
  async saveResponse(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Error al guardar la respuesta')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al guardar respuesta:', error)
      throw error
    }
  },

  /**
   * Subir fotografías asociadas a una instancia
   * @param {string} instanceId - ID de la instancia de checklist
   * @param {File[]} files - Array de archivos de imagen
   * @returns {Promise<Object>} Respuesta del servidor con los IDs de evidencias
   */
  async uploadPhotos(instanceId, files) {
    try {
      const formData = new FormData()
      files.forEach(file => {
        formData.append('photos', file)
      })

      const response = await fetch(`${API_BASE_URL}/photos/${instanceId}`, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Error al subir fotografías')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al subir fotografías:', error)
      throw error
    }
  },

  /**
   * Obtener fotografías de una instancia
   * @param {string} instanceId - ID de la instancia
   * @returns {Promise<Array>} Array de evidencias (fotografías)
   */
  async getPhotos(instanceId) {
    try {
      const response = await fetch(`${API_BASE_URL}/photos/${instanceId}`)
      
      if (!response.ok) {
        throw new Error('Error al obtener fotografías')
      }

      return await response.json()
    } catch (error) {
      console.error('Error al obtener fotografías:', error)
      throw error
    }
  },

  /**
   * Verificar estado del servidor
   * @returns {Promise<Object>} Estado del servidor y base de datos
   */
  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`)
      return await response.json()
    } catch (error) {
      console.error('Error en health check:', error)
      return { status: 'error', database: 'disconnected' }
    }
  }
}

