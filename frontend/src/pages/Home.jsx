import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import HighlightCard from '../components/HighlightCard.jsx'
import InfoSection from '../components/InfoSection.jsx'
import RiskList from '../components/RiskList.jsx'
import Timeline from '../components/Timeline.jsx'
import ResourceList from '../components/ResourceList.jsx'
import {
  heroContent,
  highlightCards,
  pillarSections,
  riskFactors,
  implementationSteps,
  resources
} from '../content/nom035.js'
import '../styles/page.css'

const Home = () => {
  return (
    <div className="page">
      <Hero {...heroContent} />

      <main>
        <section className="highlight-grid">
          {highlightCards.map((card) => (
            <HighlightCard key={card.title} {...card} />
          ))}
        </section>

        {pillarSections.map((section) => (
          <InfoSection key={section.id} {...section} />
        ))}

        <RiskList factors={riskFactors} />

        <Timeline steps={implementationSteps} />

        <ResourceList resources={resources} />
      </main>

      <footer className="page__footer">
        <p>
          Información con fines orientativos. Consulta siempre las publicaciones oficiales de la STPS para confirmar
          requisitos y fechas vigentes.
        </p>
        <Link className="page__cta" to="/cuestionario">
          Ir al cuestionario de teletrabajo NOM-035
        </Link>
      </footer>
    </div>
  )
}

export default Home

