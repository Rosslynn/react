import { useState } from "react";
import { mountBoard } from "./utils/board";

function TicTacToe({ boardSize = 3 }) {
  const [board, setBoard] = useState(mountBoard(boardSize));
  const [turn, setTurn] = useState("X");

  function handleSquareClick(targetRowIndex, targetColIndex) {
    const currentSquareHasAValue = !!board[targetRowIndex][targetColIndex];

    if (currentSquareHasAValue) return;

    const newBoard = board.map((row, rowIndex) => {
      if (rowIndex === targetRowIndex) {
        const newNow = [...row];
        newNow[targetColIndex] = turn;
        return newNow;
      }

      return row;
    });

    setBoard(newBoard);
    setTurn(turn === "X" ? "O" : "X");
  }

  return (
    <div className="container tic-tac-toe my-5">
      <div className="tic-tac-toe__header row mb-4">
        <div className="col">
          <h2>Turno actual: {turn}</h2>
        </div>
      </div>

      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="tic-tac-toe__row row no-gutters">
          {row.map((col, colIndex) => (
            <div key={colIndex} className="tic-tac-toe__col col-4">
              <button
                className="tic-tac-toe__square"
                disabled={col}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
              >
                {col}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <>
      <header>
        <h1 className="text-center py-4">Tres en raya</h1>
      </header>

      <main>
        <TicTacToe />
      </main>
    </>
  );
}
