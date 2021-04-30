import React, { useState, useEffect } from "react";
import "./App.css";
import { createCells } from "./functions/create-cells.fn";
import { ICell } from "./functions/create-cells.fn";
import { validSolution } from "./functions/check.fn";
import { createBoard } from "./functions/create-board.fn";
import { LVL } from "./functions/create-board.fn";

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
  }, [cells, clickedNumber]);

  const onCellClick = (id: number, ifDisabled: boolean) => {
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
      let newList = cells.map((el) => {
        return { ...el, value: 0 };
      });
      setCells(newList);
      setAlerts({ ...alerts, won: true, lost: false });
    } else {
      setAlerts({ ...alerts, lost: true, won: false });
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
      fillField: false,
      won: false,
      lost: false,
      start: false,
    });
  };

  const onStartClick = () => {
    onRestart();
    setAlerts({ ...alerts, start: false });
  };

  const onRestart = () => {
    let cleanedBoard = createBoard(LVL.HARD);
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
        <div className="functions">
          <div onClick={onRestart} className="controls">
            RESTART
          </div>
          <div onClick={onClean} className="controls">
            CLEAN
          </div>
        </div>
        <div className="numbers">
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
      {alerts.won && <h1 className="result-win">WIN !</h1>}
      {alerts.start && (
        <h1 onClick={onStartClick} className="result-start">
          START
        </h1>
      )}
      {alerts.lost && <h1 className="result-lose">KEEP TRYING</h1>}
      {alerts.fillField && <h1 className="result-empty">EMPTY FIELDS</h1>}
      {alerts.fillField || alerts.lost ? (
        <h1 onClick={onOk} className="result-ok">
          return to game
        </h1>
      ) : null}
      <div className="grid">
        {cells?.map((el, i) => {
          return (
            <button
              className={
                el.notToChange ? "disabledSudokuButton" : "sudokuButton"
              }
              style={{ backgroundColor: el.color }}
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
        <button onClick={onCheck} className="checkButton">
          CHECK
        </button>
      </div>
    </div>
  );
};

export default App;
