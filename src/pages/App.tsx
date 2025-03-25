import '../styles/global.css'
import {InventoryProvider} from "../components/InventoryProvider.tsx";
import {TaskProvider} from "../components/TaskProvider.tsx";
import InventoryDisplay from "../components/InventoryDisplay.tsx";
import MapView from "../components/MapView.tsx";
import Shop from "../components/Shop.tsx";
import MigrationProvider from "../services/MigrationProvider.tsx";

function App() {
    return (
        <MigrationProvider>
            <InventoryProvider>
                <TaskProvider>
                    <MapView />
                    <InventoryDisplay />
                    <Shop />
                </TaskProvider>
            </InventoryProvider>
        </MigrationProvider>
    )
}

export default App