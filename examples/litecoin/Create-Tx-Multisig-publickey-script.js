var run = function() {
  bitcore = typeof(bitcore) === 'undefined' ? require('../../bitcore') : bitcore;
  var networks = require('../../networks');
  var WalletKey = bitcore.WalletKey;
  var Builder = bitcore.TransactionBuilder;  
 
  var opts = {
    network: networks['ltc'].livenet,
    litecoin : true
  };

  console.log('## Network: ' + opts.network.name);
 
  var input = {};
  input.addr = "LUU1SKQi54iSvVyB443WFz5oqG1DRhzUkG";
  input.priv = "L3pKAvveaVyJTZKRkkNvS7mg5WTteP7HBn2aXH9stMcWir28v6rb";

  // Complete with the corresponding UTXO you want to use
  var utxos = [{
    address: input.addr,
    txid: "748e3ca4e604019e092990e83c72a1491a866c6e9c9b7ac5b8f9342cff11b9d5",
    vout: 1,
    scriptPubKey: "76a91465619af066dc11eb1a4fbe9e7a1c0e17dcdbe9c788ac",
    amount:  0.00680000,
    confirmations: 19
  }];

  var privs = [
    "L46ZG4Zd3REpV9bRZHhudnzYWUPP5f1ThZKXnRBaaqmfe24tRypJ",
    "L5jWb6GosRkBkbkmncZkQzrsKoByeu8nmc8fzLE8WYam3v9RKh8f",
    "L1oh7uu5JMwTjAtrxCxk1GjWPAvevZ74Fe14aUf1wDeQP9tZUDj2"
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
    amount: 0.002
  }];

  var tx = new Builder(opts)
    .setUnspent(utxos)
    .setOutputs(outs)
    .sign([input.priv])
    .build();


  var txid = tx.getHash().toString('hex');
  console.log('Created transaction with txid ' + txid);
  var raw_tx = tx.serialize().toString('hex');
  console.log('Multisig Transaction raw hex dump:');
  console.log('-------------------------------------');
  console.log(raw_tx);
  console.log('-------------------------------------');

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
