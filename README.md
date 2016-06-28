# text-calculator

Text calculator built with web speech API in mind but is able to translate text and calculate it. Was built for calculating 'math-speak'.

### Version
1.1.0

### Installation
```sh
$ npm i --save text-calculator
```

### Usage
Pass in a text query with basic math formulas. Note: It does not handle parenthesis as people do not say usually say "open parenthesis five plus six close parenthesis times 4" to mean "(5 + 6) * 4". 
```js
var textCalculator = require('text-calculator');

// takes in a text string and returns calculation result as a number or 'error' text if it does not understand the mathQuery given

textCalculator.calculate(mathQuery, (result) => {
    console.log(result); // 
});
  
// Examples math query input and output:
'fifty-one plus five'  --> 56
'fifty-one + 5' --> 56
'million and 45' --> 1000045
'million one hundred' --> 1000100
'sdfdsfhjkdf' --> 'error'
'parenthesis million parenthesis one hundred' --> 'error'
'5 exponent 2' --> 25
'5 to the power of 2' --> 25
'6 ^ 5' --> 7776
'5 mod 2' --> 1
'5 divided by 2' --> 2.5
'four divide four' --> 1
'square root of 4' --> 2
'million plus one tenth' --> 1000000.1
'half' --> 0.5
'6 take away 3' --> 3
'6 minus 3' --> 3
'5 cubed' --> 125
'6 squared' --> 36
and many more...


```    

License
----
MIT