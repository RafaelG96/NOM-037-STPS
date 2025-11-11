import { Link } from 'react-router-dom'
import '../styles/form.css'

const Questionnaire = () => (
  <div className="questionnaire-page">
    <header className="questionnaire-header">
      <div className="questionnaire-header__content">
        <h1>NOM-035-STPS-2023 · Selección de cuestionario</h1>
        <p>
          Elige el formulario que corresponde a tu caso: solicitud inicial para comenzar a teletrabajar o verificación
          periódica para quienes ya laboran bajo esta modalidad.
        </p>
      </div>
      <Link className="questionnaire-header__link" to="/">
        ← Regresar a la información general
      </Link>
    </header>

    <section className="questionnaire-choice">
      <article className="questionnaire-choice__card">
        <h2>Trámite por primera vez</h2>
        <p>
          Utiliza esta encuesta cuando la persona trabajadora desea incorporarse por primera vez a la modalidad de
          Teletrabajo y debe validar las condiciones de su domicilio.
        </p>
        <Link className="primary-button" to="/cuestionario/primera-vez">
          Comenzar solicitud inicial
        </Link>
      </article>

      <article className="questionnaire-choice__card">
        <h2>Revisión de condiciones actuales</h2>
        <p>
          Selecciona esta opción cuando la persona ya se encuentra en Teletrabajo y requiere confirmar que su espacio
          cumple con las condiciones de seguridad y salud establecidas por la NOM-035-STPS-2023.
        </p>
        <Link className="secondary-button" to="/cuestionario/revision">
          Continuar con la verificación
        </Link>
      </article>
    </section>
  </div>
)

export default Questionnaire

