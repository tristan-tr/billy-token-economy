import {TaskDefinition} from "../interfaces/TaskDefinition.tsx";

export const taskDefinitions: TaskDefinition[] = [
    {
        id: 'admin-task',
        name: "Quartermaster's Paperwork",
        description: 'Complete one administrative task.',
        rewardAmount: 29,
        repeatable: true
    },
    {
        id: 'weekly-task',
        name: 'Mend the sails',
        description: 'Do one of your weekly tasks.',
        rewardAmount: 13,
        repeatable: true
    },
    {
        id: 'shower-task',
        name: 'Washing in the ocean (1x/day)',
        description: 'Take a shower.',
        rewardAmount: 13,
        repeatable: true,
        repeatFrequencyDays: 1
    },
    {
        id: 'dishes-task',
        name: 'Wash the dishes',
        description: 'Do 5 dishes in the kitchen. Everything but utensils counts.',
        rewardAmount: 11,
        repeatable: true
    },
    {
        id: 'clean-room-task',
        name: 'Sweep the deck (1x/day)',
        description: 'Tidy your room.',
        rewardAmount: 7,
        repeatable: true,
        repeatFrequencyDays: 1
    },
    {
        id: 'meds-task',
        name: 'Take your meds (1x/day)',
        description: 'Take your meds.',
        rewardAmount: 1,
        repeatable: true,
        repeatFrequencyDays: 1
    },
    {
        id: 'exercise-task',
        name: 'Exercise (1x/2days)',
        description: 'Exercise your arms to keep them in shape for hoisting sails. (3 sets of push-ups)',
        rewardAmount: 11,
        repeatable: true,
        repeatFrequencyDays: 2
    },
    {
        id: 'self-reflection-task',
        name: 'Self Reflection (1x/week)',
        description: 'Spend some time reflecting on the actions of the captain.',
        rewardAmount: 17,
        repeatable: true,
        repeatFrequencyDays: 7
    }
    // {
    //     id: 'dinner-task',
    //     name: "Cooking Duty (1x)",
    //     description: 'Make dinner for the crew.',
    //     rewardAmount: 11,
    //     repeatable: false
    // },
    // {
    //     id: 'budget-task',
    //     name: "Quartermaster's Financial Duties (1x/day)",
    //     description: 'Look at and fix your budget.',
    //     rewardAmount: 3,
    //     repeatable: true
    // }
];