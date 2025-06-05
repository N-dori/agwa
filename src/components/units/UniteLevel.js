import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const UniteLevel = ({ idx }) => {
    return (_jsxs("section", { className: "trays-container flex-col", children: [_jsx("div", { "data-testid": "tray", className: `tray ${idx === 0 ? 'bold' : ''}` }), _jsx("div", { "data-testid": "tray", className: `tray ${idx === 1 ? 'bold' : ''}` }), _jsx("div", { "data-testid": "tray", className: `tray ${idx === 2 ? 'bold' : ''}` })] }));
};
