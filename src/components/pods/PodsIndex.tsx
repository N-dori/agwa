import { PodsList } from './PodsList'
import type { Pod } from '../../types'
import { classificationsTypes } from '../../utils/monitor'
import { HealthySvg } from '../../assets/svgs/HealthySvg'
import { AttentionSvg } from '../../assets/svgs/AttentionSvg'

type PodsIndexProps = {
  pods: Pod[]
  unitId: string
  onInspectUnit: () => void
  status: { status:string , classification:string } | undefined
}

export const PodsIndex = ({pods, unitId, onInspectUnit, status}: PodsIndexProps) => {
const isHealthy = status?.classification === classificationsTypes.HEALTHY
  return (
    <section className="pods-container flex-col" >
          <p data-testid={'unit-status'} className={`unit-status flex-jc gap-05 ${isHealthy? '' : 'unhealthy' } center`}>
            Unit Status : {status?.classification}
            {isHealthy?<HealthySvg/>: <AttentionSvg/>}
          </p>

        <div className="input-container  flex-jc-ac ">
          <input data-testid={'unit-input'} className="unit-input" type="text" value={'Unit - '+unitId} readOnly/>
          <button onClick={onInspectUnit} type='button' className="inspect-btn">Inspect</button>
        </div>

        <PodsList pods={pods}/>
    </section>
  )
}