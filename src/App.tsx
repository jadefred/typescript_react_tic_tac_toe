import React, { useState } from "react";
import { Board } from "./components/Board";
import { Square } from "./components/Square";

const defaultSquare = (): (string | null)[] => new Array(9).fill(null);

function App() {
  const [square, setSquare] = useState(defaultSquare);

  function handleSquareClick(index: number) {
    let newSquare = square;
    newSquare[index] = "x";
    setSquare([...newSquare]);
  }

  return (
    <main>
      <Board>
        {square.map((square, index: number) => (
          <Square key={index} x={square === "x" ? 1 : 0} o={square === "o" ? 1 : 0} onClick={() => handleSquareClick(index)} />
        ))}
      </Board>
    </main>
  );
}

export default App;
