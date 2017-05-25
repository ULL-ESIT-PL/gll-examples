var insp = require("util").inspect;
var ins = (x) => insp(x, {depth: null});

var packrattle = require("packrattle");

var number = packrattle.regex(/\d+/).map(match => match[0]);
var id = packrattle.regex(/[a-z_]\w*/i).map(match => match[0]);
var factor = packrattle.alt(
  number,
  id,
  ['(', () => e, ')']
);
var term = packrattle.alt(
  [ () => term, "/", factor ],
  [ () => term, "*", factor ],
  factor
);
var e = packrattle.alt(
  [ () => e, "-", term ],
  [ () => e, "+", term ],
  term
);


r = e.run("3+(a-200)*b/2");
console.log(ins(r)); 

