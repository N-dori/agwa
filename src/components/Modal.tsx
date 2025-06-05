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
    <section className="modal-container flex-col flex-jc">
      <h2 className="center"> Self-Introduction & Growth </h2>

      <p className="about-me center bold">Hi AGWA, I'm Nadav Dori :) 38 year old originally from Jerusalem I have been married to the beautiful Ella for over 11 years and we have 4 little ones.</p>
     
      <section className="content-container">
      <p className="intro">
        After reading the articles on AGWA's website, I was truly impressed by the technological capabilities of AGWA's growing cabin — specifically, how it can precisely adapt the living conditions for each plant and deliver high-quality results. This kind of innovation fascinates me personally.
      </p>
      <p>
        As a yoga practitioner and as a father, I deeply resonate with the philosophy that when we provide our bodies with the right conditions — proper nutrition, sleep, and movement —
        we can unlock our full potential. In that same spirit, I find it inspiring that your technology can do that for the crops and deliver fresh hydroponic
        produce to crews in remote locations like gas rigs and vessels, improving their well-being and overall morale. It’s a beautiful, smart solution, and I would be honored to contribute to such a meaningful project.
      </p>
      <p> 
        If accepted, I’m eager to grow, learn, solve problems, deliver real value, 
        and help the company succeed in any challenge it faces.
      </p>

      <p className="start">I believe I can be a good fit for the developer role for several reasons:</p>

      <ul className="reasons flex-col gap-05">
        <li>First of all I love doing #web development #design and #coding. I fell very comfortable with <strong>JS+TS+React+Mongo+Git</strong>, I'm also working on improving my <strong>Python</strong> skills.</li>
        <li>I'm <strong>Eager to learn</strong> and improve, open to feedback</li>
        <li>I'm dedicated to my work place specially when I feel valued, I will be willing to do the extra mile when ever it's needed!</li>
        <li>I'm a great team player I love people and like to work in a team! I think that in the end we can become good friends</li>
        <li>Thank you for the appertonity to show case my capabilities it is very much appreciated!</li>
      </ul>
      </section>

      <button className="btn" onClick={() => setIsModalShown(false)}>{getBtnTxt()}</button>

    </section>
    :
    <section className="modal-container inspect">
      <ProblematicReadingsTable problematicReadings={problematicReadings} selectedUnit={selectedUnit} setIsModalShown={setIsModalShown}/>
    </section>
  )
}