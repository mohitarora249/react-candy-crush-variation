import { useEffect, useState } from "react";
import "./App.css";
import blueCandy from "./assets/img/blue-candy.png";
import greenCandy from "./assets/img/green-candy.png";
import orangeCandy from "./assets/img/orange-candy.png";
import purpleCandy from "./assets/img/purple-candy.png";
import redCandy from "./assets/img/red-candy.png";
import yellowCandy from "./assets/img/yellow-candy.png";

import { WIDTH, COMBO_MIN_THRESHOULD } from "./constants";

const CANDY = [
  blueCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
  greenCandy,
];

function App() {
  const [currentCandyArrangement, setCurrentCandyArrangement] = useState([]);

  const createBoard = () => {
    const randomCandyArrangement = [];
    for (let i = 0; i < WIDTH * WIDTH; i++) {
      const randomCandy = CANDY[Math.floor(Math.random() * CANDY.length)];
      randomCandyArrangement.push(randomCandy);
    }
    setCurrentCandyArrangement(randomCandyArrangement);
  };

  const checkColumnCombo = () => {
    for (let i = 0; i < WIDTH; i++) {
      for (let j = WIDTH - COMBO_MIN_THRESHOULD; j < 0; j--) {
        console.log("i - j ", { i, j });
      }
    }
  };

  const checkRowCombo = () => {
    for (let i = 0; i < WIDTH; i++) {
      for (let j = WIDTH - COMBO_MIN_THRESHOULD; j < 0; j--) {
        console.log("i - j ", { i, j });
      }
    }
  };

  const dragStart = () => {};

  const dragDrop = () => {};

  const dragEnd = () => {};

  useEffect(() => {
    const timer = setInterval(() => {
      checkColumnCombo();
      setCurrentCandyArrangement([...currentCandyArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [currentCandyArrangement, checkColumnCombo]);

  useEffect(() => {
    createBoard();
  }, []);

  return (
    <div className="app">
      <div className="game">
        {currentCandyArrangement.map((candy, index) => (
          <img
            key={index}
            src={candy}
            alt={candy}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
