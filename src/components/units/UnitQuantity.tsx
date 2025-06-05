import { MAX_PODS_NUMBER } from '../../utils/monitor'
import { LeafSvg } from '../../assets/svgs/LeafSvg'

type TrayQuantityProps = {
    idx:number
    unitQuantity:number
}
export const UnitQuantity = ({idx, unitQuantity}:TrayQuantityProps)  => {

const getTrayPlacement = () => {
    switch (idx) {
    case 0:
        return 'Top'
    case 1:
        return 'Middle'
    case 2:
        return 'Bottom'
    default:
        break;
    }
} 
  return (
    <div className="quantity">
          <div>{getTrayPlacement()}</div>
          <span>{MAX_PODS_NUMBER}</span> <span> / </span> <span>{unitQuantity}</span>
          <span className="ml-05"><LeafSvg/></span>
    </div>
  )
}
