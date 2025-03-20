import { ReactNode } from 'react';
import useLocalStorage from 'use-local-storage';
import { InventoryContext } from './InventoryContext';

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
    const [ducats, setDucats] = useLocalStorage<number>('ducats', 0);
    const [hasSpyglass, setHasSpyglass] = useLocalStorage<boolean>('hasSpyglass', false);

    const addDucats = (amount: number) => {
        new Audio('/coin-clatter.mp3').play();
        setDucats(prev => prev + amount);
    };

    const removeDucats = (amount: number) => {
        new Audio('/coin-clatter.mp3').play();
        setDucats(prev => Math.max(prev - amount, 0));
    };

    return (
        <InventoryContext.Provider value={{ ducats, addDucats, removeDucats, hasSpyglass, setHasSpyglass }}>
            {children}
        </InventoryContext.Provider>
    );
};
