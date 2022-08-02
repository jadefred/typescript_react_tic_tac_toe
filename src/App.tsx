import React, { useState, useEffect } from "react";
import { Board } from "./components/Board";
import { Square } from "./components/Square";

const defaultSquare = (): (string | null)[] => new Array(9).fill(null);

function App() {
  const [square, setSquare] = useState(defaultSquare);

  //winning conditions - lines in board
  const lines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  useEffect(() => {
    const isComputerTurn: boolean = square.filter((square) => square !== null).length % 2 === 1;
    const lineThatsAre = (a: string, b: string, c: string) => {
      return lines.filter((squareIndexes) => {
        const squareValues = squareIndexes.map((index) => {
          return square[index];
        });
        return JSON.stringify([a, b, c].sort()) === JSON.stringify(squareValues.sort());
      });
    };
    const playerWon = lineThatsAre("x", "x", "x").length > 0;
    if (playerWon) alert("player won");

    const putComputerAt = (index: number): void => {
      let newSquare = square;
      if (index !== null) {
        newSquare[index] = "o";
        setSquare([...newSquare]);
      }
    };
    if (isComputerTurn) {
      //first map out the array of square, and mark all available index, null for the taken square
      //then filter the array, filer away the null (the taken squares)
      const emptyIndexes = square
        .map((i, index) => {
          return i === null ? index : null;
        })
        .filter((value) => value !== null);
      //generate random index by using the information of emptyIndexes
      const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
      //call function is assign computer move
      if (randomIndex || randomIndex === 0) putComputerAt(randomIndex);
    }
  }, [square]);

  function handleSquareClick(index: number) {
    //when the left over squares (null) can be completely divided by 2, it means is player's turn
    const isPlayTurn: boolean = square.filter((square) => square !== null).length % 2 === 0;

    //when player click the square, show x and update array of square
    if (isPlayTurn) {
      console.log("is player");
      console.log(isPlayTurn, "is player turn");
      let newSquare = square;
      newSquare[index] = "x";
      setSquare([...newSquare]);
    }
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
