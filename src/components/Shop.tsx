import {AnimatePresence, motion} from 'framer-motion';
import {useState} from "react";
import {useInventory} from "./useInventory.tsx";
import ShopModal from "./ShopModal.tsx";

function Shop() {
    const {ducats, removeDucats} = useInventory();
    const [shopOpen, setShopOpen] = useState(false);

    const close = () => setShopOpen(false);
    const open = () => setShopOpen(true);

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.05, cursor: 'pointer' }}
                whileTap={{ scale: 0.95 }}
                className="fixed top-4 left-4 px-4 py-2 bg-amber-50 text-red-800 font-bold border-4 border-yellow-900 rounded-lg shadow-lg"
                onClick={() => (shopOpen ? close() : open())}
            >
                Shop
            </motion.button>
            <AnimatePresence>
                {shopOpen && (
                    <ShopModal
                        onClose={close}
                        ducats={ducats}
                        removeDucats={removeDucats}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

export default Shop;