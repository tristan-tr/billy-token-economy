import {LocationsMap} from "./Locations.tsx";
import {MapTask} from "../interfaces/MapTask.tsx";
import {useInventory} from "../components/useInventory.tsx";

function Tasks(): MapTask[] {
    const { addDucats } = useInventory();
    return [
        {
            id: 1,
            name: 'Find Treasure Map',
            description: 'Locate the ancient map in the tavern',
            image: '/map.png',
            rewardText: '50 Ducats',
            redeemReward: () => addDucats(50),
            completed: false,
            position: LocationsMap['Xalos']
        },
        {
            id: 2,
            name: 'Gather Crew',
            description: 'Recruit five seasoned pirates',
            image: '/crew.png',
            rewardText: '100 Ducats',
            redeemReward: () => addDucats(100),
            completed: false,
            position: LocationsMap['Caecavel']
        },
        {
            id: 3,
            name: 'Set Sail',
            description: 'Navigate to the marked location',
            image: '/sail.png',
            rewardText: '150 Ducats',
            redeemReward: () => addDucats(150),
            completed: false,
            parent: 2,
            position: LocationsMap['Sitiuya']
        },
        {
            id: 4,
            name: 'Combined',
            description: 'Navigate to the marked location',
            image: '/sail.png',
            rewardText: '150 Ducats',
            redeemReward: () => addDucats(150),
            completed: false,
            parent: 1,
            position: LocationsMap['Liligan']
        }
    ];
}

export default Tasks;
