import { useEffect, useState } from 'react'
import { Modal } from '../components/Modal'
import { modalTypes } from '../utils/modal'
import type { Reading, Unit } from '../types'
import { UnitsIndex } from '../components/units/UnitsIndex'
import { pyMonitorService } from '../services/monitorService'
import { UserMsg } from '../components/UserMsg'
import { GreenPlant } from '../assets/svgs/GreenPlant'
// import { monitorLocalService } from '../services/monitorLocal.service'

type Props = {}

export const  MonitorIndex = ({}: Props) => {
const [units, setUnits] = useState<Unit[]>([]);
const [isModalShown, setIsModalShown] = useState<boolean>(true)
const [modalType, setModalType] = useState<string>(modalTypes.INTRO)
const [selectedUnit, setSelectedUnit] = useState<string>('') 
const [problematicReadings, setProblematicReadings] = useState<Reading[]>([]) 
const [userMsg, setUserMsg] = useState<string>('') 



useEffect(() => {
  fetchUnits();  
}, []);

const fetchUnits = async () => {
  // const initialUnitsData =  monitorLocalService.getInitialSensorData();
  // const classifiedUnits = await monitorLocalService.sendSensorData(initialUnitsData)
  
  const initialUnitsData =  pyMonitorService.getInitialSensorData();
  const classifiedUnits = await pyMonitorService.sendSensorData(initialUnitsData);
  
  setUnits(classifiedUnits);
}

const onInspectUnit = async () => {
setModalType(modalTypes.INSPECT)
setIsModalShown(true)
// const problematicReadings =  await monitorLocalService.getAlertsLocal(selectedUnit)
const problematicReadings = await pyMonitorService.getAlerts(selectedUnit)
setProblematicReadings(problematicReadings)
}

const onGenerateRandomReadings = async () => {
  const randomUnitsData = await pyMonitorService.getRandomSensorData();
  if(randomUnitsData) {
    setUserMsg('Random Readings Generated successfully')
    window?.scrollTo(0,0)
    setTimeout(() => {
      setUserMsg('')
    }, 6000);
  }
  setUnits(randomUnitsData);
}

const unitIndexProps = {
units,
setSelectedUnit,
selectedUnit,
onInspectUnit
} 

const modalProps = {
  type: modalType,
  setIsModalShown,
  problematicReadings,
  selectedUnit
}
 
  return (
    <section className="monitor-container grid">
      <h1 className="monitor-title center">~HydroSense Monitor~</h1>
      <h2 className="monitor-subtitle center">Healthy Plants, Happy Growers<GreenPlant size={50}/></h2>
      <h3 className="monitor-subtitle center">60 plants per cabin — inspect any tray to check their status</h3>

      <section className="units-container flex-col flex-jc"> 
        <UnitsIndex {...unitIndexProps} />
        <button onClick={onGenerateRandomReadings} className="btn random">Generate Random Readings</button>
      </section>
      {isModalShown && 
        <>
          <Modal {...modalProps} />
          <div className="modal-overlay"></div>
        </>
      }
      <UserMsg txt={userMsg}/>
    </section>
  )
}