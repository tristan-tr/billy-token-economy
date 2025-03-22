import { createContext } from 'react';
import { MapTask } from "../interfaces/MapTask";

export interface PathAnimation {
    id: string;
    startTaskId: string;
    endTaskId: string;
}

export interface TaskContextType {
    tasks: MapTask[];
    visibleMarkers: Record<string, boolean>;
    activePathAnimations: PathAnimation[];
    handleTaskComplete: (taskId: string) => void;
    handlePathComplete: (pathId: string, endTaskId: string) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);
