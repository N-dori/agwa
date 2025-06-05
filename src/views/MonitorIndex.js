import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Modal } from '../components/Modal';
import { modalTypes } from '../utils/modal';
import { UnitsIndex } from '../components/units/UnitsIndex';
import { pyMonitorService } from '../services/monitorService';
import { UserMsg } from '../components/UserMsg';
import { GreenPlant } from '../assets/svgs/GreenPlant';
export const MonitorIndex = ({}) => {
    const [units, setUnits] = useState([]);
    const [isModalShown, setIsModalShown] = useState(true);
    const [modalType, setModalType] = useState(modalTypes.INTRO);
    const [selectedUnit, setSelectedUnit] = useState('');
    const [problematicReadings, setProblematicReadings] = useState([]);
    const [userMsg, setUserMsg] = useState('');
    useEffect(() => {
        fetchUnits();
    }, []);
    const fetchUnits = async () => {
        // const initialUnitsData =  monitorLocalService.getInitialSensorData();
        // const classifiedUnits = await monitorLocalService.sendSensorData(initialUnitsData)
        const initialUnitsData = pyMonitorService.getInitialSensorData();
        const classifiedUnits = await pyMonitorService.sendSensorData(initialUnitsData);
        setUnits(classifiedUnits);
    };
    const onInspectUnit = async () => {
        setModalType(modalTypes.INSPECT);
        setIsModalShown(true);
        // const problematicReadings =  await monitorLocalService.getAlertsLocal(selectedUnit)
        const problematicReadings = await pyMonitorService.getAlerts(selectedUnit);
        setProblematicReadings(problematicReadings);
    };
    const onGenerateRandomReadings = async () => {
        const randomUnitsData = await pyMonitorService.getRandomSensorData();
        if (randomUnitsData) {
            setUserMsg('Random Readings Generated successfully');
            window?.scrollTo(0, 0);
            setTimeout(() => {
                setUserMsg('');
            }, 6000);
        }
        setUnits(randomUnitsData);
    };
    const unitIndexProps = {
        units,
        setSelectedUnit,
        selectedUnit,
        onInspectUnit
    };
    const modalProps = {
        type: modalType,
        setIsModalShown,
        problematicReadings,
        selectedUnit
    };
    return (_jsxs("section", { className: "monitor-container grid", children: [_jsx("h1", { className: "monitor-title center", children: "~HydroSense Monitor~" }), _jsxs("h2", { className: "monitor-subtitle center", children: ["Healthy Plants, Happy Growers", _jsx(GreenPlant, { size: 50 })] }), _jsx("h3", { className: "monitor-subtitle center", children: "60 plants per cabin \u2014 inspect any tray to check their status" }), _jsxs("section", { className: "units-container flex-col flex-jc", children: [_jsx(UnitsIndex, { ...unitIndexProps }), _jsx("button", { onClick: onGenerateRandomReadings, className: "btn random", children: "Generate Random Readings" })] }), isModalShown &&
                _jsxs(_Fragment, { children: [_jsx(Modal, { ...modalProps }), _jsx("div", { className: "modal-overlay" })] }), _jsx(UserMsg, { txt: userMsg })] }));
};
