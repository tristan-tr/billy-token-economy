import { useInventory } from './InventoryContext';

const InventoryDisplay = () => {
    const { ducats } = useInventory();
    return (
        <div className="fixed top-4 right-4 px-4 py-2 bg-amber-50 text-red-800 font-bold border-4 border-yellow-900 rounded-lg shadow-lg">
            Ducats: <span className="text-amber-600">{ducats}</span>
        </div>
    );
};

export default InventoryDisplay;