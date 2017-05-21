#!/usr/bin/env node --harmony --harmony_arrow_functions

var packrattle = require("packrattle");
var expr = packrattle.alt(
  [ () => expr, "*", () => expr ],
  [ () => expr, "-", () => expr ],
  packrattle.regex(/\s*(\d+)\s*/).map(match => parseInt(match[1], 10))
);
var r = expr.run("3-10*200");
console.log(r);
