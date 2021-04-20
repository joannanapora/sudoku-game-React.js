import React from "react";

const numberIsValid = (number: any) => {
  if (number > 0 && number < 10) {
    return true;
  } else {
    return false;
  }
};

const uniqueRow = (array: any) => {
  let newArray: any = [...new Set(array)];
  if (compareArrays(array, newArray)) {
    return array;
  }
};

const compareArrays = (array1: any, array2: any) => {
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
};

const validRow = (row: any) => {
  let uniqRow = uniqueRow(row);
  if (row.every(numberIsValid) && compareArrays(row, uniqRow)) {
    return true;
  } else {
    return false;
  }
};

const checkRows = (sudokuArray: any) => {
  if (sudokuArray.every(validRow)) {
    return true;
  } else {
    return false;
  }
};

const transposeArray = (array: any) => {
  let newArray: any;
  for (let i = 0; i < array.length; i++) {
    newArray.push([]);
    for (let j = 0; j < array.length; j++) {
      newArray[i].push(array[j][i]);
    }
  }
  return newArray;
};

const checkSquares = (sudokuArray: any) => {
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      let square = [];
      for (let k = i; k < i + 3; k++) {
        for (let l = j; l < j + 3; l++) {
          square.push(sudokuArray[k][l]);
        }
      }
      if (!validRow(square)) {
        return false;
      }
    }
  }
  return true;
};

export const validSolution = (sudokuArray: any) => {
  let rows = checkRows(sudokuArray);
  let columns = checkRows(transposeArray(sudokuArray));
  let squares = checkSquares(sudokuArray);
  if (rows && columns && squares) {
    return true;
  } else {
    return false;
  }
};

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
]);
