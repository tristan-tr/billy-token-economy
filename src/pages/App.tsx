import '../styles/global.css'
import TaskTree from "../components/TaskTree.tsx";
import {InventoryProvider} from "../components/InventoryContext.tsx";
import InventoryDisplay from "../components/InventoryDisplay.tsx";

function App() {
  return (
    <>
        <InventoryProvider>
            <InventoryDisplay/>
            <TaskTree/>
        </InventoryProvider>
    </>
  )
}

export default App
