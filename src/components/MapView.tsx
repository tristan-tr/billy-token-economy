import { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Task } from '../interfaces/Task.tsx';
import TaskComponent from './TaskComponent.tsx';
import TaskPath from './TaskPath.tsx';
import { useInventory } from './InventoryContext';
import ebonmarchImage from '../images/Western_Ebonmarch_map.png';
import { motion, AnimatePresence } from 'framer-motion';

interface MapTask extends Task {
    position: { x: number; y: number };
}

interface PathAnimation {
    id: string;
    startTaskId: number;
    endTaskId: number;
}

function MapView() {
    const { addDucats } = useInventory();
    const [tasks, setTasks] = useState<MapTask[]>([
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

    // Track active path animations
    const [activePathAnimations, setActivePathAnimations] = useState<PathAnimation[]>([]);

    // Track which task markers should be visible
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

    // Filter tasks based on completed parent tasks
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

                    {activePathAnimations.map(path => {
                        const startTask = tasks.find(t => t.id === path.startTaskId);
                        const endTask = tasks.find(t => t.id === path.endTaskId);

                        if (!startTask || !endTask) return null;

                        return (
                            <TaskPath
                                key={path.id}
                                startX={startTask.position.x}
                                startY={startTask.position.y}
                                endX={endTask.position.x}
                                endY={endTask.position.y}
                                onAnimationComplete={() => handlePathComplete(path.id, endTask.id)}
                            />
                        );
                    })}

                    {visibleTasks.map(task => (
                        <div
                            key={task.id}
                            className="absolute task-marker -translate-x-1/2 -translate-y-1/2"
                            style={{
                                left: `${task.position.x}px`,
                                top: `${task.position.y}px`,
                            }}
                        >
                            <AnimatePresence>
                                {(visibleMarkers[task.id] || task.parent === undefined) && (
                                    <motion.div
                                        initial={{ scale: task.parent ? 0 : 1, opacity: task.parent ? 0 : 1 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20
                                        }}
                                    >
                                        <TaskComponent
                                            task={task}
                                            onComplete={() => handleTaskComplete(task.id)}
                                            className="w-128px h-auto scale-100"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
}

export default MapView;