'use strict';

var run = function() {
  // Replace '../bitcore' with 'bitcore' if you use this code elsewhere.
  var bitcore = require('../../bitcore');
  var NetworkMonitor = bitcore.NetworkMonitor;

  var config = {
    networkName: 'livenet',
    host: '127.0.0.1',
    port: 9333,
    litecoin : true
  };


  var nm = new NetworkMonitor.create(config);

  // transaction record
  nm.on('tx',function(info){
    console.log("---------------------")
    console.log(info)
  })

  // connect to bitcoin network and start listening
  nm.start();

};

module.exports.run = run;
if (require.main === module) {
  run();
}
