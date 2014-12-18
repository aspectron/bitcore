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

  var utxos2 = [{
    address: "LTT1VWESu5FLVc2VRGXEhE36N9Qdab1aDu",
    txid: "8350e066371c556363d2f4242e7b9716ba1cc4ede3389567844d3bc4a07ec001",
    vout: 0,    
    scriptPubKey: "52210270989586061d47bf886cb9a26382aa8709d0db59c734b757c2b993dfc53123da210386b63c654b64d22e013ccf8095f7ac6b21d5d71cdaf36754eacfa84af60898242103e86d7cfc6aa109bbfa3b4ea51df52116eefc4e3ad4fa4b165b2218fea787466253ae",
    amount:  0.00400000,
    confirmations: 1
  }];

  outs = [{
    address: "LNaBMEa9c9VUf9gFFyjVuQSUFuu5j4pKDk",
    amount: 0.003
  }];

 
  var b = new Builder(opts)
    .setUnspent(utxos2)
    .setOutputs(outs)
    .sign(privs);

 
  var tx = b.build();


  var txHex = tx.serialize().toString('hex');
  console.log('1) REDEEM SCRIPT: ', txHex);
  console.log('=> Is signed status:', b.isFullySigned(), tx.countInputMissingSignatures(0));

};

if (typeof module !== 'undefined') {
  module.exports.run = run;
  if (require.main === module) {
    run();
  }
} else {
  run();
}
