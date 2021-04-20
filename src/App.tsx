import React, { useState, useEffect } from "react";
import "./App.css";
import { createCells } from "./functions/create-cells.fn";
import { ICell } from "./functions/create-cells.fn";

const App = () => {
  const [cells, setCells] = useState<ICell[]>(createCells());
  const [clickedNumber, setClickedNumber] = useState<number>(-1);
  const [idOfCell, setClickedCell] = useState<number>(-1);

  useEffect(() => {
    if (clickedNumber !== -1 && idOfCell !== -1) {
      let newList = cells.map((el) => {
        if (el.id === idOfCell) {
          return { ...el, value: clickedNumber };
        }
        return el;
      });
      setCells(newList);
    }
    return () => {
      setClickedNumber(-1);
      setClickedCell(-1);
    };
  }, [cells, clickedNumber]);

  const onCellClick = (id: number) => {
    setClickedCell(id);
    window.addEventListener("keydown", (event) => {
      if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(event.key)) {
        setClickedNumber(Number(event.key));
      }
    });
  };

  const onNumberClick = (el: number) => {
    if (idOfCell === -1) {
      return;
    }
    setClickedNumber(el);
  };

  return (
    <div className="App">
      <h1 className="header">SUDOKU</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el, i) => {
          return (
            <div
              onClick={() => onNumberClick(el)}
              className="divNumber"
              key={i}
            >
              {el}
            </div>
          );
        })}
      </div>
      <div className="grid">
        {cells?.map((el, i) => {
          return (
            <button
              className="sudokuButton"
              style={{ backgroundColor: el.color }}
              key={i}
              onClick={() => onCellClick(el.id)}
            >
              {el.value === 0 ? "" : el.value}
            </button>
          );
        })}
      </div>
      <div className="checkButtonContainer">
        <button className="checkButton">CHECK</button>
      </div>
    </div>
  );
};

export default App;
