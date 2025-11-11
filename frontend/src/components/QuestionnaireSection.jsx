import PropTypes from 'prop-types'

const QuestionList = ({ questions, answers, onAnswerChange }) => (
  <ul className="question-list">
    {questions.map((question) => (
      <li key={question.id} className="question-item">
        <p className="question-item__text">{question.text}</p>
        <div className="question-item__options">
          {(question.options || []).map((option) => (
            <label key={option} className="question-option">
              <input
                type="radio"
                name={question.id}
                value={option}
                checked={answers[question.id] === option}
                onChange={() => onAnswerChange(question.id, option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </li>
    ))}
  </ul>
)

const QuestionnaireSection = ({ section, answers, onAnswerChange }) => (
  <section id={section.id} className="questionnaire-section">
    <header className="questionnaire-section__header">
      <h2>{section.title}</h2>
      {section.description && <p>{section.description}</p>}
    </header>

    {section.groups.map((group) => (
      <div key={group.id} className="question-group">
        <h3>{group.title}</h3>
        {group.description && <p className="question-group__description">{group.description}</p>}

        {group.questions && group.questions.length > 0 && (
          <QuestionList questions={group.questions} answers={answers} onAnswerChange={onAnswerChange} />
        )}

        {group.subgroups &&
          group.subgroups.map((subgroup) => (
            <div key={subgroup.id} className="question-subgroup">
              <h4>{subgroup.title}</h4>
              {subgroup.description && <p className="question-group__description">{subgroup.description}</p>}
              <QuestionList questions={subgroup.questions} answers={answers} onAnswerChange={onAnswerChange} />
            </div>
          ))}
      </div>
    ))}
  </section>
)

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  answers: PropTypes.object.isRequired,
  onAnswerChange: PropTypes.func.isRequired
}

QuestionnaireSection.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    groups: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        questions: PropTypes.array,
        subgroups: PropTypes.array
      })
    ).isRequired
  }).isRequired,
  answers: PropTypes.object.isRequired,
  onAnswerChange: PropTypes.func.isRequired
}

export default QuestionnaireSection

