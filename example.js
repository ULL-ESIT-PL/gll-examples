var insp = require("util").inspect;
var ins = (x) => insp(x, {depth: null});

var packrattle = require("packrattle");

var csv = packrattle.repeatSeparated(
  packrattle.regex(/([^,]*)/).map(match => match[0]),
  /,/
);

var r = csv.run("this,is,csv");
console.log(r); // [ "this", "is", "csv" ]

var expr = packrattle.alt(
  [ () => expr, "+", () => expr ],
  packrattle.regex(/\d+/).map(match => match[0])
);

r = expr.run("3+10+200");
console.log(r); // [ [ '3', '+', '10' ], '+', '200' ]

var number = packrattle.regex(/\d+/).map(match => match[0]);
var id = packrattle.regex(/[a-z_]\w*/i).map(match => match[0]);
var factor = packrattle.alt(
  number,
  id,
  ['(', () => e, ')']
);
var term = packrattle.alt(
  [ () => term, "/", factor ],
  factor
);
var e = packrattle.alt(
  [ () => e, "-", term ],
  term
);


r = e.run("3-(a-200)/2");
console.log(ins(r)); // [ [ '3', '+', '10' ], '+', '200' ]

