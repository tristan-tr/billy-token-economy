import '../styles/global.css'
import TaskTree from "../components/TaskTree.tsx";
import {InventoryProvider} from "../components/InventoryContext.tsx";

function App() {
  return (
    <>
        <InventoryProvider>
            <TaskTree/>
        </InventoryProvider>
    </>
  )
}

export default App
