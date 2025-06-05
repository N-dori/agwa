import type { Pod, Reading, Unit } from "../types"
import { localStorageService } from "./localStorage.service"
import { utilService } from "./util.service"

const MIN_PH = 5
const MAX_PH = 6.5
const MIN_TEMP = 1
const MAX_TEMP = 41
const MIN_EC = 1
const MAX_EC = 10
const MIN_AGE = 1
const MAX_AGE = 100
const READINGS_AMOUNT = 100
const PODS_NUMBER = 20
const TRAYS_NUMBER = 3
const UNITS_STORAGE_KEY = 'units'

const createRandomAge = () => {
    return utilService.getRandomIntInclusive(MIN_AGE, MAX_AGE)
}

const createReading = () : Reading => {
    const reading = {
        id:utilService.makeId(),
        pH: utilService.getRandomFloatInclusive(MIN_PH, MAX_PH),
        temp: utilService.getRandomFloatInclusive(MIN_TEMP, MAX_TEMP),
        ec: utilService.getRandomFloatInclusive(MIN_EC, MAX_EC),
        timestamp: new Date().toISOString(),
    }
    return  reading
}

const createReadings = () : Reading[] => {
    const readings = Array(READINGS_AMOUNT).fill(null).map(_ => createReading())
    return  readings 
}

const createPod = (): Pod  => {
    return {
        id: utilService.makeId(8),
        age: createRandomAge(),
    }
}

const createUnit = () => {
    const pods = Array(PODS_NUMBER).fill(null).map(_ => createPod())
          
    return {
        id: utilService.makeId(12),
        readings:createReadings(),
        pods,
        classification:undefined
    }
}

const createUnits = () => {
    
    const units = Array(TRAYS_NUMBER).fill(null).map(_ => createUnit())
    return  units 
}

const validateReading = (reading:Reading) => {
   return  (reading.pH < 5.5 || reading.pH > 7) ? false : true
}

export const getAlertsLocal = async (unitId:string) => {
    try {
        const units : Unit[]= localStorageService.load(UNITS_STORAGE_KEY)
        const unit = units.find(unit => unit.id === unitId)

        const problematicReadings: Reading[] = unit?.readings.filter((reading: Reading) => !validateReading(reading)) || [];

    const problematicReadingsSortedByDate = problematicReadings.sort(
        (a:Reading, b:Reading) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    return problematicReadingsSortedByDate.slice(0, 10);
    } catch (err) {
        console.error('Error getting alerts data:', err)
        return []
    }
}

const getInitialSensorData = () => {
       let units = localStorageService.load(UNITS_STORAGE_KEY)
       
        if(!units || !units.length) {
             units = createUnits()
             
            localStorageService.store(UNITS_STORAGE_KEY,units)
            return units
        }
    return units 
}

const sendSensorData = async (units:Unit[]) :Promise<Unit[]> => {
    
    units.forEach(unit => {
        const lastReading  = unit.readings[unit.readings.length-1]
        const classifiedResult = validateReading(lastReading) ? 
        { status: 'OK', classification: 'Healthy' }
        :
        { status: 'OK', classification: 'Needs Attention' }
        unit.validation = classifiedResult
    })
    return units
}

export const monitorLocalService = {
getInitialSensorData,
getAlertsLocal,
sendSensorData,
}