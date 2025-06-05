import type { Unit } from '../../types'

type UnitOpenBtnProps = {
    unit: Unit
    setSelectedUnit: (id:string) => void
    selectedUnit: string
    isHealthy: boolean
}

export const UnitOpenBtn = ({unit, selectedUnit, setSelectedUnit, isHealthy}: UnitOpenBtnProps) => {
  return (
    <label className="radio-wrapper flex">
              <input
                type="radio"
                name="tray"
                className="open-tray-btn hidden"
                value={selectedUnit}
                onClick={() => setSelectedUnit(selectedUnit === unit?.id ? '' :unit?.id  )}
                checked={selectedUnit === unit?.id}
                readOnly
              />
              <span data-testid="custom-radio" className={`custom-radio ${isHealthy ? '' : 'unhealthy'}`}  ></span>
    </label>
  )
}

