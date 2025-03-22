import { useState, ReactNode, useCallback, useEffect } from 'react';
import useLocalStorage from 'use-local-storage';
import { MapTask } from "../interfaces/MapTask";
import { TaskContext, PathAnimation } from './TaskContext';
import {createTaskInstance, generateInitialTasks, generateRepeatableTask} from '../services/TaskGenerator';
import { useInventory } from "./useInventory";
import { taskDefinitions } from '../data/TaskDefinitions';
import {LocationsMap} from "../data/Locations.tsx";

interface CompletedTaskData {
    [instanceId: string]: boolean;
}

interface StoredTaskData {
    instanceId: string;
    definitionId: string;
    locationName?: string;
    parent?: string;
}

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const { addDucats } = useInventory();

    // Store task completion state
    const [completedTasks, setCompletedTasks] = useLocalStorage<CompletedTaskData>('completed-tasks', {});

    // Store minimal task data instead of full instances
    const [storedTasks, setStoredTasks] = useLocalStorage<StoredTaskData[]>('stored-tasks', []);

    // Active tasks - fully built from stored data
    const [tasks, setTasks] = useState<MapTask[]>([]);

    // Path animations
    const [activePathAnimations, setActivePathAnimations] = useState<PathAnimation[]>([]);

    const visibleMarkers = tasks.reduce((visible, task) => {
        // Initial tasks with no parent are visible
        if (!task.parent) {
            visible[task.instanceId] = true;
            return visible;
        }

        // Tasks whose parents are completed are visible
        const parentTask = tasks.find(t => t.instanceId === task.parent);
        if (parentTask && completedTasks[parentTask.instanceId]) {
            visible[task.instanceId] = true;
        }

        // Tasks that are destinations of active path animations are invisible
        if (activePathAnimations.some(path => path.endTaskId === task.instanceId)) {
            visible[task.instanceId] = false;
        }

        return visible;
    }, {} as Record<string, boolean>);

    // Initialize task system
    useEffect(() => {
        if (storedTasks.length === 0) {
            // First run - generate initial tasks and extract minimal data for storage
            const initialTasks = generateInitialTasks();

            const initialStoredData: StoredTaskData[] = initialTasks.map(task => ({
                instanceId: task.instanceId,
                definitionId: task.definitionId,
                locationName: Object.keys(LocationsMap).find(
                    key => LocationsMap[key].x === task.position.x && LocationsMap[key].y === task.position.y
                ),
                parent: task.parent
            }));

            setStoredTasks(initialStoredData);
        }

        // Rebuild full tasks from stored data
        const builtTasks: MapTask[] = storedTasks.map(storedTask => {
            const taskDef = taskDefinitions.find(def => def.id === storedTask.definitionId);
            if (!taskDef) {
                throw new Error(`Task definition not found for ${storedTask.definitionId}`);
            }

            const task = createTaskInstance(
                taskDef,
                storedTask.parent,
                storedTask.locationName
            );

            // Override instance ID to match stored ID
            task.instanceId = storedTask.instanceId;
            task.id = storedTask.instanceId;
            task.completed = completedTasks[storedTask.instanceId] || false;
            task.redeemReward = () => {
                addDucats(taskDef.rewardAmount);
            };

            return task;
        });

        setTasks(builtTasks);
    }, [storedTasks, completedTasks, addDucats, setStoredTasks]);

    const handleTaskComplete = useCallback((instanceId: string) => {
        const completedTask = tasks.find(task => task.instanceId === instanceId);
        if (!completedTask) return;

        // Mark task as completed and apply reward
        completedTask.redeemReward();

        // Update persisted completion state
        setCompletedTasks(prev => ({
            ...prev,
            [instanceId]: true
        }));

        // Create array to collect all path animations we'll need
        let newPaths: PathAnimation[] = [];

        // Generate new task instances if this was a repeatable task
        if (completedTask.repeatable) {
            const definition = taskDefinitions.find(def => def.id === completedTask.definitionId);
            if (definition && definition.repeatable) {
                const newTask = generateRepeatableTask(
                    completedTask.definitionId,
                    completedTask.instanceId
                );

                if (newTask) {
                    // Store only essential data for the new task
                    const locationName = Object.keys(LocationsMap).find(
                        key => LocationsMap[key].x === newTask.position.x && LocationsMap[key].y === newTask.position.y
                    );

                    const newStoredTask: StoredTaskData = {
                        instanceId: newTask.instanceId,
                        definitionId: newTask.definitionId,
                        locationName,
                        parent: newTask.parent
                    };

                    // Add the new minimal task data
                    setStoredTasks(prev => [...prev || [], newStoredTask]);

                    // Add path animation from completed task to new task
                    newPaths.push({
                        id: `path-${instanceId}-${newTask.instanceId}`,
                        startTaskId: instanceId,
                        endTaskId: newTask.instanceId,
                    });
                }
            }
        }

        // Find child tasks that should now be revealed
        const childTasks = tasks.filter(task => task.parent === instanceId);

        // Create path animations for each newly revealed child task
        const childPaths: PathAnimation[] = childTasks.map(childTask => ({
            id: `path-${instanceId}-${childTask.instanceId}`,
            startTaskId: instanceId,
            endTaskId: childTask.instanceId,
        }));

        // Combine all path animations
        newPaths = [...newPaths, ...childPaths];

        // Update path animations state
        setActivePathAnimations(prev => [...prev, ...newPaths]);
    }, [tasks, setCompletedTasks, setStoredTasks]);

    const handlePathComplete = (pathId: string) => {
        // Remove the completed path animation
        setActivePathAnimations(prev =>
            prev.filter(path => path.id !== pathId)
        );
    };

    return (
        <TaskContext.Provider value={{
            tasks,
            visibleMarkers,
            activePathAnimations,
            handleTaskComplete,
            handlePathComplete
        }}>
            {children}
        </TaskContext.Provider>
    );
};