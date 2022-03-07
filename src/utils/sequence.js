const randomNumber = () => Math.floor(10 * Math.random());

export const createSequence = (length = 10) => {
  const result = new Array(length);

  let lastNum = -1;
  for (let i = 0; i < length; i += 1) {
    let newNum = randomNumber();
    while (newNum === lastNum) {
      newNum = randomNumber();
    }

    result[i] = newNum;
    lastNum = newNum;
  }

  return result;
};

export const sequences = [
  5123710011, 6123453052, 3156392998, 9704992100, 8089897773, 9083933625,
  9124939504, 2539668444, 9084438724, 9136639698,
];
