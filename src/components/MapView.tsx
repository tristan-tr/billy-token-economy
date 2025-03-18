import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Task } from '../interfaces/Task.tsx';
import TaskComponent from './TaskComponent.tsx';
import { useInventory } from './InventoryContext';
import '../styles/MapView.css';
import ebonmarchImage from '../images/Western_Ebonmarch_map.png'

interface MapTask extends Task {
    position: { x: number; y: number };
}

function MapView() {
    const { addDucats } = useInventory();
    const [tasks, setTasks] = React.useState<MapTask[]>([
        {
            id: 1,
            name: 'Find Treasure Map',
            description: 'Locate the ancient map in the tavern',
            image: '/map.png',
            rewardText: '50 Ducats',
            redeemReward: () => addDucats(50),
            completed: false,
            position: { x: 350, y: 250 }
        },
        {
            id: 2,
            name: 'Gather Crew',
            description: 'Recruit five seasoned pirates',
            image: '/crew.png',
            rewardText: '100 Ducats',
            redeemReward: () => addDucats(100),
            completed: false,
            position: { x: 650, y: 450 }
        },
        {
            id: 3,
            name: 'Set Sail',
            description: 'Navigate to the marked location',
            image: '/sail.png',
            rewardText: '150 Ducats',
            redeemReward: () => addDucats(150),
            completed: false,
            parent: 2,
            position: { x: 950, y: 650 }
        },
        {
            id: 4,
            name: 'Combined',
            description: 'Navigate to the marked location',
            image: '/sail.png',
            rewardText: '150 Ducats',
            redeemReward: () => addDucats(150),
            completed: false,
            parent: 1,
            position: { x: 550, y: 850 }
        }
    ]);

    const handleTaskComplete = (taskId: number) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                task.completed = true;
                task.redeemReward();
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    // Filter tasks to show only those that should be visible
    const visibleTasks = tasks.filter(task => {
        // Root tasks are always visible
        if (task.parent === undefined) return true;

        // Child tasks are visible only if parent is completed
        const parent = tasks.find(t => t.id === task.parent);
        return parent?.completed === true;
    });

    return (
        <div className="w-full h-lvh overflow-hidden relative">
            <TransformWrapper
                limitToBounds={false}
                initialScale={1.5}
                initialPositionX={-400}
                initialPositionY={-1100}
            >
                <TransformComponent>
                    <img src={`${ebonmarchImage}`} alt="Ebonmarch"/>
                    {visibleTasks.map(task => (
                        <div
                            key={task.id}
                            className="absolute task-marker -translate-x-1/2 -translate-y-1/2"
                            style={{
                                left: `${task.position.x}px`,
                                top: `${task.position.y}px`,
                            }}
                        >
                            <TaskComponent
                                task={task}
                                onComplete={() => handleTaskComplete(task.id)}
                                className="w-128px h-auto scale-100"
                            />
                        </div>
                    ))}

                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        {visibleTasks
                            .filter(task => task.parent !== undefined)
                            .map(task => {
                                const parent = tasks.find(t => t.id === task.parent);
                                if (!parent) return null;

                                return (
                                    <path
                                        key={`path-${parent.id}-${task.id}`}
                                        d={`M${parent.position.x},${parent.position.y} L${task.position.x},${task.position.y}`}
                                        className="ship-route"
                                    />
                                );
                            })}
                    </svg>
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
}

export default MapView;