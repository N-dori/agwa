import { localStorageService } from './localStorage.service';
import { monitorLocalService } from './monitorLocal.service';
jest.mock('./localStorage.service', () => ({
    localStorageService: {
        load: jest.fn(),
        store: jest.fn(),
    },
}));
describe('monitorLocalService', () => {
    describe('getInitialSensorData', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it('should generate and store units if none exist', () => {
            localStorageService.load.mockReturnValue(null);
            const units = monitorLocalService.getInitialSensorData();
            expect(units).toHaveLength(3); // TRAYS_NUMBER
            expect(localStorageService.store).toHaveBeenCalledWith('units', units);
        });
        it('should return stored units if they exist', () => {
            const mockUnits = [{ id: 'unit1', readings: [], pods: [] }];
            localStorageService.load.mockReturnValue(mockUnits);
            const units = monitorLocalService.getInitialSensorData();
            expect(units).toEqual(mockUnits);
            expect(localStorageService.store).not.toHaveBeenCalled();
        });
    });
    describe('sendSensorData', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it('should classify each unit as Healthy or Needs Attention based on the last reading', async () => {
            const units = [
                {
                    id: 'unit1',
                    readings: [
                        { temp: 25, pH: 6.5, ec: 2, timestamp: '', id: 'r1' }, // Valid pH
                    ],
                    pods: [],
                    validation: undefined,
                },
                {
                    id: 'unit2',
                    readings: [
                        { temp: 50, pH: 9, ec: 5, timestamp: '', id: 'r2' }, // Invalid pH
                    ],
                    pods: [],
                    validation: undefined,
                },
            ];
            const result = await monitorLocalService.sendSensorData(units);
            expect(result[0].validation).toEqual({ status: 'OK', classification: 'Healthy' });
            expect(result[1].validation).toEqual({ status: 'OK', classification: 'Needs Attention' });
        });
    });
    describe('getAlertsLocal', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it('should return up to 10 problematic readings sorted by timestamp (newest first)', async () => {
            const mockUnits = [
                {
                    id: 'unit1',
                    pods: [],
                    validation: undefined,
                    readings: [
                        {
                            id: 'r1',
                            pH: 6.5, // valid
                            temp: 22,
                            ec: 2,
                            timestamp: '2025-06-01T10:00:00.000Z',
                        },
                        {
                            id: 'r2',
                            pH: 8.0, // invalid
                            temp: 22,
                            ec: 2,
                            timestamp: '2025-06-02T10:00:00.000Z',
                        },
                        {
                            id: 'r3',
                            pH: 4.0, // invalid
                            temp: 22,
                            ec: 2,
                            timestamp: '2025-06-03T10:00:00.000Z',
                        },
                    ],
                },
            ];
            localStorageService.load.mockReturnValue(mockUnits);
            const result = await monitorLocalService.getAlertsLocal('unit1');
            expect(result).toHaveLength(2);
            expect(result[0].id).toBe('r3'); // Newest invalid reading
            expect(result[1].id).toBe('r2'); // Older invalid reading
        });
        it('should return an empty array if unit is not found', async () => {
            localStorageService.load.mockReturnValue([]);
            const result = await monitorLocalService.getAlertsLocal('nonexistent');
            expect(result).toEqual([]);
        });
        it('should handle errors', async () => {
            const error = new Error('Load failed');
            localStorageService.load.mockImplementation(() => {
                throw error;
            });
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
            const result = await monitorLocalService.getAlertsLocal('unit1');
            expect(consoleSpy).toHaveBeenCalledWith('Error getting alerts data:', error);
            expect(result).toEqual([]);
            consoleSpy.mockRestore();
        });
    });
});
