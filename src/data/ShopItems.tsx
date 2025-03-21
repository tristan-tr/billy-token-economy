import { ShopItem } from "../interfaces/ShopItem.tsx";
import {useInventory} from "../components/useInventory.tsx";

function ShopItems(): ShopItem[] {
    const { hasSpyglass, setHasSpyglass } = useInventory();

    const items = [
        {
            id: 1,
            name: "Bilge Brew",
            description: "A rough-and-ready brew, cheap but hearty enough to weather any storm.",
            price: 31,
            action: () => {}
        },
        {
            id: 2,
            name: "Scribe's Favour",
            description: "A scribbler for hire- for when the quartermaster needs a break.",
            price: 41,
            action: () => {}
        },
        {
            id: 3,
            name: "Java Jade",
            description: "An exotic caramel-infused nectar to soothe your spirits.",
            price: 59,
            action: () => {}
        },
        {
            id: 4,
            name: "Piratfika",
            description: "An impromptu rendezvous at a port of your choosing.",
            price: 265,
            action: () => {}
        },
        {
            id: 5,
            name: "Devil’s Bones",
            description: "Cast these infernal bones and let fate decide your fortune on the seven seas.",
            price: 358,
            action: () => {}
        }
    ];

    if(!hasSpyglass) {
        items.push({
            id: -1,
            name: "Spyglass o’ Secrets",
            description: "A mystical spyglass that unveils the secrets of the Ferase Stras.",
            price: 97,
            action: () => {
                setHasSpyglass(true);
            }
        });
    }

    return items;
}

export default ShopItems;