import type { Reading } from '../types';
type Props = {
    type: string;
    setIsModalShown: (isModalShown: boolean) => void;
    problematicReadings: Reading[];
    selectedUnit: string;
};
export declare const Modal: ({ type, setIsModalShown, problematicReadings, selectedUnit }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
