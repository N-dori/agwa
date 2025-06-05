import { jsx as _jsx } from "react/jsx-runtime";
import { fireEvent, render, screen } from "@testing-library/react";
import { PodsIndex } from "./PodsIndex";
import { classificationsTypes } from "../../utils/monitor";
describe('PodsIndex', () => {
    it('renders inside  input - unit id', () => {
        render(_jsx(PodsIndex, { pods: [], unitId: '123', onInspectUnit: () => { }, status: { status: '', classification: '' } }));
        const unitInput = screen.getByTestId('unit-input');
        expect(unitInput).toHaveValue('Unit - 123');
    });
    it('renders a massage with Unit Status ', () => {
        render(_jsx(PodsIndex, { pods: [], unitId: '123', onInspectUnit: () => { }, status: { status: '', classification: classificationsTypes.HEALTHY } }));
        const unitStatus = screen.getByTestId('unit-status');
        expect(unitStatus).toHaveTextContent('Unit Status : Healthy');
    });
    it('renders a massage with Unit Status ', () => {
        render(_jsx(PodsIndex, { pods: [], unitId: '123', onInspectUnit: () => { }, status: { status: '', classification: classificationsTypes.NEEDS_ATTENTION } }));
        const unitStatus = screen.getByTestId('unit-status');
        expect(unitStatus).toHaveTextContent('Unit Status : Needs Attention');
    });
    it('calls onInspectUnit when Inspect button is clicked', () => {
        const mockOnInspectUnit = jest.fn();
        render(_jsx(PodsIndex, { pods: [], unitId: '123', onInspectUnit: mockOnInspectUnit, status: { status: '', classification: classificationsTypes.HEALTHY } }));
        const inspectBtn = screen.getByRole('button', { name: /Inspect/i });
        fireEvent.click(inspectBtn);
        expect(mockOnInspectUnit).toHaveBeenCalled();
    });
    it('calls onInspectUnit and opens the modal when Inspect button is clicked', async () => {
        const mockOnInspectUnit = jest.fn();
        render(_jsx(PodsIndex, { pods: [], unitId: '123', onInspectUnit: mockOnInspectUnit, status: { status: '', classification: classificationsTypes.HEALTHY } }));
        const inspectBtn = screen.getByRole('button', { name: /Inspect/i });
        fireEvent.click(inspectBtn);
        expect(mockOnInspectUnit).toHaveBeenCalled();
    });
});
