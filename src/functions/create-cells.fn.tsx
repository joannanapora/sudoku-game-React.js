export interface ICell {
  id: number;
  value: number;
  color: string;
}

export const createCells = () => {
  let listOfCells: ICell[] = [];

  for (let i = 0; i < 81; i++) {
    const setColor = () => {
      if (
        i === 3 ||
        i === 4 ||
        i === 5 ||
        i === 12 ||
        i === 13 ||
        i === 14 ||
        i === 21 ||
        i === 22 ||
        i === 23 ||
        i === 27 ||
        i === 28 ||
        i === 29 ||
        i === 33 ||
        i === 34 ||
        i === 35 ||
        i === 36 ||
        i === 37 ||
        i === 38 ||
        i === 42 ||
        i === 43 ||
        i === 44 ||
        i === 45 ||
        i === 46 ||
        i === 47 ||
        i === 51 ||
        i === 52 ||
        i === 53 ||
        i === 57 ||
        i === 58 ||
        i === 59 ||
        i === 66 ||
        i === 67 ||
        i === 68 ||
        i === 75 ||
        i === 76 ||
        i === 77
      )
        return "#989898";
      else {
        return "#BEBEBE";
      }
    };

    listOfCells.push({
      id: i,
      value: 1,
      color: setColor(),
    });
  }

  return listOfCells;
};
