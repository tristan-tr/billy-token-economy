export default async function migrate() {
    // clear stored task locations
    localStorage.setItem('stored-tasks', '[]');
    console.log('Migration 002_reset_task_locations completed');
}