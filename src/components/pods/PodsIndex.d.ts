import type { Pod } from '../../types';
type PodsIndexProps = {
    pods: Pod[];
    unitId: string;
    onInspectUnit: () => void;
    status: {
        status: string;
        classification: string;
    } | undefined;
};
export declare const PodsIndex: ({ pods, unitId, onInspectUnit, status }: PodsIndexProps) => import("react/jsx-runtime").JSX.Element;
export {};
