export default async function migrate() {
    // clear stored task locations
    localStorage.setItem('stored-tasks', '[]');
    console.log('Migration 005_reset_tasks completed');
}