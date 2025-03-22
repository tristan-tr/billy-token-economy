import {TaskDefinition} from "../interfaces/TaskDefinition.tsx";

export const taskDefinitions: TaskDefinition[] = [
    {
        id: 'video-task',
        name: 'Scrying Skill Circuits',
        description: 'Watch one full video from head captain prof. Porter.',
        rewardAmount: 13,
        repeatable: true
    },
    {
        id: 'lab-exercise-task',
        name: 'Chemistry Experiment',
        description: 'Complete one exercise from the lab assignment.',
        rewardAmount: 7,
        repeatable: true
    },
    {
        id: 'lecture-task',
        name: 'Attend a demonstration from the captain',
        description: 'Watch one multimedia lecture.',
        rewardAmount: 13,
        repeatable: true
    },
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
        rewardAmount: 19,
        repeatable: true
    },
    {
        id: 'shower-task',
        name: 'Washing in the ocean (1x/day)',
        description: 'Take a shower.',
        rewardAmount: 13,
        repeatable: true
    },
    {
        id: 'dishes-task',
        name: 'Wash the dishes',
        description: 'Do 5 dishes in the kitchen. Everything but utensils counts.',
        rewardAmount: 7,
        repeatable: true
    },
    {
        id: 'clean-room-task',
        name: 'Sweep the deck (1x/day)',
        description: 'Tidy your room.',
        rewardAmount: 7,
        repeatable: true
    }
    // {
    //     id: 'budget-task',
    //     name: "Quartermaster's Financial Duties (1x/day)",
    //     description: 'Look at and fix your budget.',
    //     rewardAmount: 3,
    //     repeatable: true
    // }
];