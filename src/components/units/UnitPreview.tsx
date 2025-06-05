import type { Unit } from '../../types'
import { UniteLevel } from './UniteLevel'
import { UnitQuantity } from './UnitQuantity'
import { UnitOpenBtn } from './UnitOpenBtn'
import { PodsIndex } from '../pods/PodsIndex'
import { classificationsTypes } from '../../utils/monitor'

type UnitPreviewProps = {
  unit : Unit 
  idx : number
  setSelectedUnit: (id:string) => void
  selectedUnit: string
  onInspectUnit: () => void
}

export const UnitPreview = ({unit, idx, setSelectedUnit, selectedUnit, onInspectUnit}: UnitPreviewProps) => {
  if(!unit)return 
  const isHealthy = unit?.validation?.classification === classificationsTypes.HEALTHY
  return (
    <>
    <article className="unit-container">

      <section data-testid="unit-panel" className={`unit-panel ${isHealthy ? '' : 'unhealthy'} grid`}> 
        <UniteLevel idx={idx}/>
        {selectedUnit !== unit.id && 
        <UnitQuantity idx={idx} unitQuantity={unit.pods.length}/>}
        <UnitOpenBtn unit={unit} selectedUnit={selectedUnit} setSelectedUnit={setSelectedUnit} isHealthy={isHealthy}/> 
      </section>

    </article>

     {selectedUnit === unit.id &&
     <PodsIndex pods={unit.pods} unitId={unit.id} onInspectUnit={onInspectUnit} status={unit.validation}/>} 
         
    </>
  )
}