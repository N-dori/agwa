import type { Unit } from '../../types';
type UnitsListProps = {
    units: Unit[];
    setSelectedUnit: (id: string) => void;
    selectedUnit: string;
    onInspectUnit: () => void;
};
export declare const UnitsList: ({ units, setSelectedUnit, selectedUnit, onInspectUnit }: UnitsListProps) => import("react/jsx-runtime").JSX.Element[];
export {};
