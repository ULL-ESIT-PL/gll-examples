var insp = require("util").inspect;
var ins = (x) => insp(x, {depth: null});

var $p = require("packrattle");
var seq = $p.seq;
var alt = $p.alt;
var regex = $p.regex;
Array.prototype.sem = (f) => $p(this).map(f);

var _ = $p(/[ \t]*/);

var token = (char) => {
  let t = char;
  if (char.constructor.name === 'RegExp') 
    t = regex(char).map(m => m[0]);
  return  $p([ _, t, _ ]).map(m => m[1]);
};

var NUMBER = token(/\d+/); 
var LP = token('(');
var RP = token(')');
var MULT = token(new RegExp('[*/]'));
var ADD = token(/[+-]/);

var factor = alt(
  NUMBER.map((m) => parseInt(m)),
  seq( LP, () => e, RP).map(m => m[1])
);
var term = alt(
  $p([ () => term, MULT, factor ]).map(([t, op, f]) => eval(t+op+f)),
  factor
);
var e = alt(
  $p([ () => e, ADD, term ]).map(([t, op, f]) => eval(t+op+f)),
  term
);


var input = "3 + 5 * 4";
console.log(input);
r = e.run(input);
console.log(ins(r)); 

