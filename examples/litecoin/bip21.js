'use strict';


var run = function() {
  // Replace '../bitcore' with 'bitcore' if you use this code elsewhere.
  var bitcore = require('../../bitcore');
  var BIP21 = bitcore.BIP21;

  var uriString = 'litecoin:LUU1SKQi54iSvVyB443WFz5oqG1DRhzUkG?message=Hey%20there&amount=1.212';

  var uri = new BIP21(uriString);
  console.log(uri.isValid()); 
  console.log(uri.address);
  console.log(uri.data.message);
  console.log(uri.data.amount);

  var uriString = new BIP21({
    address: 'LUU1SKQi54iSvVyB443WFz5oqG1DRhzUkG',
    message: 'Hey there',
    amount: 1.212,
    litecoin : true
  }).getURI();

  console.log(uriString);

};

module.exports.run = run;
if (require.main === module) {
  run();
}