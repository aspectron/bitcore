var bitcore = require('../../bitcore');
var Address = bitcore.Address;
var bitcoreUtil = bitcore.util;
var Script = bitcore.Script;
var network = bitcore.networks['ltc'].livenet;


var script = '2103b623c446548b6ea9c0bd1d14e59ec0082bda042a9e26c1de32cbbf852b55837aac'; // write down your script here
var s = Script.fromHumanReadable(script);

var hash = bitcoreUtil.sha256ripe160(s.getBuffer());
var version = network.addressVersion;
var addr = new Address(version, hash, 'ltc');

var addrStr = addr.as('base58');

// This outputs the "address" of thescript
console.log(addrStr);
