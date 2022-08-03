import React, { useState, useEffect } from "react";
import { Board } from "./components/Board";
import { Square } from "./components/Square";

const defaultSquare = (): (string | null)[] => new Array(9).fill(null);

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

function App() {
  const [square, setSquare] = useState(defaultSquare);
  const [winner, setWinner] = useState<string | null>(null);
  const [playerWon, setPlayerWon] = useState<number>(0);
  const [computerWon, setComputerWon] = useState<number>(0);

  useEffect(() => {
    if (winner === "x") {
      setPlayerWon((prev) => prev + 1);
    }
    if (winner === "o") {
      setComputerWon((prev) => prev + 1);
    }
  }, [winner]);

  useEffect(() => {
    //take x / o / null as arguments
    //filter all mini arrays if there's any filled square matched with the lines
    //return the matched line with its indexes as result
    const lineThatsAre = (a: string, b: string | null, c: string | null) => {
      return lines.filter((squareIndexes) => {
        const squareValues = squareIndexes.map((index) => {
          return square[index];
        });
        return JSON.stringify([a, b, c].sort()) === JSON.stringify(squareValues.sort());
      });
    };
    const playerWon = lineThatsAre("x", "x", "x").length > 0;
    const computerWon = lineThatsAre("o", "o", "o").length > 0;
    if (playerWon) setWinner("x");
    if (computerWon) setWinner("o");

    const isComputerTurn: boolean = square.filter((square) => square !== null).length % 2 === 1;
    const putComputerAt = (index: number): void => {
      let newSquare = square;
      if (index !== null) {
        newSquare[index] = "o";
        setSquare([...newSquare]);
      }
    };

    //first map out the array of square, and mark all available index, null for the taken square
    //then filter the array, filer away the null (the taken squares)
    const emptyIndexes = square
      .map((i, index) => {
        return i === null ? index : null;
      })
      .filter((value) => value !== null);

    //Computer make a move after player made one and no winner
    if (isComputerTurn && !winner) {
      //Logic of computer move
      //1 - if computer already has a line which it occopied 2 squares, it will try to take the last one
      const winningLines = lineThatsAre("o", "o", null);
      if (winningLines.length > 0) {
        //will receive the line gonna win as array, then filter the occupied sqaure
        const winningIndex = winningLines[0].filter((index) => square[index] === null)[0];
        putComputerAt(winningIndex);
        return;
      }

      //2 - computer try to block the player when players has took 2 squares in the line
      const blockPlayer = lineThatsAre("x", "x", null);
      if (blockPlayer.length > 0) {
        const blockIndex = blockPlayer[0].filter((index) => square[index] === null)[0];
        putComputerAt(blockIndex);
        return;
      }

      //3 - try to continue on the line which has chance to win
      const linesToContinue = lineThatsAre("o", null, null);
      if (linesToContinue.length > 0) {
        const continueIndex = linesToContinue[0].filter((index) => square[index] === null)[0];
        putComputerAt(continueIndex);
        return;
      }

      //generate random index by using the information of emptyIndexes
      const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
      //call function is assign computer move
      if (randomIndex || randomIndex === 0) putComputerAt(randomIndex);
    }
  }, [square, winner]);

  //if none of the square is null and still have no winner, set it as tie
  useEffect(() => {
    const isTied = square.filter((i) => i === null);
    if (isTied.length === 0 && !winner) {
      setWinner("tie");
    }
  }, [square, winner]);

  function handleSquareClick(index: number):void {
    //when the left over squares (null) can be completely divided by 2, it means is player's turn
    const isPlayTurn: boolean = square.filter((square) => square !== null).length % 2 === 0;

    //when player click the square, show x and update array of square
    if (isPlayTurn && !winner && !square[index]) {
      let newSquare = square;
      newSquare[index] = "x";
      setSquare([...newSquare]);
    }
  }

  function retry():void {
    setSquare(defaultSquare);
    setWinner(null);
  }

  function startOver():void {
    retry();
    setPlayerWon(0);
    setComputerWon(0);
  }

  return (
    <main>
      <div className="title-btn__wrapper">
        <h1>Tic Tac Toe</h1>
        <div className="start-again-btn__wrapper">
          <button onClick={retry} type="button" className="start-again-btn">
            Retry
          </button>
          <button onClick={startOver} type="button" className="start-again-btn">
            Start Over
          </button>
        </div>
      </div>

      <Board>
        {square.map((square, index: number) => (
          <Square key={index} x={square === "x" ? 1 : 0} o={square === "o" ? 1 : 0} onClick={() => handleSquareClick(index)} />
        ))}
      </Board>
      {winner && winner === "x" && <div className="result win">You won ! </div>}
      {winner && winner === "o" && <div className="result lose">You lost ! </div>}
      {winner && winner === "tie" && <div className="result tie">Tied ! </div>}

      <div className="score__wrapper">
        <p>You : {playerWon}</p>
        <p>Computer : {computerWon}</p>
      </div>
    </main>
  );
}

export default App;
