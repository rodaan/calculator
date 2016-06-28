/* eslint-disable no-eval */
// Words to numbers
const wordsToNumbers = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
};

// Places
const placeToNumbers = {
  ten: '*10',
  hundred: '*100',
  thousand: '*1000',
  million: '*1000000',
  billion: '*1000000000',
  trillion: '*1000000000000',
  quadrillion: '*1000000000000000',
  quintillion: '*1000000000000000000',
  tenth: '/10',
  tenths: '/10',
  hundredth: '/100',
  hundredths: '/100',
  thousandth: '/1000',
  thousandths: '/1000',
  millionth: '/1000000',
  millionths: '/1000000',
  billionth: '/1000000000',
  billionths: '/1000000000',
  trillionth: '/1000000000000',
  trillionths: '/1000000000000',
  quadrillionth: '/1000000000000000',
  quadrillionths: '/1000000000000000',
  quintillionth: '/1000000000000000000',
  quintillionths: '/1000000000000000000',
};

// Operations:
const operations = {
  divided: '/',
  divide: '/',
  divisor: '/',
  over: '/',
  modulo: '%',
  mod: '%',
  remainder: '%',
  '^': '**',
  multiply: '*',
  times: '*',
  product: '*',
  plus: '+',
  add: '+',
  addition: '+',
  '+': '+',
  sum: '+',
  and: '+',
  subtract: '-',
  minus: '-',
  'take away': '-',
  less: '-',
  half: '/2',
  halves: '/2',
  third: '/3',
  thirds: '/3',
  quarter: '/4',
  quarters: '/4',
  fifth: '1/5',
  fifths: '/5',
  sixth: '/6',
  sixths: '/6',
  seventh: '/7',
  sevenths: '/7',
  eigth: '/8',
  eigths: '/8',
  ninth: '/9',
  ninths: '/9',
  squared: 'squared',
  cubed: 'cubed',
  root: 'root',
  exponent: 'exponent',
  power: 'power',
  '(': '(',
  ')': ')',
};

// Words that are filtered out
const filteredWords = {
  of: 'of',
  to: 'to',
  the: 'the',
  by: 'by',
};

// 3 cases:
// 1. numbers are in the objects wordsToNumbers,
// 2. numbers are less than 100,
// 3. bigger number

 // function that converts text to number
const textToNumber = (textArr) =>
  // iterate through the array and if a word is an english version of the word
  // calculation convert it to evaluatable string
  textArr.map((element, i, arr) => {
    let result = '';
    if (operations[element] !== undefined) {
      if (i === 0) {
        result += '1';
      }
      return result + operations[element];
    }
    if (placeToNumbers[element] !== undefined) {
      if (i === 0 || operations[arr[i - 1]] !== undefined) {
        result += '1';
      }
      if (operations[arr[i + 1]] === undefined
        && i !== arr.length - 1) {
        result += placeToNumbers[element];
        result += '+';
      } else {
        result += placeToNumbers[element];
      }
      return result;
    }
    if (wordsToNumbers[element] !== undefined) {
      return wordsToNumbers[element];
    }
    if (element.indexOf('-') > -1) {
      const eleArr = element.split('-');
      return wordsToNumbers[eleArr[0]] + wordsToNumbers[eleArr[1]];
    }
    return element;
  });

// Exponents, Multiplication, Division, Addition, Subtraction
const calculate = (mathQuery, callback) => {
  // split query into an array
  const queryArr = mathQuery.split(' ');

  // Calls textToNumber function with query array;
  const results = textToNumber(queryArr);
  const filteredResults = results.filter((element) => filteredWords[element] === undefined);

  // Needed for exponent function
  let skip = false;
  let skipCount = 0;
  console.log(results);
  // Checks for exponents can converts them
  const result = filteredResults.reduce((memo, curr, i, arr) => {
    if (skip === true && skipCount === 0) {
      skip = false;
      return memo;
    }
    if (skip === true && skipCount > 0) {
      skipCount--;
      return memo;
    }
    if (curr === '**') {
      memo.splice(i - 1, 1);
      memo.push(Math.pow(eval(arr[i - 1]), eval(arr[i + 1])));
      skip = true;
    } else if (curr === 'power' || curr === 'exponent') {
      memo.splice(i - 1, 1);
      memo.push(Math.pow(Number(eval(arr[i - 1])), Number(eval(arr[i + 1]))));
      skipCount = 0;
      skip = true;
    } else if (curr === 'take') {
      memo.push('-');
      skip = true;
      skipCount = 0;
    } else if (curr === 'square' && arr[i + 1] === 'root') {
      memo.push(Math.sqrt(Number(eval(arr[i + 2]))));
      skipCount = 1;
      skip = true;
    } else if (curr === 'squared') {
      memo.splice(i - 1, 1);
      memo.push(Math.pow(Number(arr[i - 1]), 2));
    } else if (curr === 'cubed') {
      memo.splice(i - 1, 1);
      memo.push(Math.pow(Number(arr[i - 1]), 3));
    } else {
      memo.push(curr);
    }
    return memo;
  }, []).join(' ');

  // Evaluates and sends back result as answer object
  let response;
  console.log(result);
  try {
    response = eval(result);
  } catch (err) {
    response = 'error';
  }
  callback(response);
};

export default { calculate };

// ToDO: Sum of ....
// product of ....
