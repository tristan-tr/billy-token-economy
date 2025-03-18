import { useState } from 'react';
import { Task } from "../interfaces/Task.tsx";
import { motion, AnimatePresence } from 'framer-motion';
import treasureMarker from '../images/treasure-marker.png';

interface TaskProps {
    task: Task;
    onComplete: () => void;
    className?: string;
}

function TaskComponent({task, onComplete, className}: TaskProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className={`relative ${className}`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <motion.div
                className="quest-marker flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.1 }}
            >
                {task.completed && (
                    <img
                        src={treasureMarker}
                        alt="Treasure Marker"
                        className={`w-12 h-12 transition-duration-200 opacity-70`}
                    />
                )}
            </motion.div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <div className="bg-amber-50 rounded-lg shadow-lg border-4 border-yellow-900 p-3 flex flex-col">
                            <div className="flex">
                                <img
                                    src={task.image}
                                    alt={task.name}
                                    className="w-20 h-20 mr-3 object-cover rounded-lg border-2 border-yellow-900"
                                />
                                <div>
                                    <h2 className="text-xl font-bold text-yellow-900 font-pirate">{task.name}</h2>
                                    <p className="text-yellow-800 text-xs leading-tight italic">
                                        "{task.description}"
                                    </p>
                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="text-red-800 font-bold text-sm">
                                    Reward: <span className="text-amber-600">{task.rewardText}</span>
                                </p>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onComplete();
                                    }}
                                    disabled={task.completed}
                                    className={`w-full py-1 px-2 rounded-lg font-bold text-sm transition-all ${task.completed ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'} text-white`}
                                >
                                    {task.completed ? 'Plundered!' : 'Plunder!'}
                                </button>
                            </div>
                        </div>
                        <div className="arrow-pointer"></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default TaskComponent;