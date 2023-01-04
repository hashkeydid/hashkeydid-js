import * as DIDResolver from "./contracts/resolver/resolverContract.js";
import * as DID from "./contracts/did/DIDContract.js";
import { ethers } from "ethers";

// signer for transaction
export class ResolverSigner {
    constructor(privateKey){
        let wallet = new ethers.Wallet(privateKey, DID.provider);
        this.DIDResolverSigner = DIDResolver.DIDResolverContract.connect(wallet);
    }

    /**
     * SetReverse sets the reverse status for address
     *
     * @param {boolean} status
     * @return {promise<Object>} transaction details
     */
    async SetReverse(status) {
        let tx = await this.DIDResolverSigner.setReverse(status);
        return tx;
    }

    /**
     * SetBlockChainAddress sets blockchain addresses
     *
     * @param {number} tokenId
     * @param {number} coinType
     * @param {string} address
     * @return {promise<Object>} transaction details
     */
    async SetBlockChainAddress(tokenId, coinType, address) {
        let tx = await this.DIDResolverSigner.setAddr(tokenId, coinType, address);
        return tx;
    }

    /**
     * SetContentHash sets tokenId's cid
     *
     * @param {number} tokenId
     * @param {string} url
     * @return {promise<Object>} transaction details
     */
    async SetContentHash(tokenId, url) {
        let tx = await this.DIDResolverSigner.setContentHash(tokenId, url);
        return tx;
    }

    /**
     * SetPubkey sets tokenId's public key
     *
     * @param {tokenId} tokenId
     * @param {string} x
     * @param {string} y
     * @return {promise<Object>} transaction details
     */
    async SetPubkey(tokenId, x, y) {
        let tx = await this.DIDResolverSigner.setPubkey(tokenId, x, y);
        return tx;
    }

    /**
     * SetText sets key/value pairs
     *
     * @param {number} tokenId
     * @param {string} key eg: name
     * @param {string} value eg: herro
     * @return {promise<Object>} transaction details
     */
    async SetText(tokenId, key, value) {
        let tx = await this.DIDResolverSigner.setText(tokenId, key, value);
        return tx;
    }
}

/**
 * GetDIDNameByAddr returns the did name by address when user set reverse true
 *
 * @param {string} address 20-hex address
 * @param {object} [overrides] Note block number, eg: {"blockTag": 36513266}
 * @return {Error|promise<string>} return did name
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
 * @param {string} address 20-hex address
 * @param {object} [overrides] Note block number, eg: {"blockTag": 36513266}
 * @return {Error|promise<string>} return did name
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
 * GetBlockChainAddress returns blockchain address according to coinType
 *
 * @param {number} tokenId
 * @param {number} coinType eg: 1:ethereum
 * @return {promise<string>} return blockchain address
 */
export async function GetBlockChainAddress(tokenId, coinType) {
    let address = await DIDResolver.DIDResolverContract.addr(tokenId, coinType);
    return address;
}

/**
 * GetContentHash returns tokenId's cid
 *
 * @param {number} tokenId
 * @return {promise<string>} content url link
 */
export async function GetContentHash(tokenId) {
    let url = await DIDResolver.DIDResolverContract.contentHash(tokenId);
    return url;
}

/**
 * GetPublicKey returns tokenId's public key
 *
 * @param {number} tokenId
 * @return {promise<string>} public key
 */
export async function GetPublicKey(tokenId) {
    let publicKey = await DIDResolver.DIDResolverContract.pubkey(tokenId);
    return publicKey;
}

/**
 * Text returns value according to key
 *
 * @param {number} tokenId
 * @param {string} key
 * @return {promise<string>} string
 */
export async function Text(tokenId, key) {
    let value = await DIDResolver.DIDResolverContract.text(tokenId, key);
    return value;
}
