import { createContext } from 'react';

export interface Inventory {
    ducats: number;
    addDucats: (amount: number) => void;
    removeDucats: (amount: number) => void;
    hasSpyglass: boolean;
    setHasSpyglass: (value: boolean) => void;
}

export const InventoryContext = createContext<Inventory | undefined>(undefined);
