
export const compareRows = (sudokuArray: number[][]): boolean => {
  let isValid = true;
  sudokuArray.forEach((el, i) => {
    let array = new Set();
    if (9 !== array.size) {
      isValid = false;
    }
  });
  return isValid;
};

export const convertColumnsToRows = (sudokuArray: number[][]) => {
  let newArray: number[][] = [];
  for (let i = 0; i < 9; i++) {
    newArray.push([]);
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      newArray[i].push(sudokuArray[j][i]);
    }
  }
  return newArray;
};

const checkSquares = (sudokuArray: number[][]) => {
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      let square = [];
      for (let k = i; k < i + 3; k++) {
        for (let l = j; l < j + 3; l++) {
          square.push(sudokuArray[l][k]);
        }
      }
      let array = new Set(square);
      if (9 !== array.size) {
        return false;
      }
    }
  }
  return true;
};

export const validSolution = (sudokuArray: any) => {
  let rows = compareRows(sudokuArray);
  let columns = compareRows(convertColumnsToRows(sudokuArray));
  let squares = checkSquares(sudokuArray);
  if (rows && columns && squares) {
    return true;
  } else {
    return false;
  }
};
