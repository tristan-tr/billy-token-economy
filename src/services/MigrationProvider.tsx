import { useState, useEffect, ReactNode } from 'react';
import useDataMigration from './useDataMigration.tsx';

interface MigrationProviderProps {
    children: ReactNode;
}

export default function MigrationProvider({ children }: MigrationProviderProps) {
    const { currentVersion } = useDataMigration();
    const [migrationsComplete, setMigrationsComplete] = useState(false);

    useEffect(() => {
        // Set migrations as complete after first run
        setMigrationsComplete(true);
    }, [currentVersion]);

    if (!migrationsComplete) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Updating data, please wait...</p>
            </div>
        );
    }

    return <>{children}</>;
}