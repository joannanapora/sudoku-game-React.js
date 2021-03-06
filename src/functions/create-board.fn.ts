let board = [
  [8, 3, 5, 4, 1, 6, 9, 2, 7],
  [2, 9, 6, 8, 5, 7, 4, 3, 1],
  [4, 1, 7, 2, 9, 3, 6, 5, 8],
  [5, 6, 9, 1, 3, 4, 7, 8, 2],
  [1, 2, 3, 6, 7, 8, 5, 4, 9],
  [7, 4, 8, 5, 2, 9, 1, 6, 3],
  [6, 5, 2, 7, 8, 1, 3, 9, 4],
  [9, 8, 1, 3, 4, 5, 2, 7, 6],
  [3, 7, 4, 9, 6, 2, 8, 1, 5],
];

let boardList = board
  .join()
  .split(",")
  .map((el) => Number(el));

export const createBoard = () => {
  let listToReturn: any = [];
  listToReturn = boardList.map((el, i) => {
    if (
      [
        0,
        13,
        20,
        21,
        25,
        33,
        38,
        44,
        47,
        48,
        51,
        52,
        1,
        3,
        6,
        8,
        12,
        11,
        15,
        18,
        16,
        17,
        20,
        24,
        28,
        30,
        31,
        32,
        36,
        37,
        40,
        42,
        46,
        50,
        54,
        58,
        60,
        61,
        62,
        64,
        67,
        70,
        73,
        75,
        78,
        79,
        81,
      ].includes(i)
    ) {
      return 0;
    }
    return el;
  });
  return listToReturn;
};
