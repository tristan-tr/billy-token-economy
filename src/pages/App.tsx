import '../styles/global.css'
import TaskTree from "../components/TaskTree.tsx";
import {InventoryProvider} from "../components/InventoryContext.tsx";
import InventoryDisplay from "../components/InventoryDisplay.tsx";
import Background from "../components/Background.tsx";

function App() {
  return (
    <>
        <Background>
            <InventoryProvider>
                <InventoryDisplay/>
                <TaskTree/>
            </InventoryProvider>
        </Background>
    </>
  )
}

export default App
