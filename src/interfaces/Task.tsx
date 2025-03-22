import {TaskDefinition} from "./TaskDefinition.tsx";

export interface Task extends TaskDefinition {
    image: string;
    rewardText: string;
    redeemReward: () => void;
    completed: boolean;
    parent?: string;
}