import {Task} from "./Task.tsx";

export interface MapTask extends Task {
    position: { x: number; y: number };
}