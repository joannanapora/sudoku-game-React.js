import React, { useState, useEffect } from "react";
import "./App.css";
import { createCells } from "./functions/create-cells.fn";
import { ICell } from "./functions/create-cells.fn";
import { validSolution } from "./functions/check.fn";

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

  const prepareListToCheck = () => {
    let listOfValues: any = [];
    cells.forEach((el) => {
      listOfValues.push(el.value);
    });
    let splittedListOfValues = [];
    for (let i = 0; i < listOfValues.length - 1; i += 9) {
      let part = listOfValues.slice(i, i + 9);
      splittedListOfValues.push(part);
    }

    if (
      validSolution([
        [8, 3, 5, 4, 1, 6, 9, 2, 7],
        [2, 9, 6, 8, 5, 7, 4, 3, 1],
        [4, 1, 7, 2, 9, 3, 6, 5, 8],
        [5, 6, 9, 1, 3, 4, 7, 8, 2],
        [1, 2, 3, 6, 7, 8, 5, 4, 9],
        [7, 4, 8, 5, 2, 9, 1, 6, 3],
        [6, 5, 2, 7, 8, 1, 3, 9, 4],
        [9, 8, 1, 3, 4, 5, 2, 7, 6],
        [3, 7, 4, 9, 6, 2, 8, 1, 5],
      ])
    ) {
      alert("WYGRALES");
    } else {
      alert("PRZEGRALES");
    }
  };

  const onCheck = () => {
    const emptyField = cells.find((el) => {
      return el.value === 0;
    });
    if (emptyField) {
      alert("Please fill in empty fields!!!");
    } else {
      prepareListToCheck();
    }
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
        <button onClick={onCheck} className="checkButton">
          CHECK
        </button>
      </div>
    </div>
  );
};

export default App;
