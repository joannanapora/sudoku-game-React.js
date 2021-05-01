
const compareRows = (sudokuArray) => {
    let isValid = true;
    sudokuArray.forEach((el, i) => {
        let array = new Set(el);
        if (9 !== array.size) {
            isValid = false;
        }
    });
    return isValid;
};

const convertColumnsToRows = (sudokuArray) => {
    let newArray = [];
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

const checkSquares = (sudokuArray) => {
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

const validSolution = (sudokuArray) => {
    let rows = compareRows(sudokuArray);
    let columns = compareRows(convertColumnsToRows(sudokuArray));
    let squares = checkSquares(sudokuArray);

    console.log(rows);
    console.log(columns);


    if (rows && columns && squares) {
        return true;
    } else {
        return false;
    }
};


console.log(validSolution([
    [8, 3, 5, 4, 1, 6, 9, 2, 7],
    [2, 9, 6, 8, 5, 7, 4, 3, 1],
    [4, 1, 7, 2, 9, 3, 6, 5, 8],
    [5, 6, 9, 1, 3, 4, 7, 8, 2],
    [1, 2, 3, 6, 7, 8, 5, 4, 9],
    [7, 4, 8, 5, 2, 9, 1, 6, 3],
    [6, 5, 2, 7, 8, 1, 3, 9, 4],
    [9, 8, 1, 3, 4, 5, 2, 7, 6],
    [3, 7, 4, 9, 6, 2, 8, 1, 5],
]));


