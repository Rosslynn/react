import { useState } from "react";

export default function SquareButton({
  handleClick,
  squareValue,
  currentTurn,
}) {
  const [placeholderStyles, setPlaceholderStyles] = useState({
    display: "none",
  });

  function handleMouseEnter() {
    setPlaceholderStyles({ ...placeholderStyles, display: "inline-block" });
  }

  function handleMouseLeave() {
    setPlaceholderStyles({ ...placeholderStyles, display: "none" });
  }

  return (
    <button
      className="square-button"
      disabled={squareValue}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={`Marcar con la letra ${currentTurn}`}
      aria-disabled={squareValue ? "true" : "false"}
    >
      {squareValue || <span style={placeholderStyles}>{currentTurn}</span>}
    </button>
  );
}
