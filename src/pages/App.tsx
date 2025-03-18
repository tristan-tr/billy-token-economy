import '../styles/global.css'
import {InventoryProvider} from "../components/InventoryContext.tsx";
import InventoryDisplay from "../components/InventoryDisplay.tsx";
import MapView from "../components/MapView.tsx";

function App() {
  return (
    <>
        <InventoryProvider>
            <MapView />
            <InventoryDisplay/>
        </InventoryProvider>
    </>
  )
}

export default App
