import  { createContext, useContext, useState, ReactNode } from 'react';

interface Inventory {
    ducats: number;
    addDucats: (amount: number) => void;
    removeDucats: (amount: number) => void;
}

const InventoryContext = createContext<Inventory | undefined>(undefined);

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
    const [ducats, setDucats] = useState<number>(0);

    const addDucats = (amount: number) => {
        setDucats(prev => prev + amount);
    };

    const removeDucats = (amount: number) => {
        setDucats(prev => Math.max(prev - amount, 0));
    };

    return (
        <InventoryContext.Provider value={{ ducats, addDucats, removeDucats }}>
            {children}
        </InventoryContext.Provider>
    );
};

export const useInventory = () => {
    const context = useContext(InventoryContext);
    if (!context) {
        throw new Error('useInventory must be used within an InventoryProvider');
    }
    return context;
};
