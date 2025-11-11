import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Questionnaire from './pages/Questionnaire.jsx'
import QuestionnaireForm from './pages/QuestionnaireForm.jsx'
import { sectionI, sectionII } from './content/questionnaire.js'

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/cuestionario" element={<Questionnaire />} />
    <Route path="/cuestionario/primera-vez" element={<QuestionnaireForm formConfig={sectionI} storageKey="primera-vez" />} />
    <Route path="/cuestionario/revision" element={<QuestionnaireForm formConfig={sectionII} storageKey="revision" />} />
  </Routes>
)

export default App

