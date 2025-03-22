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
        id: 'exercise-task',
        name: 'Chemistry Experiment',
        description: 'Complete one exercise from the lab assignment.',
        rewardAmount: 7,
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
        id: 'selfcare-task',
        name: 'Mend the sails',
        description: 'Do one of your weekly tasks.',
        rewardAmount: 19,
        repeatable: true
    }
];