import { useEffect, useRef, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import TaskComponent from './TaskComponent.tsx';
import TaskPath from './TaskPath.tsx';
import ebonmarchImage from '../images/Western_Ebonmarch_map.png';
import { motion, AnimatePresence } from 'framer-motion';
import { MAP_WIDTH } from "../data/Locations.tsx";
import {useTasks} from "./useTasks.tsx";

function MapView() {
    const { tasks, visibleMarkers, activePathAnimations, handleTaskComplete, handlePathComplete } = useTasks();

    const mapRef = useRef<HTMLImageElement>(null);
    const [mapScale, setMapScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            if (mapRef.current) {
                const currentWidth = mapRef.current.clientWidth;
                setMapScale(currentWidth / MAP_WIDTH);
            }
        };

        updateScale();
        window.addEventListener('resize', updateScale);

        return () => window.removeEventListener('resize', updateScale);
    }, []);

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
                    <img
                        ref={mapRef}
                        src={`${ebonmarchImage}`}
                        alt="Ebonmarch"
                        onLoad={() => {
                            if (mapRef.current) {
                                setMapScale(mapRef.current.clientWidth / MAP_WIDTH);
                            }
                        }}
                    />

                    {activePathAnimations.map(path => {
                        const startTask = tasks.find(t => t.id === path.startTaskId);
                        const endTask = tasks.find(t => t.id === path.endTaskId);

                        if (!startTask || !endTask) return null;

                        return (
                            <TaskPath
                                key={path.id}
                                startX={startTask.position.x * mapScale}
                                startY={startTask.position.y * mapScale}
                                endX={endTask.position.x * mapScale}
                                endY={endTask.position.y * mapScale}
                                onAnimationComplete={() => handlePathComplete(path.id, endTask.id)}
                            />
                        );
                    })}

                    {visibleTasks.map(task => (
                        <div
                            key={task.id}
                            className="absolute task-marker -translate-x-1/2 -translate-y-1/2"
                            style={{
                                left: `${task.position.x * mapScale}px`,
                                top: `${task.position.y * mapScale}px`,
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