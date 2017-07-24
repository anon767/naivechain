# Naivechain Extended

This is a Fork from https://github.com/lhartikk/naivechain

There are few things which I needed to add to lhartikk's simple but genius
blockchain implementation for my university research.

## Added Features

1) ProofOfWork based on the Hash algorithm Scrypt
2) Wallet holding a RSA private key used to sign blocks
3) unique address to identify peer
4) peer exchange functionality

In case someone is interested in this project, I'll add some basic information about
how my features are working and why.
 
## Proof of Work
Because the principle of Blockchains is to keep the longest chain, it is possible in theory
for one person to generate a large but finite amount of blocks in a row, which could cause a 
Denial of Service. Imagine Alice mines a legit Block and propagates it through the network, while
Bob just generated hundreds of Blocks in a second without accepting Alice's. 
The consequence is that Bob spammed the Network and caused Alice's Block not to be accepted.

Proof-Of-Work consists of a small mathematical calculation, which delays the mining of a block.
The solution to that given problem should be fairly hard to calculate but easy to proof.

Here before mining a block we use the hash of the preceding block and concatenate it with _i_=0.
Afterwards a hash-algorithm called Scrypt is used to generate a new hash. _i_ will be incremented as long as the resulting 
Scrypt-Hash begins with a leaging Zero _0_.

_i_ is appended to the mined block. The block will be accepted if _lasthash+i_[0] == 0

In my tests mining a block took from 10s to 1 min.

Sources:
1) https://en.bitcoin.it/wiki/Proof_of_work
2) https://en.wikipedia.org/wiki/Proof-of-work_system
3) https://en.bitcoin.it/wiki/Scrypt_proof_of_work

## Wallet

Most commonly Blockchain users need a Wallet that holds their private key to sign and identify themselves and their relative Transactions.
A generated RSA-private-key is used to sign the Block. Every Block keeps the public-key of the peer, so everybody is
cabable to check if the block is correctly signed. The appended Address is the hashed public-key.

Sources:
1) https://en.bitcoin.it/wiki/Address

## Extended P2P Feature

This one, I didnt tested thoroughly. I needed a Feature that let users gather peers from already obtained peers.
So the network is not stagnating.



### Quick start
(set up two connected nodes and mine 1 block)
```
npm install
HTTP_PORT=3001 P2P_PORT=6001 npm start
HTTP_PORT=3002 P2P_PORT=6002 PEERS=ws://localhost:6001 npm start
curl -H "Content-type:application/json" --data '{"data" : "Some data to the first block"}' http://localhost:3001/mineBlock
```

### Quick start with Docker
(set up three connected nodes and mine a block)
###
```sh
docker-compose up
curl -H "Content-type:application/json" --data '{"data" : "Some data to the first block"}' http://localhost:3001/mineBlock
```

### HTTP API
##### Get blockchain
```
curl http://localhost:3001/blocks
```
##### Create block
```
curl -H "Content-type:application/json" --data '{"data" : "Some data to the first block"}' http://localhost:3001/mineBlock
``` 
##### Add peer
```
curl -H "Content-type:application/json" --data '{"peer" : "ws://localhost:6001"}' http://localhost:3001/addPeer
```
#### Query connected peers
```
curl http://localhost:3001/peers
```
