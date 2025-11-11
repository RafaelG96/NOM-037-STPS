import PropTypes from 'prop-types'

const RiskList = ({ factors }) => (
  <section className="risk-list">
    <h2>Factores de riesgo psicosocial habituales</h2>
    <div className="risk-list__grid">
      {factors.map((factor) => (
        <div key={factor} className="risk-list__item">
          {factor}
        </div>
      ))}
    </div>
  </section>
)

RiskList.propTypes = {
  factors: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default RiskList

