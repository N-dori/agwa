import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import dayjs from 'dayjs';
export const ProblematicReadingPreview = ({ problematicReading, idx }) => {
    if (!problematicReading)
        return;
    const { pH, temp, ec } = problematicReading;
    const date = dayjs(problematicReading.timestamp).format('DD-MM-YYYY');
    return (_jsxs(_Fragment, { children: [_jsx("span", { children: idx + 1 }), _jsx("span", { children: pH }), _jsx("span", { children: temp }), _jsx("span", { children: ec }), _jsx("span", { className: "reading-timestamp", children: date })] }));
};
