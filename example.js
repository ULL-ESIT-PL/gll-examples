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

