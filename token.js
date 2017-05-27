var $p = require("packrattle");
var seq = $p.seq;
var alt = $p.alt;
var regex = $p.regex;

var _ = $p(/\s*/);

var setWhites = (r) => {
  _ = r;
};

var token = (char) => {
  let t = char;
  if (char.constructor.name === 'RegExp') 
    t = regex(char).map(m => m[0]);
  return  $p([ _, t, _ ]).map(m => m[1]);
};

module.exports = {
  setWhites: setWhites,
  token: token
};
