# HashKey DID JS SDK
[![Tag](https://img.shields.io/badge/tags-v0.0.1-blue)](https://github.com/hashkeydid/hashkeydid-js/tags)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

Javascript module to work with HashKey DID Protocol.

## Installation

`npm install hashkeydid-js`

## Usage
`hashkeydid-js` provides simple access to the [HashKey DID](https://hashkey.id) Contracts.

## DID
`DIDSigner` and `DIDResolverSigner` are the core objects to send transactions with [HashKey DID](https://hashkey.id) Contracts.
```js
didSigner = new DIDSigner("private_key")
resolverSigner = new ResolverSigner("private_key")
```

## Example1-Register
Registering HashKey DID account with JS SDK
```js
didSigner.Claim("xxx.key")
```

## Example2-GetName
Querying user address with did name
```js
import {GetAddrByDIDName} from "hashkeydid-js"
// DID name: herro.key
// overrides(optional): {"blockTag": 16513266} (search at block number 16513266)
async function QueryAddrByDIDName(){
    let addr = await GetAddrByDIDName("herro.key", {"blockTag": 16513266})
}
```
