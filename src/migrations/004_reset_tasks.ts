export default async function migrate() {
    // clear stored task locations
    localStorage.setItem('stored-tasks', '[]');
    console.log('Migration 004_reset_tasks completed');
}