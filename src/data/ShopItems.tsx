import { ShopItem } from "../interfaces/ShopItem.tsx";
import {useInventory} from "../components/useInventory.tsx";

function ShopItems(): ShopItem[] {
    const { hasSpyglass, setHasSpyglass } = useInventory();

    const items = [
        {
            id: 1,
            name: "Bilge Brew",
            description: "Cheap coffee from the grocery store",
            price: 31,
            action: () => {}
        },
        {
            id: 2,
            name: "Scribe's Favour",
            description: "I will do one administrative task for you",
            price: 41,
            action: () => {}
        },
        {
            id: 3,
            name: "Java Jade",
            description: "Starbucks Caramel Macchiato Coffee",
            price: 59,
            action: () => {}
        },
        {
            id: 4,
            name: "Piratfika",
            description: "Fika at a place of your choosing",
            price: 265,
            action: () => {}
        },
        {
            id: 5,
            name: "Devil’s Bones",
            description: "Surprise D&D dice set",
            price: 358,
            action: () => {}
        }
    ];

    if(!hasSpyglass) {
        items.push({
            id: -1,
            name: "Spyglass o’ Secrets",
            description: "Reveals the description of all shop items",
            price: 97,
            action: () => {
                setHasSpyglass(true);
            }
        });
    }

    return items;
}

export default ShopItems;