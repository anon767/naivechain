'use strict';

class Block {
    constructor(index, previousHash, timestamp, data, hash, signature, publicKey, address, proof) {
        this.index = index;
        this.previousHash = previousHash.toString();
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash.toString();
        this.signature = signature;
        this.publickey = publicKey;
        this.address = address;
        this.proof = proof;
    }

}
module.exports = Block;
