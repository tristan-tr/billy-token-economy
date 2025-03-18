import {Task} from "../interfaces/Task.tsx";

interface TaskTreeItemProps {
    task: Task;
    onComplete: () => void;
    className?: string;
}

function TaskTreeItem({task, onComplete, className}: TaskTreeItemProps) {
    return (
        <div key={task.id} className={`bg-amber-50 rounded-lg shadow-lg border-4 border-yellow-900 p-4 flex ${className}`}>
            {!task.completed && (
                <div className="absolute top-1 right-0.5">
                    <img
                        src="/treasure-marker.png"
                        alt="location"
                        className="w-12 h-12"
                    />
            </div>
            )}

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
                        Reward: <span className="text-amber-600">{task.rewardText}</span>
                    </p>
                    <button
                        onClick={onComplete}
                        disabled={task.completed}
                        className={`w-full py-2 px-4 rounded-lg font-bold transition-all ${task.completed ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'}`}
                    >
                        {task.completed ? 'Plundered!' : 'Plunder!'}
                    </button>
                </div>
            </div>
        </div>    )
}

export default TaskTreeItem