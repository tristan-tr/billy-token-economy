import { ReactNode, useEffect, useRef } from 'react';
import useLocalStorage from 'use-local-storage';
import { InventoryContext } from './InventoryContext';

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
    const [ducats, setDucats] = useLocalStorage<number>('ducats', 0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio('/coin-clatter.mp3');
        return () => {
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
        // @ts-ignore
        setDucats(prev => prev + amount);
    };

    const removeDucats = (amount: number) => {
        // @ts-ignore
        setDucats(prev => Math.max(prev - amount, 0));
    };

    return (
        <InventoryContext.Provider value={{ ducats, addDucats, removeDucats }}>
            {children}
        </InventoryContext.Provider>
    );
};
