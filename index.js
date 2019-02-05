const helper = require('./helpers');

/**
 * Runs all the solutions to count MinAbsSliceSum
 * Accepts 2 parameters
 * numbers of items
 * max/min number
 */
const result = helper.runWithRandomData(100, 10000);
console.log('RESULT: ', result);
