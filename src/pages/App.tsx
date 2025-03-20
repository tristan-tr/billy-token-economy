import '../styles/global.css'
import {InventoryProvider} from "../components/InventoryProvider.tsx";
import {TaskProvider} from "../components/TaskProvider.tsx";
import InventoryDisplay from "../components/InventoryDisplay.tsx";
import MapView from "../components/MapView.tsx";
import Shop from "../components/Shop.tsx";

function App() {
    return (
        <>
            <InventoryProvider>
                <TaskProvider>
                    <MapView />
                    <InventoryDisplay />
                    <Shop />
                </TaskProvider>
            </InventoryProvider>
        </>
    )
}

export default App