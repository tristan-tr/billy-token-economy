import { useEffect } from 'react';
import useLocalStorage from 'use-local-storage';

interface MigrationModule {
    default: () => Promise<void>;
}

export default function useDataMigration() {
    const [completedMigrations, setCompletedMigrations] = useLocalStorage<string[]>('completed-migrations', []);

    useEffect(() => {
        const runMigrations = async () => {
            try {
                // Dynamically import all migration files
                const migrationModules = import.meta.glob('../migrations/*.ts', { eager: true });

                // Sort migrations by version number (extracted from filename)
                const sortedMigrations = Object.entries(migrationModules)
                    .map(([path, module]) => {
                        // Extract version from filename (e.g., "001_initial.ts" → 1)
                        const version = parseInt(path.split('/').pop()?.split('_')[0] || '0', 10);
                        return {
                            path,
                            version,
                            migrate: (module as MigrationModule).default
                        };
                    })
                    .sort((a, b) => a.version - b.version);

                // Run migrations that haven't been executed yet
                for (const migration of sortedMigrations) {
                    if (!completedMigrations.includes(migration.path)) {
                        console.log(`Running migration: ${migration.path}`);
                        await migration.migrate();
                        setCompletedMigrations(prev => [...prev || [], migration.path]);
                    }
                }
            } catch (error) {
                console.error("Migration failed:", error);
            }
        };

        runMigrations();
    }, [completedMigrations, setCompletedMigrations]);

    // Calculate current version from completed migrations
    const getCurrentVersion = () => {
        const versionRegex = /(\d+)_/;
        return completedMigrations.reduce((maxVersion, path) => {
            const match = path.match(versionRegex);
            if (match) {
                const version = parseInt(match[1], 10);
                return Math.max(maxVersion, version);
            }
            return maxVersion;
        }, 0);
    };

    return {
        currentVersion: getCurrentVersion(),
        completedMigrations
    };
}