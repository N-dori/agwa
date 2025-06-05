import type { Unit } from '../../types'
import { UnitPreview } from './UnitPreview'

type UnitsListProps = {
  units : Unit []
  setSelectedUnit: (id:string) => void
  selectedUnit: string
  onInspectUnit: () => void
}

export const UnitsList = ({units, setSelectedUnit, selectedUnit, onInspectUnit}: UnitsListProps) => {

const UnitPreviewProps = {
  selectedUnit,
  setSelectedUnit,
  onInspectUnit,
}
  
  return units?.map((unit, idx) => <UnitPreview key={unit.id} unit={unit} idx={idx} {...UnitPreviewProps}/>) 
}