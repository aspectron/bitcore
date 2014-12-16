'use strict';

var run = function() {
  // Replace '../bitcore' with 'bitcore' if you use this code elsewhere.
  var bitcore = require('../../bitcore');
  var Peer = bitcore.Peer;

  var TransactionBuilder = bitcore.TransactionBuilder;
  var PeerManager = bitcore.PeerManager;

  // Unspent transactions can be found via the http://ltc.block-explorer.com/ or http://explorer.litecoin.net/
  var unspent = [{
      'txid': 'ee1db3d2ef4d66f83398edf0e4fd58b534f7526871f026f33f10459bc7615679',
      'vout': 0,
      'address': 'LUU1SKQi54iSvVyB443WFz5oqG1DRhzUkG',
      'scriptPubKey': '76a91465619af066dc11eb1a4fbe9e7a1c0e17dcdbe9c788ac',
      'amount': 0.00900000,
      'confirmations': 6
    }
  ];

  // Private keys from createkey example
  var keys = [
    'L3pKAvveaVyJTZKRkkNvS7mg5WTteP7HBn2aXH9stMcWir28v6rb'
  ];

  var peerman = new PeerManager({
    network: 'livenet',
    litecoin : true
  });

  peerman.addPeer(new Peer('127.0.0.1', 9333));

  peerman.on('connect', function() {
    var conn = peerman.getActiveConnection();
    if (conn) {
      // define transaction output
      var outs = [{
        address: 'LNaBMEa9c9VUf9gFFyjVuQSUFuu5j4pKDk',
        amount: 0.001
      }];
      // set change address
      var opts = {
        //remainderOut: {
        //  address: 'n4g2TFaQo8UgedwpkYdcQFF6xE2Ei9Czvy'
        //}
        litecoin : true
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
      // finally, send transaction to the litecoin network
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
