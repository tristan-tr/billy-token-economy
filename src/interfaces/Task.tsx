export interface Task {
    id: number;
    name: string;
    description: string;
    image: string;
    rewardText: string
    redeemReward: () => void;
    completed: boolean;
    parent?: number;
}