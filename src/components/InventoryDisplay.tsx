import { useInventory } from './InventoryContext';
import { motion, AnimatePresence } from 'framer-motion';

const InventoryDisplay = () => {
    const { ducats } = useInventory();

    return (
        <div className="fixed top-4 right-4 px-4 py-2 bg-amber-50 text-red-800 font-bold border-4 border-yellow-900 rounded-lg shadow-lg">
            Ducats: {' '}
            <AnimatePresence mode="wait">
                <motion.span
                    key={ducats}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                    className="text-amber-600"
                >
                    {ducats}
                </motion.span>
            </AnimatePresence>
        </div>
    );
};

export default InventoryDisplay;