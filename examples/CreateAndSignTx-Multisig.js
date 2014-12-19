var run = function() {
  bitcore = typeof(bitcore) === 'undefined' ? require('../bitcore') : bitcore;
  var networks = require('../networks');
  var WalletKey = bitcore.WalletKey;
  var Builder = bitcore.TransactionBuilder;
  var opts = {
    network: networks.testnet
  };

  console.log('## Network: ' + opts.network.name);

  var input = {};
  input.addr = "LUU1SKQi54iSvVyB443WFz5oqG1DRhzUkG";
  input.priv = "L3pKAvveaVyJTZKRkkNvS7mg5WTteP7HBn2aXH9stMcWir28v6rb";

  // Complete with the corresponding UTXO you want to use
  var utxos = [{
    address: input.addr,
    txid: "8f8dacda3d0eee31cb339eb3c918c979d1e3d1475274be73ee6714cc60e47aac",
    vout: 1,
    //ts: 1396288753,
    scriptPubKey: "76a91465619af066dc11eb1a4fbe9e7a1c0e17dcdbe9c788ac",
    amount: 0.00500000,
    confirmations: 2
  }];

  var privs = [
    "L46ZG4Zd3REpV9bRZHhudnzYWUPP5f1ThZKXnRBaaqmfe24tRypJ",
    "L5jWb6GosRkBkbkmncZkQzrsKoByeu8nmc8fzLE8WYam3v9RKh8f",
    "L1oh7uu5JMwTjAtrxCxk1GjWPAvevZ74Fe14aUf1wDeQP9tZUDj2",
  ];

  var pubkeys = []
  privs.forEach(function(p) {
    var wk = new WalletKey(opts);
    wk.fromObj({
      priv: p
    });
    pubkeys.push(bitcore.buffertools.toHex(wk.privKey.public));
  });


  var outs = [{
    nreq: 2,
    pubkeys: pubkeys,
    amount: 0.004
  }];
  var tx = new Builder(opts)
    .setUnspent(utxos)
    .setOutputs(outs)
    .sign([input.priv])
    .build();
  var txHex = tx.serialize().toString('hex');
  console.log('1) SEND TO MULSISIG TX: ', txHex);
 


  //save scriptPubKey
  //var scriptPubKey = tx.outs[0].s.toString('hex');

  /* 
   *
   * REDDEEM TX
   */
  /*var utxos2 = [{
    address: input.addr,
    txid: "e4bc22d8c519d3cf848d710619f8480be56176a4a6548dfbe865ab3886b578b5",
    vout: 0,
    ts: 1396288753,
    scriptPubKey: scriptPubKey,
    amount: 0.05,
    confirmations: 2
  }];

  outs = [{
    address: input.addr,
    amount: 0.04
  }];
  var b = new Builder(opts)
    .setUnspent(utxos2)
    .setOutputs(outs)
    .sign(privs);


  tx = b.build();


  var txHex = tx.serialize().toString('hex');
  console.log('2) REDEEM SCRIPT: ', txHex);
  console.log('=> Is signed status:', b.isFullySigned(), tx.countInputMissingSignatures(0));

  console.log('[this example originally generated TXID: 1eb388977b2de99562eb0fbcc661a100eaffed99c53bfcfebe5a087002039b83 on testnet]\n\n\thttp://test.bitcore.io/tx/1eb388977b2de99562eb0fbcc661a100eaffed99c53bfcfebe5a087002039b83');
  */
};

// This is just for browser & mocha compatibility
if (typeof module !== 'undefined') {
  module.exports.run = run;
  if (require.main === module) {
    run();
  }
} else {
  run();
}

////
