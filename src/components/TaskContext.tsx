import { createContext } from 'react';
import { MapTask } from "../interfaces/MapTask.tsx";

export interface PathAnimation {
    id: string;
    startTaskId: number;
    endTaskId: number;
}

export interface TaskContextType {
    tasks: MapTask[];
    visibleMarkers: Record<number, boolean>;
    activePathAnimations: PathAnimation[];
    handleTaskComplete: (taskId: number) => void;
    handlePathComplete: (pathId: string, endTaskId: number) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);
