'use strict';

var run = function() {
  // Replace '../bitcore' with 'bitcore' if you use this code elsewhere.
  var bitcore = require('../../bitcore');
  var RpcClient = bitcore.RpcClient;
  var hash = '5d3dfaba6122d740a2ff756d8391a0a430b95ff9be0ae3ce1beae1dfd7b898cc';

  var config = {
    protocol: 'http',
    user: 'ltc',
    pass: 'q1w2e3r4',
    host: '127.0.0.1',
    port: '9332',
  };

  var rpc = new RpcClient(config);

  rpc.getBlock(hash, function(err, ret) {
    if (err) {
      console.error('An error occured fetching block', hash);
      console.error(err);
      return;
    }
    console.log(ret);
  });
};

module.exports.run = run;
if (require.main === module) {
  run();
}
