import { v4 as uuidv4 } from 'uuid';
import { MapTask } from "../interfaces/MapTask";
import { taskDefinitions } from "../data/TaskDefinitions";
import { LocationsMap } from "../data/Locations";
import { getLocationImage } from "../data/LocationImages";
import {TaskDefinition} from "../interfaces/TaskDefinition.tsx";

export const getRandomLocation = () => {
    const keys = Object.keys(LocationsMap);
    const randomLocationName = keys[Math.floor(Math.random() * keys.length)];
    return {
        name: randomLocationName,
        position: LocationsMap[randomLocationName]
    };
};

export const createTaskInstance = (
    taskDef: TaskDefinition,
    parentInstanceId?: string,
    locationName?: string
): MapTask => {
    // For fixed location tasks (non-repeatable), use the specified location
    // For repeatable tasks, either use provided location or get random one
    const location = taskDef.initialLocation
        ? { name: taskDef.initialLocation, position: LocationsMap[taskDef.initialLocation] }
        : locationName
            ? { name: locationName, position: LocationsMap[locationName] }
            : getRandomLocation();

    const instanceId = `${taskDef.id}-${uuidv4()}`;

    return {
        id: instanceId,
        name: taskDef.name,
        description: taskDef.description,
        image: getLocationImage(location.name),
        rewardText: `${taskDef.rewardAmount} Ducats`,
        rewardAmount: taskDef.rewardAmount,
        redeemReward: () => {}, // Will be replaced by TaskProvider
        completed: false,
        position: location.position,
        instanceId: instanceId,
        definitionId: taskDef.id,
        repeatable: taskDef.repeatable,
        parent: parentInstanceId
    };
};

export const generateInitialTasks = (): MapTask[] => {
    const initialTasks: MapTask[] = [];

    for (const taskDefId in taskDefinitions) {
        const taskDef = taskDefinitions[taskDefId];
        initialTasks.push(createTaskInstance(taskDef));
    }

    return initialTasks;
};

export const generateRepeatableTask = (
    definitionId: string,
    parentInstanceId: string
): MapTask | null => {
    const taskDef = taskDefinitions.find(def => def.id === definitionId);
    if (!taskDef || !taskDef.repeatable) return null;

    return createTaskInstance(taskDef, parentInstanceId);
};