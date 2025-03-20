import { createContext, useContext, useState, ReactNode } from 'react';
import { MapTask } from "../interfaces/MapTask.tsx";
import Tasks from "../data/Tasks.tsx";
import useLocalStorage from 'use-local-storage';

interface PathAnimation {
    id: string;
    startTaskId: number;
    endTaskId: number;
}

interface TaskContextType {
    tasks: MapTask[];
    visibleMarkers: Record<number, boolean>;
    activePathAnimations: PathAnimation[];
    handleTaskComplete: (taskId: number) => void;
    handlePathComplete: (pathId: string, endTaskId: number) => void;
}

interface CompletedTaskData {
    [taskId: number]: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    // Store just the completion state rather than the full task objects
    const [completedTasks, setCompletedTasks] = useLocalStorage<CompletedTaskData>('completed-tasks', {});

    // Get base tasks and apply the completion state
    const baseTasks = Tasks();
    const mergedTasks = baseTasks.map(task => ({
        ...task,
        completed: completedTasks[task.id]
    }));

    const [tasks, setTasks] = useState<MapTask[]>(mergedTasks);
    const [activePathAnimations, setActivePathAnimations] = useState<PathAnimation[]>([]);

    // Default visible markers are 1 and 2, plus any task whose parent is completed
    const initialVisibleMarkers = () => {
        const defaultVisible: Record<number, boolean> = { 1: true, 2: true };

        baseTasks.forEach(task => {
            if (task.parent && completedTasks[task.parent]) {
                defaultVisible[task.id] = true;
            }
        });

        return defaultVisible;
    };

    const [visibleMarkers, setVisibleMarkers] = useLocalStorage<Record<number, boolean>>(
        'visible-markers',
        initialVisibleMarkers()
    );

    const handleTaskComplete = (taskId: number) => {
        const completedTask = tasks.find(task => task.id === taskId);
        if (!completedTask) return;

        // Mark task as completed and apply reward
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                task.completed = true;
                task.redeemReward();
            }
            return task;
        });
        setTasks(updatedTasks);

        // Update persisted completion state
        setCompletedTasks({
            ...completedTasks,
            [taskId]: true
        });

        // Find child tasks that should now be revealed
        const childTasks = tasks.filter(task => task.parent === taskId);

        // Create path animations for each newly revealed child task
        const newPaths = childTasks.map(childTask => ({
            id: `path-${completedTask.id}-${childTask.id}`,
            startTaskId: completedTask.id,
            endTaskId: childTask.id,
        }));

        setActivePathAnimations(prev => [...prev, ...newPaths]);
    };

    const handlePathComplete = (pathId: string, endTaskId: number) => {
        // Remove the completed path animation
        setActivePathAnimations(prev =>
            prev.filter(path => path.id !== pathId)
        );

        // Make the end task marker visible with animation and persist it
        const updatedVisibleMarkers = {
            ...visibleMarkers,
            [endTaskId]: true
        };

        setVisibleMarkers(updatedVisibleMarkers);
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

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};