import PropTypes from 'prop-types'
import { weekDays } from '../content/questionnaire.js'

const GeneralInfoForm = ({ generalInfo, answers, onFieldChange, onToggleWeekDay }) => {
  return (
    <section className="questionnaire-section" id="datos-generales">
      <header className="questionnaire-section__header">
        <h2>Sección I · Datos generales</h2>
        <p>Favor de responder de la manera más honesta y objetiva posible.</p>
      </header>

      <div className="general-info-grid">
        {generalInfo.fields.map((field) => {
          const value = answers[field.id] ?? ''
          if (field.type === 'textarea') {
            return (
              <label key={field.id} className="general-info-field general-info-field--wide">
                <span>{field.label}</span>
                <textarea
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholder}
                  value={value}
                  onChange={(event) => onFieldChange(field.id, event.target.value)}
                  rows={4}
                />
              </label>
            )
          }

          return (
            <label key={field.id} className="general-info-field">
              <span>{field.label}</span>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                value={value}
                min={field.min}
                max={field.max}
                onChange={(event) => onFieldChange(field.id, event.target.value)}
              />
            </label>
          )
        })}
      </div>

      {generalInfo.weekSelections.map((weekGroup) => (
        <fieldset key={weekGroup.id} className="weekdays-fieldset">
          <legend>{weekGroup.label}</legend>
          <div className="weekdays-grid">
            {(weekGroup.options || weekDays).map((day) => {
              const current = answers[weekGroup.id] || []
              const checked = current.includes(day.id)
              return (
                <label key={day.id} className="weekday-option">
                  <input
                    type="checkbox"
                    name={`${weekGroup.id}-${day.id}`}
                    checked={checked}
                    onChange={() => onToggleWeekDay(weekGroup.id, day.id)}
                  />
                  <span>{day.label}</span>
                </label>
              )
            })}
          </div>
        </fieldset>
      ))}
    </section>
  )
}

GeneralInfoForm.propTypes = {
  generalInfo: PropTypes.shape({
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        min: PropTypes.number,
        max: PropTypes.number
      })
    ).isRequired,
    weekSelections: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  answers: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onToggleWeekDay: PropTypes.func.isRequired
}

export default GeneralInfoForm

