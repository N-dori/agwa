import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PhSvg } from '../../assets/svgs/PhSvg';
import { TempSvg } from '../../assets/svgs/TempSvg';
import { EcSvg } from '../../assets/svgs/EcSvg';
import { DateSvg } from '../../assets/svgs/DateSvg';
import { ProblematicReadingsList } from './ProblematicReadingsList';
export const ProblematicReadingsTable = ({ problematicReadings, selectedUnit, setIsModalShown }) => {
    const tableHead = [
        _jsx("span", { className: "num", children: "#" }, "num"),
        _jsx(PhSvg, {}, "ph"),
        _jsx(TempSvg, {}, "temp"),
        _jsx(EcSvg, {}, "ec"),
        _jsx(DateSvg, {}, "date")
    ].map((item, idx) => _jsx("div", { className: "head-item flex-jc-ac", children: item }, idx));
    return (_jsxs("section", { className: "problematic-readings-container flex-col flex-ac", children: [_jsxs("h2", { className: "table-title center", children: ["List of 10 readings classified as Needs Attention for  unit", _jsxs("small", { "data-testid": "unit-id", className: "unit-id", children: ["# ", selectedUnit] })] }), _jsxs("div", { className: "problematic-readings-table grid", children: [tableHead.map((item) => item), _jsx(ProblematicReadingsList, { problematicReadings: problematicReadings })] }), _jsx("button", { className: "btn center", onClick: () => setIsModalShown(false), children: "Back" })] }));
};
