import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import GeneralInfoForm from '../components/GeneralInfoForm.jsx'
import QuestionnaireSection from '../components/QuestionnaireSection.jsx'
import { clearAnswers, loadAnswers, saveAnswers } from '../services/localStorageService.js'
import '../styles/form.css'

const QuestionnaireForm = ({ formConfig, storageKey }) => {
  const [answers, setAnswers] = useState(() => loadAnswers(storageKey))
  const [statusMessage, setStatusMessage] = useState('')
  const [isPhotoUploadVisible, setPhotoUploadVisible] = useState(false)
  const [photoFiles, setPhotoFiles] = useState([])

  const sections = useMemo(() => [formConfig], [formConfig])
  const photoUploadInputId = useMemo(() => `workspace-photos-${storageKey}`, [storageKey])

  const handleAnswerChange = (id, value) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value
    }))
  }

  const handleWeekToggle = (groupId, dayId) => {
    setAnswers((prev) => {
      const current = prev[groupId] || []
      const exists = current.includes(dayId)
      const updated = exists ? current.filter((item) => item !== dayId) : [...current, dayId]
      return {
        ...prev,
        [groupId]: updated
      }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    saveAnswers(answers, storageKey)
    setStatusMessage('Las respuestas se han guardado en este navegador. Exporta o imprime el formulario para respaldarlas.')
  }

  const handleClear = () => {
    clearAnswers(storageKey)
    setAnswers({})
    setStatusMessage('Las respuestas almacenadas localmente se han eliminado.')
  }

  const handleTogglePhotoUpload = () => {
    setPhotoUploadVisible((prev) => !prev)
  }

  const handlePhotoChange = (event) => {
    const selectedFiles = Array.from(event.target.files || [])
    setPhotoFiles(selectedFiles)
  }

  useEffect(() => {
    saveAnswers(answers, storageKey)
  }, [answers, storageKey])

  return (
    <div className="questionnaire-page">
      <header className="questionnaire-header">
        <div className="questionnaire-header__content">
          <h1>{formConfig.formTitle}</h1>
          <p>{formConfig.formSubtitle}</p>
        </div>
        <Link className="questionnaire-header__link" to="/cuestionario">
          ← Elegir otro cuestionario
        </Link>
      </header>

      <form className="questionnaire-form" onSubmit={handleSubmit}>
        <GeneralInfoForm
          generalInfo={formConfig.generalInfo}
          answers={answers}
          onFieldChange={handleAnswerChange}
          onToggleWeekDay={handleWeekToggle}
        />

        {sections.map((section) => {
          const { generalInfo, formTitle, formSubtitle, ...rest } = section
          return (
            <QuestionnaireSection
              key={section.id}
              section={rest}
              answers={answers}
              onAnswerChange={handleAnswerChange}
            />
          )
        })}

        <div className="photo-upload">
          <button type="button" className="secondary-button" onClick={handleTogglePhotoUpload}>
            {isPhotoUploadVisible ? 'Ocultar cargador de fotografías' : 'Agregar fotografías del espacio de trabajo'}
          </button>

          {isPhotoUploadVisible && (
            <div className="photo-upload__field">
              <label htmlFor={photoUploadInputId}>Selecciona fotografías del espacio de trabajo (formatos JPG, PNG o HEIC)</label>
              <input
                id={photoUploadInputId}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoChange}
              />
              <p>
                Las fotografías se mantienen de forma local en esta sesión y servirán como respaldo visual de las condiciones del
                espacio de trabajo.
              </p>
              {photoFiles.length > 0 && (
                <ul className="photo-upload__list">
                  {photoFiles.map((file) => (
                    <li key={`${file.name}-${file.lastModified}`}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-button">
            Guardar respuestas
          </button>
          <button type="button" className="secondary-button" onClick={handleClear}>
            Limpiar respuestas guardadas
          </button>
          <p className="form-actions__hint">
            Esta es una herramienta informativa. Imprima o exporte el formulario para compartirlo con su área de
            seguridad y salud laboral.
          </p>
        </div>

        {statusMessage && <p className="form-status">{statusMessage}</p>}
      </form>
    </div>
  )
}

export default QuestionnaireForm

