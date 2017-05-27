var insp = require("util").inspect;
var ins = (x) => insp(x, {depth: null});

var $p = require("packrattle");
var seq = $p.seq;
var alt = $p.alt;
var regex = $p.regex;
var {setWhites, token} = require("token");

/* Lexical analysis */
var NUMBER = token(/\d+/); 
var LP = token('(');
var RP = token(')');
var MULT = token(new RegExp('[*/]'));
var ADD = token(/[+-]/);

/* Recursive rules */
var Exp = () => exp;
var Term = () => term;

/* Grammar */
var factor = alt(
  NUMBER.map((m) => parseInt(m)),
  seq( LP, Exp, RP).map(m => m[1])
);
var term = alt(
  $p([ Term, MULT, factor ]).map(([t, op, f]) => eval(t+op+f)),
  factor
);
var exp = alt(
  $p([ Exp, ADD, term ]).map(([t, op, f]) => eval(t+op+f)),
  term
);


var input = "3 + 5 * (4 - 2)";
console.log(input);
r = exp.run(input);
console.log(ins(r));  // 13

