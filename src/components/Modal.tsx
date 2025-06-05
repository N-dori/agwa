import { modalTypes } from '../utils/modal'
import type { Reading } from '../types'
import { ProblematicReadingsTable } from './problematicReadings/ProblematicReadingsTable'

type Props = {
    type: string
    setIsModalShown: (isModalShown:boolean) => void 
    problematicReadings: Reading []
    selectedUnit: string
}

export const Modal = ({type, setIsModalShown, problematicReadings, selectedUnit}: Props) => {
const getBtnTxt = () => {
  return type === modalTypes.INTRO ?
  'Start Technical Exercise'
  :
  'Back'
}
  return (
   type === modalTypes.INTRO ? 
    <section className="modal-container">
      <h2 className="center"> Self-Introduction & Growth </h2>
      <p className="about-me center bold">Hi AGWA, I'm Nadav Dori :) 38 year old originally from Jerusalem I have been married to the beautiful Ella for over 11 years and we have 4 little ones </p>
      <p className="intro">
        After reading the articles on your website, I was truly impressed by the technological capabilities of your growing unit — specifically, how it can precisely adapt the living conditions for each plant and deliver high-quality results. This kind of innovation fascinates me personally.
        As a yoga practitioner and as a father, I deeply resonate with the philosophy that when we provide our bodies with the right conditions — proper nutrition, sleep, and movement —
           we can unlock our full potential. In that same spirit, I find it inspiring that your technology can deliver fresh hydroponic produce to crews in remote locations like gas rigs and vessels, improving their well-being and overall morale. It’s a beautiful, smart solution, and I would be honored to contribute to such a meaningful project.
        If accepted, I’m eager to grow, learn, solve problems, deliver real value, and help the company succeed in any challenge it faces
      </p>
      <p className="start">I believe I can be a good fit for the developer role for several reasons:</p>
      <ul className="reasons">
        <li>First of all I love doing #web development #design and #coding fell very comfortable with JS+TS+React+Mongo+Git, Py(needs improvement)</li>
        <li>I'm Eager to learn and improve, open to feedback</li>
        <li>I'm dedicated to my work place specially when I feel valued, I will be willing to do the extra mile when ever it's needed!</li>
        <li>I'm a great team player I love people and I think that in the end we can become good friends</li>
      </ul>
      <button className="btn" onClick={() => setIsModalShown(false)}>{getBtnTxt()}</button>
    </section>
    :
    <section className="modal-container inspect">
      <ProblematicReadingsTable problematicReadings={problematicReadings} selectedUnit={selectedUnit} setIsModalShown={setIsModalShown}/>
    </section>
  )
}