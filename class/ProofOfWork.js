'use strict';
const DEBUG = true;
class ProofOfWork {
    constructor() {
        var scrypt = require("js-scrypt");
        this.hash = (hash) => {
            var i = 0;
            var toHash = "";
            var hashed = scrypt.hashSync(hash, "").toString();
            if (DEBUG) console.log("mining", i, toHash, hashed);
            while (isNaN(parseFloat(hashed[0])) || !isFinite(hashed[0])) {
                i++;
                var toHash = hash + i;
                hashed = scrypt.hashSync(toHash, "").toString();
                if (DEBUG) console.log("mining", i, toHash, hashed);
            }
            return i;
        };
        this.verify = (hash, proof) => {
            if (DEBUG) console.log("verify", hash + proof, scrypt.hashSync(hash + proof, "").toString());
            var hashed = scrypt.hashSync(hash + proof, "").toString();
            return !isNaN(parseFloat(hashed[0])) && isFinite(hashed[0]);
        };
    }

}
module.exports = ProofOfWork;
