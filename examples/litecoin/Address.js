'use strict';


var run = function() {
  // Replace '../bitcore' with 'bitcore' if you use this code elsewhere.
  var bitcore = require('../../bitcore');
  var Address = bitcore.Address;

  var addrs = [
    'Lg84r4bmLk1UqmMaZmJWTa99WEzV1mWLjt', // litecoin address
    'A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    '1600 Pennsylvania Ave NW',
  ].map(function(addr) {
    return new Address(addr, 'ltc');    
  });

  addrs.forEach(function(addr) {
    var valid = addr.isValid();
    console.log(addr.data + ' is ' + (valid ? '' : 'not ') + 'valid');   
  });

  console.log("Lg84r4bmLk1UqmMaZmJWTa99WEzV1mWLjt :: ",Address.validate('Lg84r4bmLk1UqmMaZmJWTa99WEzV1mWLjt','ltc'))

  console.log("getScriptPubKeyFor :: ",Address.getScriptPubKeyFor('Lg84r4bmLk1UqmMaZmJWTa99WEzV1mWLjt','ltc'))  


};

module.exports.run = run;
if (require.main === module) {
  run();
}