import {useState} from 'react'

interface Task {
    id: number;
    name: string;
    description: string;
    image: string;
    tokenReward: number;
    completed: boolean;
}

interface TaskItemProps {
    task: Task;
}

function TaskItem({task}: TaskItemProps) {
    const [isCompleted, setIsCompleted] = useState(task.completed);

    const handleComplete = () => {
        setIsCompleted(true);
    }

    return (
        <div key={task.id} className="bg-amber-50 rounded-lg shadow-lg border-4 border-yellow-900 p-4 flex">
            <img
                src={task.image}
                alt={task.name}
                className="w-48 h-full mr-4 object-cover rounded-lg border-2 border-yellow-900"
            />

            <div className="flex-1 flex flex-col justify-between gap-3">
                <h2 className="text-2xl font-bold text-yellow-900 font-pirate">{task.name}</h2>
                <p className="text-yellow-800 text-sm leading-relaxed italic">
                    “{task.description}”
                </p>
                <div className="mt-auto">
                    <p className="text-red-800 font-bold mb-2">
                        🪙 Reward: <span className="text-amber-600">{task.tokenReward} Ducats</span>
                    </p>
                    <button
                        onClick={handleComplete}
                        disabled={isCompleted}
                        className={`w-full py-2 px-4 rounded-lg font-bold transition-all
                                ${isCompleted
                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                            : 'bg-red-600 text-amber-50 hover:bg-red-700 hover:shadow-md'}
                                focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2
                                border-2 border-yellow-900`}
                    >
                        {isCompleted ? 'Plundered!' : 'Plunder!'}
                    </button>
                </div>
            </div>
        </div>    )
}

export default TaskItem