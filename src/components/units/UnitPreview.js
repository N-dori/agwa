import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { UniteLevel } from './UniteLevel';
import { UnitQuantity } from './UnitQuantity';
import { UnitOpenBtn } from './UnitOpenBtn';
import { PodsIndex } from '../pods/PodsIndex';
import { classificationsTypes } from '../../utils/monitor';
export const UnitPreview = ({ unit, idx, setSelectedUnit, selectedUnit, onInspectUnit }) => {
    if (!unit)
        return;
    const isHealthy = unit?.validation?.classification === classificationsTypes.HEALTHY;
    return (_jsxs(_Fragment, { children: [_jsx("article", { className: "unit-container", children: _jsxs("section", { "data-testid": "unit-panel", className: `unit-panel ${isHealthy ? '' : 'unhealthy'} grid`, children: [_jsx(UniteLevel, { idx: idx }), selectedUnit !== unit.id &&
                            _jsx(UnitQuantity, { idx: idx, unitQuantity: unit.pods.length }), _jsx(UnitOpenBtn, { unit: unit, selectedUnit: selectedUnit, setSelectedUnit: setSelectedUnit, isHealthy: isHealthy })] }) }), selectedUnit === unit.id &&
                _jsx(PodsIndex, { pods: unit.pods, unitId: unit.id, onInspectUnit: onInspectUnit, status: unit.validation })] }));
};
