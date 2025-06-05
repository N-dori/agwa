import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { GreenLeafs } from '../../assets/svgs/GreenLeafs';
import { ProgressCircleSvg } from '../../assets/svgs/ProgressCircleSvg';
import { GreenPlant } from '../../assets/svgs/GreenPlant';
export const PodPreview = ({ pod }) => {
    const PodTooltip = () => {
        return _jsx("div", { className: "pod-tooltip", children: _jsxs("p", { className: "pod-age", children: [_jsx(GreenPlant, { size: 30 }), ` ${pod.age}% grown`] }) });
    };
    const percent = Math.max(0, Math.min(100, pod.age));
    return (_jsxs("div", { className: "pod-tooltip-wrapper", children: [_jsx(ProgressCircleSvg, { percent: percent }), _jsx("div", { className: "pod-container", children: _jsx(GreenLeafs, {}) }), _jsx(PodTooltip, {})] }));
};
