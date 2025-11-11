import PropTypes from 'prop-types'

const Timeline = ({ steps }) => (
  <section id="implementacion" className="timeline">
    <h2>Ruta de implementación</h2>
    <div className="timeline__items">
      {steps.map(({ step, detail }) => (
        <div key={step} className="timeline__item">
          <span className="timeline__step">{step}</span>
          <p>{detail}</p>
        </div>
      ))}
    </div>
  </section>
)

Timeline.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      step: PropTypes.string.isRequired,
      detail: PropTypes.string.isRequired
    })
  ).isRequired
}

export default Timeline

