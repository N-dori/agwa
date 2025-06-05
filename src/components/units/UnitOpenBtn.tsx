import { useRef } from 'react'
import type { Unit } from '../../types'

type UnitOpenBtnProps = {
    unit: Unit
    setSelectedUnit: (id:string) => void
    selectedUnit: string
    isHealthy: boolean
}


export const UnitOpenBtn = ({unit, selectedUnit, setSelectedUnit, isHealthy}: UnitOpenBtnProps) => {
  const ref = useRef<HTMLLabelElement>(null)
  
  const onSelectUnit = (id:string) => {
  setSelectedUnit(selectedUnit === id ? '' : id  )
  if (ref.current && typeof ref.current.scrollIntoView === 'function') {
        ref.current.scrollIntoView({ behavior: 'smooth' })
      }
  }
  return (
    <label ref={ref} className="radio-wrapper flex">
              <input
                type="radio"
                name="tray"
                className="open-tray-btn hidden"
                value={selectedUnit}
                onClick={() => onSelectUnit(unit?.id)}
                checked={selectedUnit === unit?.id}
                readOnly
              />
              <span data-testid="custom-radio" className={`custom-radio ${isHealthy ? '' : 'unhealthy'}`}  ></span>
    </label>
  )
}

