export default async function migrate() {
    // clear stored task locations
    localStorage.setItem('stored-tasks', '[]');
    console.log('Migration 003_reset_tasks completed');
}