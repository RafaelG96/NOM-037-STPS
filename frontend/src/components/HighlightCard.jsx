import PropTypes from 'prop-types'

const HighlightCard = ({ title, description }) => (
  <article className="highlight-card">
    <h3>{title}</h3>
    <p>{description}</p>
  </article>
)

HighlightCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default HighlightCard

