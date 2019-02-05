/**
 * Creates a random array according to the passed parameters
 * @param {Number} numberOfItems 
 */
const _createArray = (numberOfItems, maxNumber) => {

  if (!(numberOfItems && maxNumber)) {
    throw new TypeError('_createArray: invalid parameters provided');
  }

  const output = [];
  const ITEM_MIN = 0;
  const ITEM_MAX = maxNumber;

  for (let index = 0; index < numberOfItems; index++) {
    const multiplier = Math.random() < 0.5 ? -1 : 1;
    const number = Math.floor(Math.random() * (ITEM_MAX - ITEM_MIN + 1)) + ITEM_MIN;
    const item = number * multiplier;
    output.push(item);
  }
  return output;
};

/**
 * The most efficient algorithm of finding the minimum absolute sum of items in subarrays of array. 
 * @param {Array} inputArray 
 */
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


/**
 * The simple, but heavy solutions
 * Checks all the possible variations
 * Very slow algorithm
 * @param {Array} inputArray 
 */
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

/**
 * Pretty accurate and fast algorithm
 * @param {Array} inputArray 
 */
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


module.exports = {
  /**
   * Kadane algorithm realization
   * @param {Array} inputArray 
   */
  getMinAbsSliceSumKadane(inputArray) {
    return _getMinAbsSliceSumKadane(inputArray);
  },

  /**
   * Heave (CPU consuming) solution.
   * Pretty heavy, but accurate
   * @param {Array} inputArray 
   */
  getMinAbsSliceSumHeavy(inputArray) {
    return _getMinAbsSliceSumHeavy(inputArray);
  },

  /**
   * Simple and accurate solution
   * @param {Array} inputArray 
   */
  getMinAbsSliceSumSimple(inputArray) {
    return _getMinAbsSliceSumSimple(inputArray);
  },

  /**
   * Runs all the solutions to count MinAbsSliceSum
   * @param {Number} numberOfItems 
   * @param {Number} maxNumber 
   */
  runWithRandomData(numberOfItems = 100, maxNumber = 10000) {
    const inputArray = _createArray(numberOfItems, maxNumber);

    const resultKadane = _getMinAbsSliceSumKadane(inputArray);
    console.log('# Kadane: ', resultKadane);

    const resultSimple = _getMinAbsSliceSumSimple(inputArray);
    console.log('# Simple: ', resultSimple);

    const resultHeavy = _getMinAbsSliceSumHeavy(inputArray);
    console.log('# Heavy: ', resultHeavy);

    return {
      kadane: resultKadane,
      heavy: resultHeavy,
      simple: resultSimple,
    };
  },
};

const isArrayValid = (inputArray) => {
  return !!(inputArray && Array.isArray(inputArray) && inputArray.length > 0);
};
