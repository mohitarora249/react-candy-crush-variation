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

  const eventPreventDefault = (e) => {
    e.preventDefault();
  };

  const dragEnd = () => {
    if (isInvalidMove()) return;
    setSquareBeingDragged(null);
    setSquareBeingReplaced(null);
  };

  const isInvalidMove = () => {
    if (squareBeingDragged === null || squareBeingReplaced === null)
      return true;
    console.log("squareBeingDragged :: ", squareBeingDragged);
    console.log("squareBeingReplaced :: ", squareBeingReplaced);
    return false;
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
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
                onDragOver={eventPreventDefault}
                onDragEnter={eventPreventDefault}
                onDragLeave={eventPreventDefault}
                onDrop={dragDrop}
                onDragEnd={dragEnd}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
