var Put = require('bufferput');
var buffertools = require('buffertools');
var hex = function(hex) {
  return new Buffer(hex, 'hex');
};

exports.livenet = {
  name: 'livenet',
  magic: hex('f9beb4d9'),
  addressVersion: 0x00,
  privKeyVersion: 128,
  P2SHVersion: 5,
  hkeyPublicVersion: 0x0488b21e,
  hkeyPrivateVersion: 0x0488ade4,
  genesisBlock: {
    hash: hex('6FE28C0AB6F1B372C1A6A246AE63F74F931E8365E15A089C68D6190000000000'),
    merkle_root: hex('3BA3EDFD7A7B12B27AC72C3E67768F617FC81BC3888A51323A9FB8AA4B1E5E4A'),
    height: 0,
    nonce: 2083236893,
    version: 1,
    prev_hash: buffertools.fill(new Buffer(32), 0),
    timestamp: 1231006505,
    bits: 486604799,
  },
  dnsSeeds: [
    'seed.bitcoin.sipa.be',
    'dnsseed.bluematt.me',
    'dnsseed.bitcoin.dashjr.org',
    'seed.bitcoinstats.com',
    'seed.bitnodes.io',
    'bitseed.xf2.org'
  ],
  defaultClientPort: 8333
};

exports.mainnet = exports.livenet;

exports.testnet = {
  name: 'testnet',
  magic: hex('0b110907'),
  addressVersion: 0x6f,
  privKeyVersion: 239,
  P2SHVersion: 196,
  hkeyPublicVersion: 0x043587cf,
  hkeyPrivateVersion: 0x04358394,
  genesisBlock: {
    hash: hex('43497FD7F826957108F4A30FD9CEC3AEBA79972084E90EAD01EA330900000000'),
    merkle_root: hex('3BA3EDFD7A7B12B27AC72C3E67768F617FC81BC3888A51323A9FB8AA4B1E5E4A'),
    height: 0,
    nonce: 414098458,
    version: 1,
    prev_hash: buffertools.fill(new Buffer(32), 0),
    timestamp: 1296688602,
    bits: 486604799,
  },
  dnsSeeds: [
    'testnet-seed.bitcoin.petertodd.org',
    'testnet-seed.bluematt.me'
  ],
  defaultClientPort: 18333
};


//Litecoin
exports.ltc = {
    name:'Litecoin',
    livenet : {
      name: 'livenet',
      magic: hex('FBC0B6DB'),
      addressVersion: 0x30,
      privKeyVersion: 128,
      P2SHVersion: 5,
      hkeyPublicVersion: 0x0488b21e,
      hkeyPrivateVersion: 0x0488ade4,
      genesisBlock: {
        hash: hex('e2bf047e7e5a191aa4ef34d314979dc9986e0f19251edaba5940fd1fe365a712'),
        merkle_root: hex('97ddfbbae6be97fd6cdf3e7ca13232a3afff2353e29badfab7f73011edd4ced9'),
        height: 0,
        nonce: 99943,
        version: 1,
        prev_hash: buffertools.fill(new Buffer(32), 0),
        timestamp: 1231006505,
        bits: 486604799,
      },
      dnsSeeds: [
        'dnsseed.litecointools.com',
        'dnsseed.litecoinpool.org',
        'dnsseed.ltc.xurious.com',
        'dnsseed.koin-project.com',
        'dnsseed.weminemnc.com'
      ],
      defaultClientPort: 9333
    },
    testnet : {
      name: 'testnet',
      magic: hex('FCC1B7DC'),
      addressVersion: 0x6f,
      privKeyVersion: 239,
      P2SHVersion: 196,
      hkeyPublicVersion: 0x043587cf,
      hkeyPrivateVersion: 0x04358394,
      genesisBlock: {
        hash: hex('8ff688015e9008184e384ff2ffdff3dd9cd6ce6a718283c8acbe746ce271aef5'),
        merkle_root: hex('97ddfbbae6be97fd6cdf3e7ca13232a3afff2353e29badfab7f73011edd4ced9'),
        height: 0,
        nonce: 385270584,
        version: 1,
        prev_hash: buffertools.fill(new Buffer(32), 0),
        timestamp: 1317798646,
        bits: 4799332336,
      },
      dnsSeeds: [
        'testnet-seed.litecointools.com',
        'testnet-seed.ltc.xurious.com',
        'dnsseed.wemine-testnet.com'
      ],
      defaultClientPort: 19333
    }
}