import { Task } from "./Task";

export interface MapTask extends Task {
    position: { x: number; y: number };
    instanceId: string;
    definitionId: string;
}