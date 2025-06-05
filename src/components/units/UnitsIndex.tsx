import type { Unit } from '../../types'
import { UnitsList } from './UnitsList'

type UnitsIndexProps = {
  units : Unit []
  setSelectedUnit: (id:string) => void
  selectedUnit: string
  onInspectUnit: () => void
}

export const UnitsIndex = ({units, setSelectedUnit, selectedUnit, onInspectUnit}: UnitsIndexProps) => {
  const UnitsListProps = {
    units,
    setSelectedUnit,
    selectedUnit,
    onInspectUnit
  }
  return (
    <section className="units-wrapper flex-col">
      <UnitsList {...UnitsListProps}/>
    </section>
  )
}