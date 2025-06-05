import type { Reading, Unit } from "../types";
export declare const getAlertsLocal: (unitId: string) => Promise<Reading[]>;
export declare const monitorLocalService: {
    getInitialSensorData: () => any;
    getAlertsLocal: (unitId: string) => Promise<Reading[]>;
    sendSensorData: (units: Unit[]) => Promise<Unit[]>;
};
