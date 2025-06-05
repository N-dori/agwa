export declare const utilService: {
    makeId: (length?: number) => string;
    makeLorem: (size?: number) => string;
    getRandomIntInclusive: (min: number, max: number) => number;
    getRandomFloatInclusive: (min: number, max: number) => number;
    randomPastTime: () => string;
    saveToStorage: (key: string, value: any) => void;
    loadFromStorage: (key: string) => any;
};
