import * as DIDResolver from "./contracts/resolver/resolverContract.js";
import * as DID from "./contracts/did/DIDContract.js";
import { ethers } from "ethers";

// signer for transaction
export class GetResolverSigner {
    constructor(privateKey){
        let wallet = new ethers.Wallet(privateKey, DID.provider);
        this.DIDResolverSigner = DIDResolver.DIDResolverContract.connect(wallet);
    }

    /**
     * SetReverse sets the reverse status for address
     *
     * @param {address} string 20-hex address
     * @param {status} bool 
     * @return {tx} transaction details
    */
    async SetReverse(address, status) {
        let isClaimed = await DID.DIDContract.addrClaimed(address);
        if (!isClaimed) {
            return Error.ErrAddrNotClaimed;
        }
        let tx = await this.DIDResolverSigner.setReverse(address, status);
        return tx;
    }
    
    /**
     * SetBlockChainAddress sets blockchain addresses
     *
     * @param {tokenId} number 
     * @param {coinType} number 
     * @param {address} byte[]
     * @return {tx} transaction details
    */
    async SetBlockChainAddress(tokenId, coinType, address) {
        let tx = await this.DIDResolverSigner.setAddr(tokenId, coinType, address);
        return tx;
    }

    /**
     * SetContentHash sets tokenId's cid
     *
     * @param {tokenId} number 
     * @param {url} string 
     * @return {tx} transaction details
    */
    async SetContentHash(tokenId, url) {
        let tx = await this.DIDResolverSigner.setContentHash(tokenId, url);
        return tx;
    }

    /**
     * SetPubkey sets tokenId's public key
     *
     * @param {tokenId} number 
     * @param {x} string 
     * @param {y} string 
     * @return {tx} transaction details
    */
    async SetPubkey(tokenId, x, y) {
        let tx = await this.DIDResolverSigner.setPubkey(tokenId, x, y);
        return tx;
    }

    /**
     * SetText sets key/value pairs
     * 
     * @param {tokenId} number 
     * @param {key} string eg: name
     * @param {value} string eg: herro
     * @return {tx} transaction details
    */
    async SetText(tokenId, key, value) {
        let tx = await this.DIDResolverSigner.setText(tokenId, key, value);
        return tx;
    }
}

/**
 * GetDIDNameByAddr returns the did name by address when user set reverse true
 *
 * @param {address} string 20-hex address
 * @param {overrides} object Note block number, eg: {"blockTag": 36513266}
 * @return {did} return did name
 */
export async function GetDIDNameByAddr(address, overrides) {
    let isClaimed = await DID.DIDContract.addrClaimed(address, overrides==undefined?{}:overrides);
    if (!isClaimed) {
        return Error.ErrAddrNotClaimed;
    }
    let did = await DIDResolver.DIDResolverContract.name(address, overrides==undefined?{}:overrides);
    return did;
}

/**
 * GetDIDNameByAddrForce returns the did name by address even if reverse is false
 *
 * @param {address} string 20-hex address
 * @param {overrides} object Note block number, eg: {"blockTag": 36513266}
 * @return {did} return did name
 */
export async function GetDIDNameByAddrForce(address, overrides) {
    let isClaimed = await DID.DIDContract.addrClaimed(address, overrides==undefined?{}:overrides);
    if (!isClaimed) {
        return Error.ErrAddrNotClaimed;
    }
    let tokenId = await DID.DIDContract.tokenOfOwnerByIndex(address, 0, overrides==undefined?{}:overrides);
    let did = await DID.DIDContract.tokenId2Did(tokenId, overrides==undefined?{}:overrides);
    return did;
}

/**
 * GetBlockChainAddress returns blockchain address according by coinType
 *
 * @param {tokenId} number 
 * @param {coinType} number eg: 1:ethereum
 * @return {address} return blockchain address
 */
export async function GetBlockChainAddress(tokenId, coinType) {
    let address = await DIDResolver.DIDResolverContract.addr(tokenId, coinType);
    return address;
}

/**
 * GetContentHash returns tokenId's cid
 *
 * @param {tokenId} number 
 * @return {url} content url link
 */
export async function GetContentHash(tokenId) {
    let url = await DIDResolver.DIDResolverContract.contentHash(tokenId);
    return url;
}

/**
 * GetPublicKey returns tokenId's public key
 *
 * @param {tokenId} number 
 * @return {publicKey} public key
 */
export async function GetPublicKey(tokenId) {
    let publicKey = await DIDResolver.DIDResolverContract.pubkey(tokenId);
    return publicKey;
}

/**
 * Text returns value according by key
 *
 * @param {tokenId} number 
 * @param {key} string 
 * @return {value} string
 */
export async function Text(tokenId, key) {
    let value = await DIDResolver.DIDResolverContract.text(tokenId, key);
    return value;
}
