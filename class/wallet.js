'use strict';
/**
 * public key (e,n)
 * private key (d,n)
 * n = RSA-Modul
 * e = encryptionexponent
 * d = decryptionexponent
 * p,q = different prime numbers
 * n = p*q
 */
class Wallet {
    constructor() {
        this.NodeRSA = require('node-rsa');
        this.key = new this.NodeRSA({b: 512});
        var CryptoJS = require("crypto-js");
        this.sign = function (data) {
            return this.key.sign(data);
        }
        this.encrypt = function (data) {
            return this.key.encrypt(data);
        }
        this.getAddress = function () {
            return CryptoJS.MD5(this.key.exportKey("pkcs8-public-pem")).toString();
        };
        this.getKey = function () {
            return this.key.exportKey("pkcs8-public-pem");
        };

    }

}
module.exports = Wallet;