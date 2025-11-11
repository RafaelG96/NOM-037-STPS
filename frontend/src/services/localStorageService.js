const baseKey = 'nom035_questionnaire_answers'

const getStorageKey = (namespace = 'general') => `${baseKey}_${namespace}`

export const loadAnswers = (namespace) => {
  if (typeof window === 'undefined') return {}
  try {
    const stored = window.localStorage.getItem(getStorageKey(namespace))
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.warn('No fue posible cargar las respuestas almacenadas localmente', error)
    return {}
  }
}

export const saveAnswers = (answers, namespace) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(getStorageKey(namespace), JSON.stringify(answers))
  } catch (error) {
    console.warn('No fue posible guardar las respuestas localmente', error)
  }
}

export const clearAnswers = (namespace) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(getStorageKey(namespace))
  } catch (error) {
    console.warn('No fue posible limpiar las respuestas almacenadas', error)
  }
}

