import type { Reading } from '../../types'
import dayjs from 'dayjs'

type ProblematicReadingPreviewProps = {
    problematicReading: Reading
    idx: number
}

export const ProblematicReadingPreview = ({problematicReading, idx}: ProblematicReadingPreviewProps) => {
if(!problematicReading) return
    const { pH , temp, ec } = problematicReading
    const date =  dayjs(problematicReading.timestamp).format('DD-MM-YYYY')
    return (
    <>
    <span>{idx+1}</span>
    <span>{pH}</span>
    <span>{temp}</span>
    <span>{ec}</span>
    <span className="reading-timestamp">{date}</span>
    </>
  )
}