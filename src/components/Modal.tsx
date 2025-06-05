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
    <section className="modal-container center">
      <h2> Self-Introduction & Growth </h2>
      <p>Hi AGWA, I'm Nadav Dori :)</p>
      <p>I believe I’m a great fit for the developer role at Agwa for several reasons:</p>
      <ul>
        <li>After reading the articles on your website, I was truly impressed by the technological capabilities of your growing unit — specifically, how it can precisely adapt the living conditions for each plant and deliver high-quality results. This kind of innovation fascinates me personally.</li>
        <li>As a yoga practitioner and a father, I deeply resonate with the philosophy that when we provide our bodies with the right conditions — proper nutrition, sleep, and movement — we unlock our full potential. In that same spirit, I find it inspiring that your technology can deliver fresh hydroponic produce to crews in remote locations like gas rigs and vessels, improving their well-being and overall morale. It’s a beautiful, smart solution, and I would be honored to contribute to such a meaningful project.</li>
        <li>If accepted, I’m eager to grow, learn, solve problems, deliver real value, and help the company succeed in any challenge it faces.</li>
      </ul>
      <button className="btn center" onClick={() => setIsModalShown(false)}>{getBtnTxt()}</button>
    </section>
    :
    <section className="modal-container inspect">
      <ProblematicReadingsTable problematicReadings={problematicReadings} selectedUnit={selectedUnit} setIsModalShown={setIsModalShown}/>
    </section>
  )
}