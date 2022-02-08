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
