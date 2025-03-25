import { useEffect } from 'react';
import useLocalStorage from 'use-local-storage';

interface MigrationModule {
    default: () => Promise<void>;
}

export default function useDataMigration() {
    const [currentVersion, setCurrentVersion] = useLocalStorage<number>('data-version', 0);

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
                    if (migration.version > currentVersion) {
                        console.log(`Running migration: ${migration.path} (version ${migration.version})`);
                        await migration.migrate();
                        setCurrentVersion(migration.version);
                    }
                }
            } catch (error) {
                console.error("Migration failed:", error);
            }
        };

        runMigrations();
    }, [currentVersion, setCurrentVersion]);

    return { currentVersion };
}