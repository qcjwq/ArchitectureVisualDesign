import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import NavComponent from "./components/NavComponent";
import ControlPanel from "./components/ControlPanel";
import { AppProvider } from "./components/AppContext";

function App() {
  return (
    <AppProvider>
      <DndProvider backend={HTML5Backend}>
        <div className="container-fluid app-container">
          <div className="row">
            <div className="col-3 app-col">
              <NavComponent />
            </div>
            <div className="col-9 app-col">
              <ControlPanel />
            </div>
          </div>
        </div>
      </DndProvider>
    </AppProvider>
  );
}

export default App;
