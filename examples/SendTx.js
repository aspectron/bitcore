'use strict';

var run = function() {
  // Replace '../bitcore' with 'bitcore' if you use this code elsewhere.
  var bitcore = require('../bitcore');
  var Peer = bitcore.Peer;

  var TransactionBuilder = bitcore.TransactionBuilder;
  var PeerManager = bitcore.PeerManager;

  // Unspent transactions can be found via the insight.bitcore.io or blockchain.info APIs
  var unspent = [{
       txid: "3cdc95128d8b3aba6f031ca1abf7b7f8559147c400d3d456ad2bc50dfd194670",
      'vout': 1,
      'address': 'LUU1SKQi54iSvVyB443WFz5oqG1DRhzUkG',
      'scriptPubKey': '76a91465619af066dc11eb1a4fbe9e7a1c0e17dcdbe9c788ac',
      amount:  0.00790000,
      confirmations: 567
    }
  ];

  // Private keys in WIF format (see TransactionBuilder.js for other options)
  var keys = [
    'L3pKAvveaVyJTZKRkkNvS7mg5WTteP7HBn2aXH9stMcWir28v6rb'
  ];

  var peerman = new PeerManager({
    network: 'livenet'
  });
  peerman.addPeer(new Peer('127.0.0.1', 9333));

  peerman.on('connect', function() {
    var conn = peerman.getActiveConnection();
    if (conn) {
      // define transaction output
      var outs = [{
        address: 'LNaBMEa9c9VUf9gFFyjVuQSUFuu5j4pKDk',
        amount: 0.1337
      }];
      // set change address
      var opts = {
        //remainderOut: {
        //  address: 'n4g2TFaQo8UgedwpkYdcQFF6xE2Ei9Czvy'
        //}
      };
      var tx = new TransactionBuilder(opts)
        .setUnspent(unspent)
        .setOutputs(outs)
        .sign(keys)
        .build();

      /* Create and signing can be done in multiple steps:
       *
       *  var builder = new bitcore.TransactionBuilder(opts)
       *                .setUnspent(utxos)
       *                .setOutputs(outs);
       *
       *  // Sign with the first key
       *  builder.sign(key1);
       *  var tx = builder.build(); // Partially signed transaction
       *
       *  // Sign with the second key
       *  builder.sign(key2);
       *  if (builder.isFullySigned()){
       *   var tx = builder.build();
       *  }
       *
       *  var selectedUnspent = build.getSelectedUnspent(); // Retrieve selected unspent outputs from the transaction
       */

      var txid = tx.getHash().toString('hex');
      console.log('Created transaction with txid ' + txid);
      var raw_tx = tx.serialize().toString('hex');
      console.log('Transaction raw hex dump:');
      console.log('-------------------------------------');
      console.log(raw_tx);
      console.log('-------------------------------------');
      // finally, send transaction to the bitcoin network
      conn.sendTx(tx);

      // for now, the network won't respond in any case
      // (transaction accepted, transaction rejected)
      // in the future, we may listen to 'reject' message
      // see https://gist.github.com/gavinandresen/7079034
    }
  });

  peerman.start();

};

module.exports.run = run;
if (require.main === module) {
  run();
}
