export interface TaskDefinition {
    id: string;
    name: string;
    description: string;
    rewardAmount: number;
    repeatable: boolean;
    initialLocation?: string;
    repeatFrequencyDays?: number;
}