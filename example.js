var insp = require("util").inspect;
var ins = (x) => insp(x, {depth: null});

var $p = require("packrattle");

var _ = $p(/[ \t]*/);

var token = (char) => {
  let t = char;
  if (char.constructor.name === 'RegExp') 
    t = $p.regex(char).map(m => m[0]);
  return  $p([ _, t, _ ]).map(m => m[1]);
};

var NUMBER = token(/\d+/); 
var ID = token(/[a-z_]\w*/i);
var LP = token('(');
var RP = token(')');
var MULT = token(new RegExp('[*/]'));
var ADD = token(/[+-]/);

var factor = $p.alt(
  NUMBER,
  ID,
  $p.seq( LP, () => e, RP).map(m => m[1])
);
var term = $p.alt(
  [ () => term, MULT, factor ],
  factor
);
var e = $p.alt(
  [ () => e, ADD, term ],
  term
);


var input = "3 / b + (2 - a)*4";
console.log(input);
r = e.run(input);
console.log(ins(r)); 

