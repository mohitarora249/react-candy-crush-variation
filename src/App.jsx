import React, { useState } from "react";
import { COLORS } from "./constants";

function App() {
  const [game, setGame] = useState(
    Array(15)
      .fill()
      .map((_) =>
        Array(15)
          .fill()
          .map((_) => COLORS[Math.floor(Math.random() * COLORS.length)])
      )
  );

  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [invalidMove, setInvalidMove] = useState("none");

  const getRowColFromEvent = (e) => [
    +e.target.getAttribute("data-row"),
    +e.target.getAttribute("data-col"),
  ];

  const dragStart = (e) => {
    setSquareBeingDragged(getRowColFromEvent(e));
  };

  const dragDrop = (e) => {
    setSquareBeingReplaced(getRowColFromEvent(e));
  };

  const preventDefaultEvent = (e) => {
    e.preventDefault();
  };

  const dragEnd = () => {
    if (isValidMove(squareBeingDragged, squareBeingReplaced)) {
      const [srcSquareColor, destSquareColor] = [
        game[squareBeingDragged[0]][squareBeingDragged[1]],
        game[squareBeingReplaced[0]][squareBeingReplaced[1]],
      ];
      setGame((g) => {
        g[squareBeingDragged[0]][squareBeingDragged[1]] = destSquareColor;
        g[squareBeingReplaced[0]][squareBeingReplaced[1]] = srcSquareColor;
        return [...g];
      });
    } else {
      setInvalidMove("block");
      setTimeout(() => {
        setInvalidMove("none");
      }, 1000);
    }
    setSquareBeingDragged(null);
    setSquareBeingReplaced(null);
  };

  const getValidMoves = (srcSquare) => {
    return [
      [srcSquare[0] - 1, srcSquare[1]],
      [srcSquare[0] + 1, srcSquare[1]],
      [srcSquare[0], srcSquare[1] + 1],
      [srcSquare[0], srcSquare[1] - 1],
    ];
  };

  const isValidMove = (src, dest) => {
    if (src === null || dest === null) return false;
    const res = getValidMoves(src).find(
      (v) => v[0] === dest[0] && v[1] === dest[1]
    );
    if (res) return true;
    return false;
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-200">
      <h1 className="font-bold">
        Arrange 5 continous blocks of same color in 4 rows to win the game
      </h1>
      <div>
        {game.map((row, idx) => (
          <div className="flex" key={idx}>
            {row.map((r, i) => (
              <div
                key={i}
                className="h-14 w-14 border-1 cursor-pointer"
                style={{ backgroundColor: r }}
                data-row={idx}
                data-col={i}
                data-color={r}
                draggable
                onDragStart={dragStart}
                onDragOver={preventDefaultEvent}
                onDragEnter={preventDefaultEvent}
                onDragLeave={preventDefaultEvent}
                onDrop={dragDrop}
                onDragEnd={dragEnd}
              />
            ))}
          </div>
        ))}
      </div>
      <div
        className="font-bold text-red-500 h-8 w-44 absolute bottom-2 shadow-2xl rounded-lg"
        style={{ display: invalidMove }}
      >
        <div className="flex justify-center items-center">Invalid Move</div>
      </div>
    </div>
  );
}

export default App;
