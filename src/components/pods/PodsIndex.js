import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PodsList } from './PodsList';
import { classificationsTypes } from '../../utils/monitor';
import { HealthySvg } from '../../assets/svgs/HealthySvg';
import { AttentionSvg } from '../../assets/svgs/AttentionSvg';
export const PodsIndex = ({ pods, unitId, onInspectUnit, status }) => {
    const isHealthy = status?.classification === classificationsTypes.HEALTHY;
    return (_jsxs("section", { className: "pods-container flex-col", children: [_jsxs("p", { "data-testid": 'unit-status', className: `unit-status flex-jc gap-05 ${isHealthy ? '' : 'unhealthy'} center`, children: ["Unit Status : ", status?.classification, isHealthy ? _jsx(HealthySvg, {}) : _jsx(AttentionSvg, {})] }), _jsxs("div", { className: "input-container  flex-jc-ac ", children: [_jsx("input", { "data-testid": 'unit-input', className: "unit-input", type: "text", value: 'Unit - ' + unitId, readOnly: true }), _jsx("button", { onClick: onInspectUnit, type: 'button', className: "inspect-btn", children: "Inspect" })] }), _jsx(PodsList, { pods: pods })] }));
};
