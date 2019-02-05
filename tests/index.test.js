const helpers = require('../helpers');

const runTestKadane = (inputData, resultExpected) => {
  test('# Kadane', () => {
    expect(helpers.getMinAbsSliceSumKadane(inputData)).toBe(resultExpected);
  });
};

const runTestHeavy = (inputData, resultExpected) => {
  test('# Heavy', () => {
    expect(helpers.getMinAbsSliceSumHeavy(inputData)).toBe(resultExpected);
  });
};

const runTestSimple = (inputData, resultExpected) => {
  test('# Simple', () => {
    expect(helpers.getMinAbsSliceSumSimple(inputData)).toBe(resultExpected);
  });
};

/**
 * Full valid test cases
 * @param {Object | Array} inputData 
 * @param {Number} resultExpected 
 */
const runFullTestCase = (inputData, resultExpected) => {
  describe(`[${inputData}] to equal ${resultExpected}`, () => {
    runTestKadane(inputData, resultExpected);
    runTestHeavy(inputData, resultExpected);
    runTestSimple(inputData, resultExpected);
  });
};


/**
 * Invalid input data test cases
 * @param {Object} invalidData 
 */
const runErrorDataCase = (invalidData) => {
  describe(`# ${invalidData} to throw error`, () => {

    test('# Kadane', () => {
      expect(() => {
        helpers.getMinAbsSliceSumKadane(invalidData);
      }).toThrow(TypeError);
    });

    test('# Heavy', () => {
      expect(() => {
        helpers.getMinAbsSliceSumHeavy(invalidData);
      }).toThrow(TypeError);
    });

    test('# Simple', () => {
      expect(() => {
        helpers.getMinAbsSliceSumSimple(invalidData);
      }).toThrow(TypeError);
    });
  });

};


/**
 * Smallest Sub Array Absolute Sum Tests
 */
describe('# Get Mi  Abs Slice Sum', () => {

  /**
   * Positive tests
   */
  describe('# Positive tests', () => {

    runFullTestCase([2, -4, 6, -3, 9], 1);
    runFullTestCase([1, 3, 6, 4, 1, 2], 1);
    runFullTestCase([-4, -8, 2, 8, -3], 1);
    runFullTestCase([-10, 3, 10, -3, -1], 0);
    runFullTestCase([10, -2, 10, 7, 7], 2);
    runFullTestCase([1], 1);
    runFullTestCase([-1], 1);

  });

  /**
   * Negative tests
   */
  describe('# Negative tests', () => {
    runErrorDataCase(0);
    runErrorDataCase('');
    runErrorDataCase(null);
    runErrorDataCase([]);
  });
});
