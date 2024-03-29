import { useState } from "react";
import { mountBoard, mountPlayerScore } from "../utils/board";
import SquareButton from "./SquareButton";

export default function TicTacToe({ boardSize = 3 }) {
  const [board, setBoard] = useState(mountBoard(boardSize));
  const [playerXScore, setPlayerXScore] = useState(mountPlayerScore(boardSize));
  const [playerOScore, setPlayerOScore] = useState(mountPlayerScore(boardSize));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  
  function handleSquareClick(targetRowIndex, targetColIndex) {
    // Esta validación podría pasarse a una función para que sea más mantenible
    if (!!board[targetRowIndex][targetColIndex]) return;
    // Se puede crear una función que se encargue de actualizar los scores y retorne si hay ganador
    // Update scores
    const isXTurn = turn === "X";
    const newScore = isXTurn ? [...playerXScore] : [...playerOScore];
    // Update row score
    newScore[targetRowIndex] += 1;
    // Update col score
    newScore[targetColIndex + boardSize] += 1;
    // Check and update diag
    if (!(targetRowIndex - targetColIndex)) {
      newScore[newScore.length - 2] += 1;
    }
    // Check and update anti-diag
    if ((targetRowIndex + targetColIndex) === (boardSize - 1)) {
      newScore[newScore.length - 1] += 1;
    }

    // Check if there is a winner
    if (newScore.includes(boardSize)) {
      setWinner(turn);
      return;
    }
    // Se puede crear una función que se encargue de devolver el nuevo tablero
    // Create the board to render
    const newBoard = board.map((row, rowIndex) => {
      if (rowIndex === targetRowIndex) {
        const newNow = [...row];
        newNow[targetColIndex] = turn;
        return newNow;
      }

      return row;
    });

    if (isXTurn) setPlayerXScore(newScore);
    else setPlayerOScore(newScore);
    setBoard(newBoard);
    setTurn(isXTurn ? "O" : "X");
  }

  function handlePlayAgain() {
    setBoard(mountBoard(boardSize));
    setPlayerXScore(mountPlayerScore(boardSize));
    setPlayerOScore(mountPlayerScore(boardSize));
    setWinner(null);
    setTurn('X');
  }

  if (winner) {
    return (
      <div className="container">
        <div className="row">
          <div className="col d-flex justify-content-center flex-column">
            <h2 className="text-center py-5">¡Felicidades jugador {winner} has ganado!</h2>
            <button className="btn btn-primary mx-auto" onClick={handlePlayAgain}>Jugar otra vez</button>
          </div>
        </div>
      </div>
    )
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
