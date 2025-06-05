import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PodPreview } from './PodPreview';
export const PodsList = ({ pods }) => {
    const podsNames = ['Lettuce', 'Arugula', 'Basil', 'Parsley', 'Mix',];
    return (_jsxs("section", { className: "pods-wrapper  grid", children: [podsNames.map((name, idx) => _jsx("div", { className: "row-name", children: name }, idx)), pods.map((pod) => _jsx(PodPreview, { pod: pod }, pod?.id))] }));
};
