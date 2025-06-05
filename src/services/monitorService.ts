import type { Pod, Reading, Unit } from "../types"
import { httpService } from "./http.service"
import { localStorageService } from "./localStorage.service"
import { utilService } from "./util.service"

export const MIN_PH = 5
export const MAX_PH = 6.5
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
        validation:undefined
    }
}

const createUnits = () => {
    const units = Array(TRAYS_NUMBER).fill(null).map(_ => createUnit())
    return  units 
}

const getInitialSensorData = () => {
    const units = localStorageService.load(UNITS_STORAGE_KEY)
        if(!units || !units?.length) {
            const units = createUnits()
            localStorageService.store(UNITS_STORAGE_KEY,units)
            return units
        }
    return units
}

const getRandomSensorData = async () => {
    try {
        const sensorData = createUnits()
        const res = await httpService.post('sensor', sensorData)
        return res
    } catch (err) {
        console.error('Error sending random sensor data:', err)
        return null
    }
}


const sendSensorData = async (sensorData:Unit[]) => {
    try {
        const res = await httpService.post('sensor', sensorData)
        return res
    } catch (err) {
        console.error('Error sending sensor data:', err)
    }
}

const getAlerts = async (unitId:string) => {
    try {
        const res = await httpService.get('alerts', { unitId });
        return res
    } catch (err) {
        console.error('Error getting alerts data:', err)
        return []
    }
}


export const pyMonitorService = {
getInitialSensorData,
sendSensorData,
getAlerts,
getRandomSensorData,
}