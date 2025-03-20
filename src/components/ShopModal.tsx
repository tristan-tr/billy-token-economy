import { motion } from "framer-motion";
import ShopCard from "./ShopCard";
import { ShopItem } from "../interfaces/ShopItem.tsx";

interface ShopModalProps {
    onClose: () => void;
    ducats: number;
    removeDucats: (amount: number) => void;
}

function ShopModal({ ducats, removeDucats }: ShopModalProps) {
    const shopItems: ShopItem[] = [
        {
            id: 1,
            name: "Ship Upgrade",
            description: "Improve your ship's speed and durability",
            price: 100,
            action: () => {
                console.log("Ship upgraded!");
            }
        },
        {
            id: 2,
            name: "New Cannon",
            description: "Add a powerful cannon to your arsenal",
            price: 150,
            action: () => {
                console.log("Cannon added!");
            }
        },
        {
            id: 3,
            name: "Treasure Map",
            description: "Reveals hidden treasures on the map",
            price: 200,
            action: () => {
                console.log("Treasures revealed!");
            }
        }
    ];

    const handlePurchase = (item: ShopItem) => {
        if (ducats >= item.price) {
            removeDucats(item.price);
            item.action();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-4 w-100 bg-amber-50 border-4 border-yellow-900 rounded-lg shadow-xl p-4"
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-red-800">Ferase Stras</h2>
                <span className="text-yellow-900 font-bold">{ducats} Ducats</span>
            </div>

            <div className="max-h-100 overflow-y-auto">
                {shopItems.map(item => (
                    <ShopCard
                        key={item.id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        canAfford={ducats >= item.price}
                        onPurchase={() => handlePurchase(item)}
                    />
                ))}
            </div>
        </motion.div>
    );
}

export default ShopModal;