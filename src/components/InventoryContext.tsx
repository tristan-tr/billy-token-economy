import { createContext } from 'react';

export interface Inventory {
    ducats: number;
    addDucats: (amount: number) => void;
    removeDucats: (amount: number) => void;
}

export const InventoryContext = createContext<Inventory | undefined>(undefined);
