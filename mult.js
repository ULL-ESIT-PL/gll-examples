var util = require("util");
var packrattle = require("packrattle");
//var number = packrattle.regex(/\d+/);
//var number = packrattle.regex(/\s*(\d+)\s*/).map((match) => match[1]);
var whitespace = packrattle(/[ \t]+/).optional();
//var multiply = packrattle([ number, "*",  number ]);
//var multiply = packrattle.seq(number, "*", number);
//var r = multiply.run("  3  *  4  ");
//console.log(r);


/*
try {
  multiply.run("3@4")
} catch (error) {
  console.log(error.message);
  error.span.toSquiggles().forEach(line => console.log(line));
}

try { multiply.run("3@4") } catch (error) { console.log(util.inspect(error)) }

*/

var number = packrattle.regex(/\d+/).map(match => parseInt(match[0], 10));
var factor = number.or(() => multiply);
var star = packrattle([ whitespace, "*", whitespace ]).drop();
//var multiply = packrattle([ factor, star, factor ]).map(match => match[0] * match[1]);
//r = multiply.run("3 * 4");
//console.log(r);
// 12
//r = multiply.run("4 * 5 * 7");
//console.log(r);
// 140

var multiply = packrattle.reduce(number, star, {
  first: n => ({ number: n }),
  next: (total, operator, n) => ({ multiply: [ total, { number: n } ] })
});

r = multiply.run("42");
console.log(r);

r  = multiply.run("4 * 5 * 7");
console.log(util.inspect(r, {depth: null}));
