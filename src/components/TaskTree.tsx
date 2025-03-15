import { useState } from 'react';
import {CustomNodeElementProps, Tree} from 'react-d3-tree';
import TaskTreeItem from "./TaskTreeItem.tsx";
import {Task} from "./Task.tsx";
import {useInventory} from "./InventoryContext.tsx";

interface TreeNode {
    name: string;
    attributes: { id: number };
    children?: TreeNode[];
}

const TaskTree = () => {
    const nodeWidth = 500;
    const nodeHeight = 250;
    const nodeScale = 75;

    const dummyWidth = 150;
    const dummyHeight = 50;


    const { addDucats } = useInventory();

    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            name: 'Find Treasure Map',
            description: 'Locate the ancient map in the tavern',
            image: '/map.png',
            rewardText: '50 Ducats',
            redeemReward: () => addDucats(50),
            completed: false
        },
        {
            id: 2,
            name: 'Gather Crew',
            description: 'Recruit five seasoned pirates',
            image: '/crew.png',
            rewardText: '100 Ducats',
            redeemReward: () => addDucats(100),
            completed: false,
            parent: 1
        },
        {
            id: 3,
            name: 'Set Sail',
            description: 'Navigate to the marked location',
            image: '/sail.png',
            rewardText: '150 Ducats',
            redeemReward: () => addDucats(150),
            completed: false,
            parent: 2
        },
        {
            id: 4,
            name: 'Combined',
            description: 'Navigate to the marked location',
            image: '/sail.png',
            rewardText: '150 Ducats',
            redeemReward: () => addDucats(150),
            completed: false,
            parent: 1
        }
    ]);

    const handleTaskComplete = (taskId: number) => {
        const task = tasks.find((task) => task.id === taskId);
        if (!task) {
            throw new Error();
        }

        task.completed = true;
        task.redeemReward();
        setTasks([...tasks]); // trigger re-render
    };

    const convertTasksToTree = (tasks: Task[]): TreeNode[] => {
        const taskMap = new Map(tasks.map(task => [task.id, task]));
        const taskChildren = new Map<number, Task[]>();

        // Organize tasks into parent-child relationships
        tasks.forEach(task => {
            if (task.parent !== undefined) {
                if (!taskChildren.has(task.parent)) {
                    taskChildren.set(task.parent, []);
                }
                taskChildren.get(task.parent)?.push(task);
            }
        });

        // Find root tasks (tasks without a parent)
        const rootTasks = tasks.filter(task => task.parent === undefined);

        // Recursive function to build the tree
        const buildTree = (taskId: number): TreeNode => {
            const task = taskMap.get(taskId)!;
            const childrenTasks = taskChildren.get(taskId) || [];
            let children: TreeNode[] = [];

            if (childrenTasks.length > 0) {
                if (task.completed) {
                    // Parent is completed: show its children normally.
                    children = childrenTasks.map(child => buildTree(child.id));
                } else {
                    // Parent is not completed: hide the actual children and add a dummy node
                    children = [{
                        name: `+${childrenTasks.length} hidden`,
                        // Using a negative id to mark this as a dummy node.
                        attributes: { id: -task.id }
                    }];
                }
            }
            return {
                name: task.name,
                attributes: { id: task.id },
                children
            };
        };

        return rootTasks.map(task => buildTree(task.id));
    };


    const renderNode = ({ nodeDatum }: CustomNodeElementProps) => {
        const { id } = nodeDatum.attributes || {};

        // if ID is negative then we have found a hidden task placeholder
        if (typeof id === 'number' && id < 0) {
            return (
                <foreignObject
                    width={dummyWidth}
                    height={dummyHeight}
                    x={-dummyWidth / 2}
                    y={-dummyHeight / 2}
                    className="pointer-events-none"
                >
                    <div className={`w-[${dummyWidth}px] h-[${dummyHeight}px] flex items-center justify-center p-2 bg-gray-200 rounded text-sm text-gray-700`}>
                        {nodeDatum.name}
                    </div>
                </foreignObject>
            );
        }

        // not a hidden task
        const task = tasks.find(t => t.id === nodeDatum.attributes?.id)!;
        return (
            <foreignObject width={nodeWidth} height={nodeHeight} x={-nodeWidth/2} y={-nodeHeight/2} className="pointer-events-none">
                <TaskTreeItem
                    task={task}
                    onComplete={() => handleTaskComplete(task.id)}
                    className={`pointer-events-auto w-[${nodeWidth}px] h-[${nodeHeight}px] scale-${nodeScale}`}
                />
            </foreignObject>
        );
    };

    return (
        <div className="h-screen w-full bg-slate-100">
            <Tree
                data={convertTasksToTree(tasks)}
                orientation="vertical"
                renderCustomNodeElement={renderNode}
                nodeSize={{ x: nodeWidth+50, y: nodeHeight }}
                translate={{ x: window.innerWidth / 2, y: window.innerHeight / 4 }}
            />
        </div>
    );
};

export default TaskTree;