import { jsx as _jsx } from "react/jsx-runtime";
import { UnitsList } from './UnitsList';
export const UnitsIndex = ({ units, setSelectedUnit, selectedUnit, onInspectUnit }) => {
    const UnitsListProps = {
        units,
        setSelectedUnit,
        selectedUnit,
        onInspectUnit
    };
    return (_jsx("section", { className: "units-wrapper flex-col", children: _jsx(UnitsList, { ...UnitsListProps }) }));
};
