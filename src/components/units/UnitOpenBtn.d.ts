import type { Unit } from '../../types';
type UnitOpenBtnProps = {
    unit: Unit;
    setSelectedUnit: (id: string) => void;
    selectedUnit: string;
    isHealthy: boolean;
};
export declare const UnitOpenBtn: ({ unit, selectedUnit, setSelectedUnit, isHealthy }: UnitOpenBtnProps) => import("react/jsx-runtime").JSX.Element;
export {};
