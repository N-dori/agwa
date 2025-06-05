import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MonitorIndex } from './MonitorIndex';
import { pyMonitorService } from '../services/monitorService';
jest.mock('../services/monitorService');
const mockedGetInitialSensorData = pyMonitorService.getInitialSensorData;
const mockedSendSensorData = pyMonitorService.sendSensorData;
describe('MonitorIndex component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('closes the modal when the button is clicked', async () => {
        render(_jsx(MonitorIndex, {}));
        expect(screen.getByText(/Self-Introduction & Growth/i)).toBeInTheDocument();
        const closeBtn = screen.getByRole('button', { name: /Start Technical Exercise/i });
        fireEvent.click(closeBtn);
        await waitFor(() => {
            expect(screen.queryByText(/Self-Introduction & Growth/i)).not.toBeInTheDocument();
            expect(screen.getByText(/HydroSense Monitor/i)).toBeInTheDocument();
        });
    });
    it('fetches units from the service and sets them', async () => {
        const mockInitialUnits = [{ id: 'unit1', pods: [], readings: [], validation: undefined }];
        const mockClassifiedUnits = [{ id: 'unit1', pods: [], readings: [], validation: { status: "OK", classification: 'Healthy' } }];
        mockedGetInitialSensorData.mockReturnValue(mockInitialUnits);
        mockedSendSensorData.mockResolvedValue(mockClassifiedUnits);
        render(_jsx(MonitorIndex, {}));
        expect(mockedGetInitialSensorData).toHaveBeenCalled();
        await waitFor(() => {
            expect(mockedSendSensorData).toHaveBeenCalledWith(mockInitialUnits);
        });
    });
    it('opens the modal and fetches problematic readings when Inspect (in PodIndex) is clicked', async () => {
        const mockedReadings = [{ id: 'r1', pH: 7, temp: 22, ec: 1.2, timestamp: '2025-06-04T10:00:00.000Z' }];
        const mockedGetAlerts = pyMonitorService.getAlerts;
        mockedGetAlerts.mockResolvedValue(mockedReadings);
        // Render the component and close the intro modal
        render(_jsx(MonitorIndex, {}));
        const closeBtn = screen.getByRole('button', { name: /Start Technical Exercise/i });
        fireEvent.click(closeBtn);
        const unitRadio = await screen.findByRole('radio');
        fireEvent.click(unitRadio);
        // selecting a unit and clicking Inspect
        const inspectBtn = await screen.findByRole('button', { name: /Inspect/i });
        fireEvent.click(inspectBtn);
        await waitFor(() => {
            expect(mockedGetAlerts).toHaveBeenCalled();
            expect(screen.getByText(/List of 10 readings classified as Needs Attention/i)).toBeInTheDocument();
            expect(screen.getByTestId('unit-id')).toHaveTextContent('# unit1');
            expect(screen.getByRole('button', { name: /Back/i })).toBeInTheDocument();
        });
        fireEvent.click(screen.getByRole('button', { name: /Back/i }));
        await waitFor(() => {
            expect(screen.queryByText(/List of 10 readings classified as Needs Attention/i)).not.toBeInTheDocument();
        });
    });
});
