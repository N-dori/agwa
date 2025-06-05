import type { Unit } from '../../types';
type UnitPreviewProps = {
    unit: Unit;
    idx: number;
    setSelectedUnit: (id: string) => void;
    selectedUnit: string;
    onInspectUnit: () => void;
};
export declare const UnitPreview: ({ unit, idx, setSelectedUnit, selectedUnit, onInspectUnit }: UnitPreviewProps) => import("react/jsx-runtime").JSX.Element | undefined;
export {};
