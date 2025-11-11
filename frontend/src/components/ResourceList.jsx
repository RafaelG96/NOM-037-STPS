import PropTypes from 'prop-types'

const ResourceList = ({ resources }) => (
  <section className="resource-list">
    <h2>Recursos y referencias oficiales</h2>
    <ul>
      {resources.map(({ label, href }) => (
        <li key={href}>
          <a href={href} target="_blank" rel="noreferrer">
            {label}
          </a>
        </li>
      ))}
    </ul>
  </section>
)

ResourceList.propTypes = {
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired
    })
  ).isRequired
}

export default ResourceList

