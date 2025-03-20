import { motion } from 'framer-motion';

interface ShopCardProps {
    name: string;
    description: string;
    price: number;
    onPurchase: () => void;
    canAfford: boolean;
}

function ShopCard({ name, description, price, onPurchase, canAfford }: ShopCardProps) {
    return (
        <div className="bg-amber-100 border-2 border-yellow-700 rounded-lg p-3 mb-3">
            <h3 className="text-lg font-bold text-red-800">{name}</h3>
            <p className="text-sm text-yellow-900 mb-2">{description}</p>
            <div className="flex justify-between items-center">
                <span className="font-bold text-yellow-900">{price} Ducats</span>
                <motion.button
                    whileHover={{ scale: 1.05, cursor: 'pointer' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onPurchase}
                    disabled={!canAfford}
                    className={`px-3 py-1 rounded ${
                        canAfford
                            ? 'bg-yellow-600 text-amber-50 hover:bg-yellow-700'
                            : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    }`}
                >
                    Buy
                </motion.button>
            </div>
        </div>
    );
}

export default ShopCard;