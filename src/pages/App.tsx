import '../styles/global.css'
import { InventoryProvider } from "../components/InventoryContext.tsx";
import { TaskProvider } from "../components/TaskContext.tsx";
import InventoryDisplay from "../components/InventoryDisplay.tsx";
import MapView from "../components/MapView.tsx";

function App() {
    return (
        <>
            <InventoryProvider>
                <TaskProvider>
                    <MapView />
                    <InventoryDisplay />
                </TaskProvider>
            </InventoryProvider>
        </>
    )
}

export default App