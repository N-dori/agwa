import type { Pod } from '../../types'
import { GreenLeafs } from '../../assets/svgs/GreenLeafs'
import { ProgressCircleSvg } from '../../assets/svgs/ProgressCircleSvg'
import { GreenPlant } from '../../assets/svgs/GreenPlant'

type Props = {
    pod: Pod
}

export const PodPreview = ({pod}: Props) => {
const PodTooltip = () => {
    return  <div className="pod-tooltip">
                <p className="pod-age"><GreenPlant size={30}/>{` ${pod.age}% grown`}</p> 
            </div>
} 
const percent = Math.max(0, Math.min(100, pod.age));

  return (
    <div className="pod-tooltip-wrapper">
        <ProgressCircleSvg percent={percent}/>
        <div className="pod-container" >
            <GreenLeafs/>
        </div>
        <PodTooltip/>
    </div>
  )
}