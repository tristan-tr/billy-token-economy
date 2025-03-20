import { createContext, useContext, useState, ReactNode } from 'react';
import { MapTask } from "../interfaces/MapTask.tsx";
import Tasks from "../data/Tasks.tsx";

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

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<MapTask[]>(Tasks());
    const [activePathAnimations, setActivePathAnimations] = useState<PathAnimation[]>([]);
    const [visibleMarkers, setVisibleMarkers] = useState<Record<number, boolean>>({
        1: true,
        2: true,
    });

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

        // Make the end task marker visible with animation
        setVisibleMarkers(prev => ({
            ...prev,
            [endTaskId]: true
        }));
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