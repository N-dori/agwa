import { jsx as _jsx } from "react/jsx-runtime";
import { ProblematicReadingPreview } from './ProblematicReadingPreview';
export const ProblematicReadingsList = ({ problematicReadings }) => {
    if (!problematicReadings)
        return _jsx("span", { children: "No Data" });
    return (problematicReadings.map((problematicReading, idx) => _jsx(ProblematicReadingPreview, { problematicReading: problematicReading, idx: idx }, problematicReading.id)));
};
