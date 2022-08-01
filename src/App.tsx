import React from "react";
import { Board } from "./components/Board";
import { Square } from "./components/Square";

function App() {
  return (
    <main>
      <Board>
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </Board>
    </main>
  );
}

export default App;
