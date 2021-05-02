import React, { useState, useEffect } from "react";
import "./App.css";
import { createCells } from "./functions/create-cells.fn";
import { ICell } from "./functions/create-cells.fn";
import { validSolution } from "./functions/check.fn";
import { createBoard } from "./functions/create-board.fn";

interface IAlerts {
  fillField: boolean;
  won: boolean;
  lost: boolean;
  start: boolean;
}

const App = () => {
  const [cells, setCells] = useState<ICell[]>(createCells());
  const [clickedNumber, setClickedNumber] = useState<number>(-1);
  const [idOfCell, setClickedCell] = useState<number>(-1);
  const [alerts, setAlerts] = useState<IAlerts>({
    fillField: false,
    won: false,
    lost: false,
    start: true,
  });

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
    };
  }, [cells, clickedNumber, idOfCell]);

  const onCellClick = (id: number, ifDisabled: boolean) => {
    if (alerts.won) {
      setAlerts({ ...alerts, start: true, won: false });
    }

    setAlerts({ ...alerts, fillField: false, lost: false });

    if (ifDisabled) {
      setClickedCell(-1);
      return;
    }
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

    if (validSolution(splittedListOfValues)) {
      setAlerts({ ...alerts, won: true, lost: false, fillField: false });
    } else {
      setAlerts({ ...alerts, lost: true, won: false, fillField: false });
    }
  };

  const onCheck = () => {
    const emptyField = cells.find((el) => {
      return el.value === 0;
    });
    if (emptyField) {
      setAlerts({ ...alerts, fillField: true });
    } else {
      prepareListToCheck();
    }
  };

  const onOk = () => {
    setAlerts({
      won: false,
      lost: false,
      start: false,
      fillField: false,
    });
  };

  const onStartClick = () => {
    onRestart();
    setAlerts({ fillField: false, lost: false, won: false, start: false });
  };

  const onRestart = () => {
    setAlerts({ fillField: false, lost: false, won: false, start: false });
    let cleanedBoard = createBoard();
    let newList = cells.map((el, i) => {
      return {
        ...el,
        value: Number(cleanedBoard[i]),
        notToChange: Number(cleanedBoard[i]) !== 0,
      };
    });

    setCells(newList);
  };

  const onClean = () => {
    if (idOfCell === -1) {
      return;
    }
    let newList = cells.map((el) => {
      if (el.id === idOfCell) {
        return { ...el, value: 0 };
      }
      return el;
    });
    setCells(newList);
  };

  return (
    <div className="App">
      <h1 className="header">SUDOKU</h1>
      <div className="numbers-container">
        <div className="functions-list">
          <div onClick={onRestart} className="controls">
            RESTART
          </div>
          <div onClick={onClean} className="controls">
            CLEAN
          </div>
        </div>
        <div className="functions-list">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el, i) => {
            return (
              <div
                onClick={() => onNumberClick(el)}
                className="controls"
                key={i}
              >
                {el}
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid">
        {alerts.won && (
          <div className="alert-container">
            <h1 className="result win">WIN !</h1>
          </div>
        )}
        {alerts.start && (
          <div className="alert-container">
            <h1 onClick={onStartClick} className="result start">
              START
            </h1>
          </div>
        )}
        {alerts.lost && (
          <div className="alert-container">
            <h1 className="result lose">KEEP TRYING</h1>
          </div>
        )}
        {alerts.fillField && (
          <div className="alert-container">
            <h1 className="result empty">EMPTY FIELDS</h1>
          </div>
        )}
        {cells?.map((el, i) => {
          return (
            <button
              className={
                el.notToChange ? "disabledSudokuButton" : "sudokuButton"
              }
              style={
                idOfCell === el.id
                  ? { backgroundColor: "orange" }
                  : { backgroundColor: el.color }
              }
              key={i}
              onClick={() => onCellClick(el.id, el.notToChange)}
            >
              {el.value === 0 ? "" : el.value}
            </button>
          );
        })}
      </div>
      <div className="demo">
        (demo version, generating random board in progress)
      </div>
      <div className="checkButtonContainer">
        <button
          disabled={alerts.start}
          onClick={onCheck}
          className="checkButton"
        >
          CHECK
        </button>
      </div>
    </div>
  );
};

export default App;
