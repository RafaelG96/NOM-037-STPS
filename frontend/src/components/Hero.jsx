import PropTypes from 'prop-types'

const Hero = ({ title, subtitle, ctaPrimary, ctaSecondary }) => {
  return (
    <header className="hero">
      <div className="hero__content">
        <p className="hero__tag">Seguridad y salud laboral</p>
        <h1 className="hero__title">{title}</h1>
        <p className="hero__subtitle">{subtitle}</p>
        <div className="hero__actions">
          <a className="hero__button hero__button--primary" href={ctaPrimary.href} target="_blank" rel="noreferrer">
            {ctaPrimary.label}
          </a>
          <a className="hero__button" href={ctaSecondary.href}>
            {ctaSecondary.label}
          </a>
        </div>
      </div>
    </header>
  )
}

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  ctaPrimary: PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
  }).isRequired,
  ctaSecondary: PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
  }).isRequired
}

export default Hero

