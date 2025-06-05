import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import { UnitPreview } from './UnitPreview';
import { classificationsTypes } from '../../utils/monitor';
import { UniteLevel } from './UniteLevel';
import { UnitQuantity } from './UnitQuantity';
import { UnitOpenBtn } from './UnitOpenBtn';
const mockUnit = {
    id: 'u1',
    pods: [],
    readings: [],
    validation: { status: '', classification: '' }
};
const healthyUnit = {
    ...mockUnit,
    validation: { status: '', classification: classificationsTypes.HEALTHY }
};
const unhealthyUnit = {
    ...mockUnit,
    validation: { status: '', classification: classificationsTypes.NEEDS_ATTENTION }
};
describe('UnitPreview', () => {
    it('renders green border for healthy unit', () => {
        render(_jsx(UnitPreview, { unit: healthyUnit, idx: 0, setSelectedUnit: () => { }, selectedUnit: "", onInspectUnit: () => { } }));
        const panel = screen.getByTestId('unit-panel');
        expect(panel).not.toHaveClass('unhealthy');
    });
    it('renders red border for unhealthy unit', () => {
        render(_jsx(UnitPreview, { unit: unhealthyUnit, idx: 0, setSelectedUnit: () => { }, selectedUnit: "", onInspectUnit: () => { } }));
        const panel = screen.getByTestId('unit-panel');
        expect(panel).toHaveClass('unhealthy');
    });
    it('renders PodsIndex when selectedUnit matches unit.id', () => {
        render(_jsx(UnitPreview, { unit: mockUnit, idx: 0, setSelectedUnit: () => { }, selectedUnit: "u1", onInspectUnit: () => { } }));
        expect(screen.getByDisplayValue('Unit - u1')).toBeInTheDocument();
    });
    it('does not render PodsIndex when selectedUnit does not match unit.id', () => {
        render(_jsx(UnitPreview, { unit: mockUnit, idx: 0, setSelectedUnit: () => { }, selectedUnit: "123", onInspectUnit: () => { } }));
        expect(screen.queryByDisplayValue('Unit - u1')).not.toBeInTheDocument();
    });
    describe('UniteLevel', () => {
        render(_jsx(UniteLevel, { idx: 1 }));
        const trays = screen.getAllByTestId('tray');
        expect(trays).toHaveLength(3);
        expect(trays[0]).not.toHaveClass('bold');
        expect(trays[1]).toHaveClass('bold');
        expect(trays[2]).not.toHaveClass('bold');
    });
    describe('UnitQuantity', () => {
        it('renders "Top" for idx===0', () => {
            render(_jsx(UnitQuantity, { idx: 0, unitQuantity: 20 }));
            expect(screen.getByText('Top')).toBeInTheDocument();
        });
        it('renders "Middle" for idx===1', () => {
            render(_jsx(UnitQuantity, { idx: 1, unitQuantity: 20 }));
            expect(screen.getByText('Middle')).toBeInTheDocument();
        });
        it('renders "Bottom" for idx=2', () => {
            render(_jsx(UnitQuantity, { idx: 2, unitQuantity: 10 }));
            expect(screen.getByText('Bottom')).toBeInTheDocument();
        });
    });
    describe('UnitOpenBtn', () => {
        it('renders a green circle for custom btn', () => {
            render(_jsx(UnitOpenBtn, { unit: healthyUnit, selectedUnit: '', setSelectedUnit: () => { }, isHealthy: true }));
            const customRadio = screen.getByTestId('custom-radio');
            expect(customRadio).not.toHaveClass('unhealthy');
        });
        it('renders a red circle for custom btn ', () => {
            render(_jsx(UnitOpenBtn, { unit: unhealthyUnit, selectedUnit: '', setSelectedUnit: () => { }, isHealthy: false }));
            const customRadio = screen.getByTestId('custom-radio');
            expect(customRadio).toHaveClass('unhealthy');
        });
    });
});
