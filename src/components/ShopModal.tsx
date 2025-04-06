import { motion } from "framer-motion";
import ShopCard from "./ShopCard";
import { ShopItem } from "../interfaces/ShopItem.tsx";
import ShopItems from "../data/ShopItems";

interface ShopModalProps {
    onClose: () => void;
    ducats: number;
    removeDucats: (amount: number) => void;
    hasSpyglass: boolean;
    setHasSpyglass: (value: boolean) => void;
}

function ShopModal({ ducats, removeDucats, hasSpyglass }: ShopModalProps) {
    const shopItems = ShopItems();

    const handlePurchase = (item: ShopItem) => {
        if (ducats >= item.price) {
            removeDucats(item.price);
            item.action();

            // Send email notification
            fetch("/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    subject: `Purchased ${item.name}`,
                    text: `Billy purchased ${item.name}: "${item.description}" for ${item.price} Ducats.`,
                }),
            }).then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
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
                        showDescription={hasSpyglass}
                    />
                ))}
            </div>
        </motion.div>
    );
}

export default ShopModal;