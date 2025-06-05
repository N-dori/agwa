import { MAX_PH, MIN_PH, pyMonitorService } from './monitorService'
import { httpService } from './http.service'
import { localStorageService } from './localStorage.service'
import type  { Reading, Unit }  from '../types'
import { utilService } from './util.service'

jest.mock('./http.service', () => ({
  httpService: {
    get: jest.fn(),
    post: jest.fn(),
  }
}))

jest.mock('./localStorage.service', () => ({
  localStorageService: {
    load: jest.fn(),
    store: jest.fn(),
  }
}))

describe('pyMonitorService', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  describe('pyMonitorService.sendSensorData', () => {
  it('should post sensor data and return three classified units', async () => {
    const mockSensorData: Unit[] = [
      { id: 'unit1', readings: [], pods: [], validation: undefined },
      { id: 'unit2', readings: [], pods: [], validation: undefined },
      { id: 'unit3', readings: [], pods: [], validation: undefined },
    ]

    const mockResponse = [
      {
        id: '18aiKSi8VF7v',
        readings: Array(100).fill({ id: 'r', pH: 6, temp: 22, ec: 2, timestamp: new Date().toISOString() }),
        pods: Array(20).fill({ id: 'p', age: 10 }),
        validation: { status: 'OK', classification: 'Healthy' },
      },
      {
        id: '9HJquzNe9Ug3',
        readings: Array(100).fill({ id: 'r', pH: 8, temp: 25, ec: 3, timestamp: new Date().toISOString() }),
        pods: Array(20).fill({ id: 'p', age: 20 }),
        validation: { status: 'OK', classification: 'Needs Attention' },
      },
      {
        id: 'fZvzWaFIseBn',
        readings: Array(100).fill({ id: 'r', pH: 5.5, temp: 24, ec: 2.5, timestamp: new Date().toISOString() }),
        pods: Array(20).fill({ id: 'p', age: 15 }),
        validation: { status: 'OK', classification: 'Healthy' },
      },
    ];

    (httpService.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await pyMonitorService.sendSensorData(mockSensorData);

    expect(httpService.post).toHaveBeenCalledWith('sensor', mockSensorData);
    expect(result).toHaveLength(3);

    result.forEach((unit:Unit) => {
      expect(unit).toHaveProperty('id');
      expect(Array.isArray(unit.readings)).toBe(true);
      expect(unit.readings.length).toBe(100);
      expect(Array.isArray(unit.pods)).toBe(true);
      expect(unit.pods.length).toBe(20);
      expect(unit).toHaveProperty('validation');
      expect(unit.validation).toEqual(
        expect.objectContaining({
          status: 'OK',
          classification: expect.stringMatching(/Healthy|Needs Attention/),
        })
      )
    })
  })
})

describe('getInitialSensorData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('should generate and store units if none exist', () => {
    (localStorageService.load as jest.Mock).mockReturnValue(null)

    const units = pyMonitorService.getInitialSensorData()

    expect(units).toHaveLength(3); // TRAYS_NUMBER
    expect(localStorageService.store).toHaveBeenCalledWith('units', units)
  });

  it('should return stored units if they exist', () => {
    const mockUnits = [{ id: 'unit1', readings: [], pods: [] }];
    (localStorageService.load as jest.Mock).mockReturnValue(mockUnits)

    const units = pyMonitorService.getInitialSensorData()

    expect(units).toEqual(mockUnits)
    expect(localStorageService.store).not.toHaveBeenCalled()
  })
})

describe('pyMonitorService.getAlerts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  });

  it('should return up to 10 problematic readings sorted by timestamp (newest first)', async () => {
    const mockReadings: Reading[] = Array.from({ length: 50 }, (_, i) => ({
      id: `r${i + 1}`,
      pH: utilService.getRandomFloatInclusive(MIN_PH,MAX_PH),
      temp: 22,
      ec: 2,
      timestamp: `2025-06-${String(i + 1).padStart(2, '0')}T10:00:00.000Z`,
    }))

    const expectedInvalid = mockReadings
    .filter(r => r.pH < 5.5 || r.pH > 7.0)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);

    (httpService.get as jest.Mock).mockResolvedValue(expectedInvalid)

    const result = await pyMonitorService.getAlerts('unit1')

    expect(httpService.get).toHaveBeenCalledWith('alerts', { unitId: 'unit1' })
    expect(result.length).toBeLessThanOrEqual(10)
    expect(result.map((r:Reading) => r.id)).toEqual(expectedInvalid.map(r => r.id))
  });

  it('should return an empty array if backend returns no data', async () => {
    (httpService.get as jest.Mock).mockResolvedValue([])

    const result = await pyMonitorService.getAlerts('unit1');
    expect(result).toEqual([])
  });

  it('should return an empty array and log error if backend throws error', async () => {
    const error = new Error('Backend failed');
    (httpService.get as jest.Mock).mockRejectedValue(error)

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const result = await pyMonitorService.getAlerts('unit1')

    expect(consoleSpy).toHaveBeenCalledWith('Error getting alerts data:', error)
    expect(result).toEqual([])

    consoleSpy.mockRestore()
  });
});

describe('pyMonitorService.getRandomSensorData', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  });

  it('should post generated sensor data and return server response', async () => {
    const mockResponse = [
      {
        id: 'unit1',
        readings: [],
        pods: [],
        classification: { status: 'OK', classification: 'Healthy' }
      },
      {
        id: 'unit2',
        readings: [],
        pods: [],
        classification: { status: 'Warning', classification: 'Needs Attention' }
      },
      {
        id: 'unit3',
        readings: [],
        pods: [],
        classification: { status: 'Error', classification: 'Needs Attention' }
      }
    ];

    // Mock httpService.post to return the mockResponse
    (httpService.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await pyMonitorService.getRandomSensorData();

    // The actual sensorData is random, but we know it's an array of 3 units
    expect(httpService.post).toHaveBeenCalledWith('sensor', expect.any(Array));
    expect(result).toEqual(mockResponse);
    expect(result).toHaveLength(3);
  })
})

})