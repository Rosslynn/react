export function mountBoard(size) {
  return new Array(size).fill(new Array(size).fill(""));
}

export function mountPlayerScore(boardSize) {
  return new Array((boardSize * 2) + 2).fill(0);
}
