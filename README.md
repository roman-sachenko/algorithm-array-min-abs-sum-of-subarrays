# Introduction

MinAbsSliceSum <br>

Solutions to find the minimum absolute sum of items in a sub-array inside array.


## Installation

Install npm modules `$ npm i`


## Run Tests

Command: `$ npm test` <br>
Description: Tests will be executed for all the solutions


## Run solutions

1. Open `./index.js` file
2. Pass needed parameters to `runWithRandomData` function. First parameters are the number of items in an array. Second parameter is the maximum (at the same time minimum) number in array
3. Run script `$ node index.js`


## Solutions


### Simple and pretty accurate solution

```
const _getMinAbsSliceSumSimple = (inputArray) => {
  if (!isArrayValid(inputArray)) {
    throw new TypeError('valid array should be provided');
  }

  if (inputArray.length === 1) {
    return Math.abs(inputArray[0]);
  }

  const sumsArray = new Array(inputArray.length + 1);
  let minAbsSum = Math.abs(inputArray[0]);

  sumsArray[0] = 0;
  let minAbsItem = Math.abs(inputArray[0]);

  for (let index = 0; index < inputArray.length; index++) {
    sumsArray[index + 1] = inputArray[index] + sumsArray[index];
    if (Math.abs(inputArray[index + 1]) < minAbsItem) {
      minAbsItem = Math.abs(inputArray[index + 1]);
    }
  }

  sumsArray.sort();

  for (let index = 1; index < sumsArray.length; index++) {
    minAbsSum = Math.min(minAbsItem, minAbsSum, Math.abs(sumsArray[index] - sumsArray[index - 1]));
  }

  return minAbsSum;
};
```


### Very heavy and CPU consuming, but still accurate

```
const _getMinAbsSliceSumHeavy = (inputArray) => {
  if (!isArrayValid(inputArray)) {
    throw new TypeError('valid array should be provided');
  }

  if (inputArray.length === 1) {
    return Math.abs(inputArray[0]);
  }

  const getArraySum = array => array.reduce((sum, el) => sum + el, 0);

  let minSum = Number.MAX_SAFE_INTEGER;
  const { length } = inputArray;

  for (let index = 0; index < length; index++) {
    let sum = inputArray[index];
    for (let j = index + 1; j <= length; j++) {
      const subArray = inputArray.slice(index, j);
      sum = Math.abs(getArraySum(subArray));
      minSum = Math.min(minSum, sum);
    }
  }

  return minSum;
};
```


### Kadane solution

```
const _getMinAbsSliceSumKadane = (inputArray) => {
  if (!isArrayValid(inputArray)) {
    throw new TypeError('valid array should be provided');
  }

  if (inputArray.length === 1) {
    return Math.abs(inputArray[0]);
  }

  const arrayLength = inputArray.length;
  let minSum = Math.abs(inputArray[0]);
  let currentSum = 0;

  for (let index = 0; index < arrayLength; index++) {

    currentSum += inputArray[index];

    if (minSum > Math.abs(inputArray[index])) {
      minSum = Math.abs(inputArray[index]);
    }

    if (Math.abs(currentSum) < minSum) {
      minSum = Math.abs(currentSum);
    }

    if (Math.abs(currentSum) > minSum) {
      currentSum = minSum;
    }
  }
  return minSum;
};
```