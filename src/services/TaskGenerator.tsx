import { v4 as uuidv4 } from 'uuid';
import { MapTask } from "../interfaces/MapTask";
import { taskDefinitions } from "../data/TaskDefinitions";
import { LocationsMap } from "../data/Locations";
import { getLocationImage } from "../data/LocationImages";
import {TaskDefinition} from "../interfaces/TaskDefinition.tsx";

export const getRandomLocation = (existingTasks: MapTask[] = []) => {
    const keys = Object.keys(LocationsMap);

    // Find locations that are already occupied by tasks
    const occupiedLocations = existingTasks.map(task => {
        return Object.keys(LocationsMap).find(
            key => LocationsMap[key].x === task.position.x && LocationsMap[key].y === task.position.y
        );
    }).filter(Boolean) as string[];

    // Filter out occupied locations
    const availableLocations = keys.filter(key => !occupiedLocations.includes(key));

    // Pick a random location from available ones
    const randomLocationName = availableLocations[Math.floor(Math.random() * availableLocations.length)];
    return {
        name: randomLocationName,
        position: LocationsMap[randomLocationName]
    };
};

export const createTaskInstance = (
    taskDef: TaskDefinition,
    parentInstanceId?: string,
    locationName?: string,
    existingTasks: MapTask[] = []
): MapTask => {
    // For fixed location tasks (non-repeatable), use the specified location
    // For repeatable tasks, either use provided location or get random one
    const location = taskDef.initialLocation
        ? { name: taskDef.initialLocation, position: LocationsMap[taskDef.initialLocation] }
        : locationName
            ? { name: locationName, position: LocationsMap[locationName] }
            : getRandomLocation(existingTasks);

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

    for (const taskDef of taskDefinitions) {
        const newTask = createTaskInstance(taskDef, undefined, undefined, initialTasks);
        initialTasks.push(newTask);
    }

    return initialTasks;
};

export const generateRepeatableTask = (
    definitionId: string,
    parentInstanceId: string,
    existingTasks: MapTask[] = []
): MapTask | null => {
    const taskDef = taskDefinitions.find(def => def.id === definitionId);
    if (!taskDef || !taskDef.repeatable) return null;

    return createTaskInstance(taskDef, parentInstanceId, undefined, existingTasks);
};