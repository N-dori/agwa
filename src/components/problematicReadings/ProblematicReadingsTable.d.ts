import type { Reading } from '../../types';
type ProblematicReadingsTableProps = {
    problematicReadings: Reading[];
    selectedUnit: string;
    setIsModalShown: (isModalShown: boolean) => void;
};
export declare const ProblematicReadingsTable: ({ problematicReadings, selectedUnit, setIsModalShown }: ProblematicReadingsTableProps) => import("react/jsx-runtime").JSX.Element;
export {};
