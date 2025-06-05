import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const UnitOpenBtn = ({ unit, selectedUnit, setSelectedUnit, isHealthy }) => {
    return (_jsxs("label", { className: "radio-wrapper flex", children: [_jsx("input", { type: "radio", name: "tray", className: "open-tray-btn hidden", value: selectedUnit, onClick: () => setSelectedUnit(selectedUnit === unit?.id ? '' : unit?.id), checked: selectedUnit === unit?.id, readOnly: true }), _jsx("span", { "data-testid": "custom-radio", className: `custom-radio ${isHealthy ? '' : 'unhealthy'}` })] }));
};
