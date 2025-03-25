export default async function migrate() {
    // clear completed tasks, has no useful data as of now
    localStorage.setItem('completed-tasks', '[]');
    console.log('Migration 001_convert_completed_tasks_to_array completed');
}