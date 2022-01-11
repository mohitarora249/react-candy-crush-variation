import { useEffect, useState } from "react";
import "./App.css";

const GRID_SIZE = 6;
const CANDIES = ["red", "orange", "purple", "red", "yellow", "green"];

function App() {
  const [board, setBoard] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const createBoard = () => {
    const initialBoard = Array.from({ length: GRID_SIZE }, () =>
      Array.from(
        { length: GRID_SIZE },
        () => CANDIES[Math.floor(Math.random() * CANDIES.length)]
      )
    );
    setBoard(initialBoard);
  };

  useEffect(() => {
    createBoard();
  }, []);

  const dragStart = (e) => {
    setSquareBeingDragged(e.target.getAttribute("data-cell-info"));
  };
  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target.getAttribute("data-cell-info"));
  };

  const dragEnd = () => {
    const [row, col] = squareBeingDragged.split("-").map((x) => parseInt(x));
    const [rowToBeReplaced, colToBeReplaced] = squareBeingReplaced
      .split("-")
      .map((x) => parseInt(x));
    const VALID_MOVES = [
      [row, col - 1],
      [row, col + 1],
      [row + 1, col],
      [row + 1, col],
    ];
    const isValidMove = VALID_MOVES.filter(
      (move) => move[0] === rowToBeReplaced && move[1] === colToBeReplaced
    );
    if (isValidMove.length) {
      const copy = [...board];
      const temp = copy[row][col];
      copy[row][col] = board[rowToBeReplaced][colToBeReplaced];
      copy[rowToBeReplaced][colToBeReplaced] = temp;
      setBoard(copy);
    }
  };

  return (
    <div className="app">
      <div className="game">
        {board.map((row, rowIdx) => {
          return (
            <div style={{ display: "block" }} key={`row-${rowIdx}`}>
              {row.map((cell, cellIdx) => (
                <div
                  key={`${rowIdx}-${cellIdx}`}
                  data-cell-info={`${rowIdx}-${cellIdx}`}
                  style={{
                    height: 60,
                    width: 60,
                    backgroundColor: cell,
                    display: "block",
                    border: "1px solid",
                  }}
                  draggable
                  onDragStart={dragStart}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={(e) => e.preventDefault()}
                  onDragLeave={(e) => e.preventDefault()}
                  onDrop={dragDrop}
                  onDragEnd={dragEnd}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
