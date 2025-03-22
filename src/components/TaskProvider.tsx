import { useState, ReactNode, useCallback, useEffect } from 'react';
import useLocalStorage from 'use-local-storage';
import { MapTask } from "../interfaces/MapTask";
import { TaskContext, PathAnimation } from './TaskContext';
import { generateInitialTasks, generateRepeatableTask } from '../services/TaskGenerator';
import { useInventory } from "./useInventory";
import { taskDefinitions } from '../data/TaskDefinitions';

interface CompletedTaskData {
    [instanceId: string]: boolean;
}

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const { addDucats } = useInventory();

    // Store task completion state
    const [completedTasks, setCompletedTasks] = useLocalStorage<CompletedTaskData>('completed-tasks', {});

    // Store task instances (both initial and dynamically created)
    const [taskInstances, setTaskInstances] = useLocalStorage<MapTask[]>('task-instances', []);

    // Active tasks - merged with completion state
    const [tasks, setTasks] = useState<MapTask[]>([]);

    // Path animations
    const [activePathAnimations, setActivePathAnimations] = useState<PathAnimation[]>([]);

    // Visible markers
    const [visibleMarkers, setVisibleMarkers] = useLocalStorage<Record<string, boolean>>(
        'visible-markers',
        {}
    );

    // Initialize task system
    useEffect(() => {
        if (taskInstances.length === 0) {
            // First run - generate initial tasks
            const initialTasks = generateInitialTasks();

            // Make starting tasks visible
            const initialVisibleMarkers: Record<string, boolean> = {};
            initialTasks.slice(0, 2).forEach(task => {
                initialVisibleMarkers[task.instanceId] = true;
            });

            setTaskInstances(initialTasks);
            setVisibleMarkers(initialVisibleMarkers);
        }

        // Apply completion state to task instances
        const mergedTasks = taskInstances.map(task => ({
            ...task,
            completed: completedTasks[task.instanceId] || false,
            redeemReward: () => {
                const definition = taskDefinitions.find(def => def.id === task.definitionId);
                if (definition) addDucats(definition.rewardAmount);
            }
        }));

        setTasks(mergedTasks);
    }, [taskInstances, completedTasks, addDucats, setTaskInstances, setVisibleMarkers]);

    const handleTaskComplete = useCallback((instanceId: string) => {
        const completedTask = tasks.find(task => task.instanceId === instanceId);
        if (!completedTask) return;

        // Mark task as completed and apply reward
        const updatedTasks = tasks.map(task => {
            if (task.instanceId === instanceId) {
                task.completed = true;
                task.redeemReward();
            }
            return task;
        });
        setTasks(updatedTasks);

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
                    // Add the new task but don't mark it visible yet
                    setTaskInstances(prev => [...prev || [], newTask]);

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
    }, [tasks, setCompletedTasks, setTaskInstances]);

    const handlePathComplete = useCallback((pathId: string, endTaskId: string) => {
        // Remove the completed path animation
        setActivePathAnimations(prev =>
            prev.filter(path => path.id !== pathId)
        );

        // Make the end task marker visible with animation
        setVisibleMarkers(prev => ({
            ...prev,
            [endTaskId]: true
        }));
    }, [setVisibleMarkers]);

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