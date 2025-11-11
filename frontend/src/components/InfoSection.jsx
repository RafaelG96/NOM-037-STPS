import PropTypes from 'prop-types'

const InfoSection = ({ id, title, description, items }) => (
  <section id={id} className="info-section">
    <div className="info-section__header">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
    {items && items.length > 0 && (
      <ul className="info-section__list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )}
  </section>
)

InfoSection.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string)
}

InfoSection.defaultProps = {
  id: undefined,
  items: []
}

export default InfoSection

