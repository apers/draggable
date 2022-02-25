import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import DraggableContainer from "./components/DraggableContainer";

function App() {
  let id1 = uuidv4();
  let id2 = uuidv4();

  return (
    <div className="App">
      <DraggableContainer
        initialContent={{
          [id1]: {
            id: id1,
            position: {
              x: 900,
              y: 300,
            },
          },
          [id2]: {
            id: id2,
            position: {
              x: 500,
              y: 500,
            },
          },
        }}
      />
    </div>
  );
}

export default App;
