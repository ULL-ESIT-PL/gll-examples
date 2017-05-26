var insp = require("util").inspect;
var ins = (x) => insp(x, {depth: null});

var $p = require("packrattle");
var seq = $p.seq;
var alt = $p.alt;
var regex = $p.regex;

var _ = $p(/[ \t]*/);

var token = (char) => {
  let t = char;
  if (char.constructor.name === 'RegExp') 
    t = regex(char).map(m => m[0]);
  return  $p([ _, t, _ ]).map(m => m[1]);
};

var NUMBER = token(/\d+/); 
var ID = token(/[a-z_]\w*/i);
var LP = token('(');
var RP = token(')');
var MULT = token(new RegExp('[*/]'));
var ADD = token(/[+-]/);

var factor = alt(
  NUMBER,
  ID,
  seq( LP, () => e, RP).map(m => m[1])
);
var term = alt(
  [ () => term, MULT, factor ],
  factor
);
var e = alt(
  [ () => e, ADD, term ],
  term
);


var input = "3 / b + (2 - a)*4";
console.log(input);
r = e.run(input);
console.log(ins(r)); 

