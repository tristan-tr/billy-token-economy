export interface ShopItem {
    id: number;
    name: string;
    description: string;
    price: number;
    action: () => void;
}