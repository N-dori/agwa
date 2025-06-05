import type { Unit } from "../types";
export declare const MIN_PH = 5;
export declare const MAX_PH = 6.5;
export declare const pyMonitorService: {
    getInitialSensorData: () => any;
    sendSensorData: (sensorData: Unit[]) => Promise<any>;
    getAlerts: (unitId: string) => Promise<any>;
    getRandomSensorData: () => Promise<any>;
};
