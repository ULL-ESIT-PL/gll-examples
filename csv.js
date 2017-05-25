var packrattle = require("packrattle");

var csv = packrattle.repeatSeparated(
  packrattle.regex(/([^,]*)/).map(match => match[0]),
  /,/
);

var r = csv.run("this,is,csv");
console.log(r); // [ "this", "is", "csv" ]


