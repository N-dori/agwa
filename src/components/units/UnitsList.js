import { jsx as _jsx } from "react/jsx-runtime";
import { UnitPreview } from './UnitPreview';
export const UnitsList = ({ units, setSelectedUnit, selectedUnit, onInspectUnit }) => {
    const UnitPreviewProps = {
        selectedUnit,
        setSelectedUnit,
        onInspectUnit,
    };
    return units?.map((unit, idx) => _jsx(UnitPreview, { unit: unit, idx: idx, ...UnitPreviewProps }, unit.id));
};
