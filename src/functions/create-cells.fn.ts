export interface ICell {
  id: number;
  value: number;
  color: string;
  notToChange: boolean;
}

export const createCells = () => {
  let listOfCells: ICell[] = [];

  for (let i = 0; i < 81; i++) {
    const setColor = () => {
      if (
        [
          3,
          4,
          5,
          12,
          13,
          14,
          21,
          22,
          23,
          27,
          28,
          29,
          33,
          34,
          35,
          36,
          37,
          38,
          42,
          43,
          44,
          45,
          46,
          47,
          51,
          52,
          53,
          57,
          58,
          59,
          66,
          67,
          68,
          75,
          76,
          77,
        ].includes(i)
      )
        return "#989898";
      else {
        return "#BEBEBE";
      }
    };

    listOfCells.push({
      id: i,
      value: 0,
      color: setColor(),
      notToChange: false,
    });
  }

  return listOfCells;
};
