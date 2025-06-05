import type { Unit } from '../../types';
type UnitsIndexProps = {
    units: Unit[];
    setSelectedUnit: (id: string) => void;
    selectedUnit: string;
    onInspectUnit: () => void;
};
export declare const UnitsIndex: ({ units, setSelectedUnit, selectedUnit, onInspectUnit }: UnitsIndexProps) => import("react/jsx-runtime").JSX.Element;
export {};
