import { useState } from "react";
import { mountBoard } from "../utils/board";
import SquareButton from "./SquareButton";

export default function TicTacToe({ boardSize = 3 }) {
  const [board, setBoard] = useState(mountBoard(boardSize));
  const [turn, setTurn] = useState("X");

  function handleSquareClick(targetRowIndex, targetColIndex) {
    if (!!board[targetRowIndex][targetColIndex]) return;

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
    <div aria-label="Tres en raya" className="container tic-tac-toe my-5">
      <div className="tic-tac-toe__header row mb-5">
        <div className="col">
          <h2 className="text-center" aria-live="assertive">
            Es el turno de "{turn}" selecciona una celda
          </h2>
        </div>
      </div>

      <table className="row tic-tac-toe__body">
        <tbody className="col-12">
          {board.map((row, rowIndex) => (
            <tr key={rowIndex} className="tic-tac-toe__row row no-gutters">
              {row.map((col, colIndex) => (
                <td key={colIndex} className="tic-tac-toe__col col-4">
                  <SquareButton
                    handleClick={() => handleSquareClick(rowIndex, colIndex)}
                    squareValue={col}
                    currentTurn={turn}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
