export interface Task {
    id: number;
    name: string;
    description: string;
    image: string;
    tokenReward: number;
    completed: boolean;
    parent?: number;
}