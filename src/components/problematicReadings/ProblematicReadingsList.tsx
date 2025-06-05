import type { Reading } from '../../types'
import { ProblematicReadingPreview } from './ProblematicReadingPreview'

type problematicReadingsListProps = {
    problematicReadings :Reading []
}

export const ProblematicReadingsList = ({problematicReadings}: problematicReadingsListProps) => {
  if(!problematicReadings) return <span>No Data</span>
  return (
    problematicReadings.map((problematicReading,idx) => 
    <ProblematicReadingPreview key={problematicReading.id} problematicReading={problematicReading} idx={idx}/>
    )
  )
}