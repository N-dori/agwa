import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MAX_PODS_NUMBER } from '../../utils/monitor';
import { LeafSvg } from '../../assets/svgs/LeafSvg';
export const UnitQuantity = ({ idx, unitQuantity }) => {
    const getTrayPlacement = () => {
        switch (idx) {
            case 0:
                return 'Top';
            case 1:
                return 'Middle';
            case 2:
                return 'Bottom';
            default:
                break;
        }
    };
    return (_jsxs("div", { className: "quantity", children: [_jsx("div", { children: getTrayPlacement() }), _jsx("span", { children: MAX_PODS_NUMBER }), " ", _jsx("span", { children: " / " }), " ", _jsx("span", { children: unitQuantity }), _jsx("span", { className: "ml-05", children: _jsx(LeafSvg, {}) })] }));
};
