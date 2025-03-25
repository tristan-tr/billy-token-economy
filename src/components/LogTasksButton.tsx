import { motion } from "motion/react";
import useLocalStorage from "use-local-storage";

// this is a temporary file

interface CompletedTaskData {
    instanceId: string;
    completedOn: Date;
}

function LogTasksButton () {
    const [completedTasks] = useLocalStorage<CompletedTaskData[]>('completed-tasks', []);

    const logTasks = () => {
        // filter for any tasks of the last 24 hours
        const now = new Date();

        for (const task of completedTasks) {
            const completedDate = new Date(task.completedOn);

            if (now.getTime() - completedDate.getTime() < 1000 * 60 * 60 * 24) {
                console.log(`Task completed: ${task.instanceId}, on ${completedDate}`);
            }
        }
  }

  return (
      <motion.button
          whileHover={{ scale: 1.05, cursor: 'pointer' }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-4 left-4 px-4 py-2 bg-amber-50 text-red-800 font-bold border-4 border-yellow-900 rounded-lg shadow-lg"
          onClick={logTasks}
      >
            Log Tasks
      </motion.button>
  )
}

export default LogTasksButton;