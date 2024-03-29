export function mountBoard(size) {
  return new Array(size).fill(new Array(size).fill(""));
}

export function isValidClick({ board, x, y }) {
  return !board[x][y];
}
