import {createContext, useContext, ReactNode, useEffect, useRef} from 'react';
import useLocalStorage from 'use-local-storage';

interface Inventory {
    ducats: number;
    addDucats: (amount: number) => void;
    removeDucats: (amount: number) => void;
}

const InventoryContext = createContext<Inventory | undefined>(undefined);

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
    const [ducats, setDucats] = useLocalStorage<number>('ducats', 0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Create audio element when component mounts
        audioRef.current = new Audio('/coin-clatter.mp3');
        return () => {
            // Cleanup when component unmounts
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    const addDucats = (amount: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(err => console.error("Audio play failed:", err));
        }

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
