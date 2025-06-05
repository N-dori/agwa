import type { Pod } from '../../types'
import { PodPreview } from './PodPreview'

type PodsListProps = {
      pods: Pod[]
}

export const PodsList = ({pods}:PodsListProps) => {

const podsNames = ['Lettuce','Arugula','Basil','Parsley','Mix',]

  return (
    <section className="pods-wrapper  grid">
        {podsNames.map((name,idx) => <div key={idx} className="row-name">{name}</div>)}
        {pods.map((pod) => <PodPreview key={pod?.id} pod={pod}/>)}
    </section>
  )
}