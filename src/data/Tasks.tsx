import {LocationsMap} from "./Locations.tsx";
import {MapTask} from "../interfaces/MapTask.tsx";
import {useInventory} from "../components/useInventory.tsx";
import penInkImage from '../images/pen-ink.jpg';
import envelopeImage from '../images/envelope.jpg';
import spyglassImage from '../images/spyglass.jpg';
import brokenSailsImage from '../images/broken-sails.webp';
import pirateMapImage from '../images/pirate-map.jpg';

function Tasks(): MapTask[] {
    const { addDucats } = useInventory();

    const getRandomLocation = () => {
        const keys = Object.keys(LocationsMap);
        return LocationsMap[keys[Math.floor(Math.random() * keys.length)]];
    }

    let videoId = 123;
    const createVideoTask = (parent: number): MapTask => {
        return {
            id: ++videoId,
            name: 'Scrying Skill Circuits',
            description: 'Watch one full video from head captain prof. Porter',
            image: spyglassImage,
            rewardText: '19 Ducats',
            redeemReward: () => addDucats(19),
            completed: false,
            parent: parent,
            position: getRandomLocation()
        }
    }

    let exerciseId = 1234;
    const createExerciseTask = (parent: number): MapTask => {
        return {
            id: ++exerciseId,
            name: 'Chemistry Experiment',
            description: 'Complete one exercise from the lab assignment',
            image: penInkImage,
            rewardText: '23 Ducats',
            redeemReward: () => addDucats(23),
            completed: false,
            parent: parent,
            position: getRandomLocation()
        }
    }

    let administrativeId = 12345;
    const createAdministrativeTask = (parent: number): MapTask => {
        return {
            id: ++administrativeId,
            name: 'Quartermaster’s Paperwork',
            description: 'Complete one administrative task',
            image: envelopeImage,
            rewardText: '29 Ducats',
            redeemReward: () => addDucats(29),
            completed: false,
            parent: parent,
            position: getRandomLocation()
        }
    }

    let selfCareId = 123456;
    const createSelfCareTask = (parent: number): MapTask => {
        return {
            id: ++selfCareId,
            name: 'Mend the sails',
            description: 'Do one of your weekly tasks',
            image: brokenSailsImage,
            rewardText: '13 Ducats',
            redeemReward: () => addDucats(13),
            completed: false,
            parent: parent,
            position: getRandomLocation()
        }
    }

    const startingTasks = [
        {
            id: 1,
            name: 'Adventure Awaits',
            description: 'You will need to complete a series of tasks to earn Ducats. These ducats can be used to purchase items in the shop.',
            image: pirateMapImage,
            rewardText: '13 Ducats',
            redeemReward: () => addDucats(13),
            completed: false,
            position: LocationsMap['Gadeshire']
        },
        {
            id: 2,
            name: 'First Steps',
            description: 'Most tasks can be repeated to earn more Ducats. Now, you will unlock your first real tasks.',
            image: pirateMapImage,
            rewardText: '47 Ducats',
            redeemReward: () => addDucats(47),
            completed: false,
            parent: 1,
            position: LocationsMap['Xalos']
        }
    ];

    // We need to have tasks be repeatable.
    // This is very ugly but I'm running out of time </3
    // So I'm just going to make 1000 tasks of each type
    const tasks = [
        ...startingTasks,
        createVideoTask(2),
        createExerciseTask(2),
        createAdministrativeTask(2),
        createSelfCareTask(2)
    ];

    for (let i = 0; i < 1000; i++) {
        // these ids are pre-incremented in the create functions (this is awful i know)
        tasks.push(createVideoTask(videoId));
        tasks.push(createExerciseTask(exerciseId));
        tasks.push(createAdministrativeTask(administrativeId));
        tasks.push(createSelfCareTask(selfCareId));
    }
    return tasks;
}

export default Tasks;
