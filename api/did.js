import * as DID from "../contract/did/DIDContract.js";
import { ethers } from "ethers";

export class DIDSigner {
    constructor(privateKey){
        let wallet = new ethers.Wallet(privateKey, DID.provider);
        this.DIDSigner = DID.DIDContract.connect(wallet);
    }

    /**
     * Claim mints did
     *
     * @param {didName} string eg: xxxxx.key 
     * @return {tx} transaction details
     */
    async Claim(didName) {
        let tx = await this.DIDSigner.claim(didName);
        return tx;
    }

    /**
     * Mint mints did with address
     *
     * @param {address} string eg: 20-hex address
     * @param {didName} string eg: xxxxx.key 
     * @return {tx} transaction details
     */
    async Mint(address, didName) {
        let tx = await this.DIDSigner.mint(address, didName);
        return tx;
    }

    /**
     * AddAuth adds address to tokenId authorized address list
     *
     * @param {tokenId} number eg: 12
     * @param {address} string eg: 20-hex address
     * @return {tx} transaction details
     */
    async AddAuth(tokenId, address) {
        let tx = await this.DIDSigner.addAuth(tokenId, address);
        return tx;
    }

    /**
     * RemoveAuth removes address from tokenId authorized address list
     *
     * @param {tokenId} number eg: 12
     * @param {address} string eg: 20-hex address
     * @return {tx} transaction details
     */
    async RemoveAuth(tokenId, address) {
        let tx = await this.DIDSigner.removeAuth(tokenId, address);
        return tx;
    }

    /**
     * AddKYC adds KYC information for did
     *
     * @param {tokenId} number eg: 12
     * @param {KYCProvider} string eg: 20-hex address
     * @param {KYCId} number eg: 1
     * @param {status} bool eg: true/false
     * @param {updateTime} number eg: 16342343423
     * @param {expireTime} number eg: 16342343423
     * @param {evidence} string eg: 32-hex string
     * @return {tx} transaction details
     */
    async AddKYC(tokenId, KYCProvider, KYCId, status, updateTime, expireTime, evidence) {
        let tx = await this.DIDSigner.addKYC(tokenId, KYCProvider, KYCId, status, updateTime, expireTime, evidence);
        return tx;
    }

    /**
     * SetTokenSupply sets DeedGrain(erc1155) supply number of each tokenId
     *
     * @param {DGAddr} string eg: 20-hex address
     * @param {tokenId} number eg: 1
     * @param {supply} number eg: 16342343423
     * @return {tx} transaction details
     */
    async SetTokenSupply(DGAddr, tokenId, supply) {
        let tx = await this.DIDSigner.setTokenSupply(DGAddr, tokenId, supply);
        return tx;
    }

    /**
     * MintDG mints DeedGrain contract(erc1155) NFT for addresses
     *
     * @param {DGAddr} string eg: 20-hex address
     * @param {tokenId} number eg: 1
     * @param {addrs} list eg: [20-hex address...]
     * @return {tx} transaction details
     */
    async MintDG(DGAddr, tokenId, addrs) {
        let tx = await this.DIDSigner.mintDG(DGAddr, tokenId, addrs);
        return tx;
    }

    /**
     * ClaimDG mints DeedGrain contract(erc1155) NFT
     *
     * @param {DGAddr} string eg: 20-hex address
     * @param {tokenId} number eg: 1
     * @param {evidence} string eg: 32-hex string
     * @return {tx} transaction details
     */
    async ClaimDG(DGAddr, tokenId, evidence) {
        let tx = await this.DIDSigner.claimDG(DGAddr, tokenId, evidence);
        return tx;
    }

    /**
     * IssueDG issues DeedGrain contract(erc1155)
     *
     * @param {_name} string 
     * @param {_symbol} string 
     * @param {_baseUri} string 
     * @param {_evidence} string eg: 32-hex string
     * @param {_transferable} bool eg: true/false
     * @return {tx} transaction details
     */
    async IssueDG(_name, _symbol, _baseUri, _evidence, _transferable) {
        let tx = await this.DIDSigner.issueDG(_name, _symbol, _baseUri, _evidence, _transferable);
        return tx;
    }
}

/**
 * GetAddrByDIDName returns DID address
 *
 * @param {didName} string 
 * @return {addr} address
 */
 export async function GetAddrByDIDName(didName, overrides) {
    let tokenId = await Did2TokenId(didName);
    let addr = await DID.DIDContract.ownerOf(tokenId.toNumber(), overrides==undefined?{}:overrides)
    return addr;
}

/**
 * VerifyDIDFormat returns checking result about DID format
 *
 * @param {didName} string 
 * @return {flag} true/false
 */
export async function VerifyDIDFormat(didName) {
    let flag = await DID.DIDContract.verifyDIDFormat(didName);
    return flag;
}

/**
 * GetAuthorizedAddrs returns DID authorized addresses
 *
 * @param {tokenId} number eg: 12
 * @param {overrides} object Note block number, eg: {"blockTag": 36513266}
 * @return {addresses} return addresses
 */
 export async function GetAuthorizedAddrs(tokenId, overrides) {
    let addresses = await DID.DIDContract.getAuthorizedAddrs(tokenId, overrides==undefined?{}:overrides);
    return addresses;
}

/**
 * IsAddrAuthorized returns checking result about DID authorized addresses
 *
 * @param {tokenId} number eg: 12
 * @param {address} string eg: 20-hex address
 * @param {overrides} object Note block number, eg: {"blockTag": 36513266}
 * @return {addresses} return addresses
 */
 export async function IsAddrAuthorized(tokenId, address, overrides) {
    let flag = await DID.DIDContract.isAddrAuthorized(tokenId, address, overrides==undefined?{}:overrides);
    return flag;
}

/**
 * GetKYCInfo returns DID KYC information
 *
 * @param {tokenId} number eg: 12
 * @param {KYCProvider} string eg: 20-hex address
 * @param {KYCId} number eg: 1
 * @param {overrides} object Note block number, eg: {"blockTag": 36513266}
 * @return {tx} transaction details
 */
 export async function GetKYCInfo(tokenId, KYCProvider, KYCId, overrides) {
    let results = await DID.DIDContract.getKYCInfo(tokenId, KYCProvider, KYCId, overrides==undefined?{}:overrides);
    return results;
}

/**
 * DidClaimed returns checking result about DID registered information
 *
 * @param {didName} string eg: kee.key
 * @param {overrides} object Note block number, eg: {"blockTag": 36513266}
 * @return {result} true/false
 */
 export async function DidClaimed(didName, overrides) {
    let result = await DID.DIDContract.didClaimed(didName, overrides==undefined?{}:overrides);
    return result;
}

/**
 * AddrClaimed returns checking result about address registered information
 *
 * @param {address} string eg: 20-hex address
 * @param {overrides} object Note block number, eg: {"blockTag": 36513266}
 * @return {result} true/false
 */
 export async function AddrClaimed(address, overrides) {
    let result = await DID.DIDContract.addrClaimed(address, overrides==undefined?{}:overrides);
    return result;
}

/**
 * TokenId2Did returns DID by tokenId
 *
 * @param {tokenId} number eg: 12
 * @param {overrides} object Note block number, eg: {"blockTag": 36513266}
 * @return {didName} did name
 */
 export async function TokenId2Did(tokenId, overrides) {
    let didName = await DID.DIDContract.tokenId2Did(tokenId, overrides==undefined?{}:overrides);
    return didName;
}

/**
 * Did2TokenId returns tokenId by DID 
 *
 * @param {didName} string eg: hee.key
 * @param {overrides} object Note block number, eg: {"blockTag": 36513266}
 * @return {didName} did name
 */
 export async function Did2TokenId(didName, overrides) {
    let tokenId = await DID.DIDContract.did2TokenId(didName, overrides==undefined?{}:overrides);
    return tokenId;
}

/**
 * DeedGrainAddrToIssur returns issuer address by address
 *
 * @param {address} string eg: 20-hex address
 * @param {overrides} object Note block number, eg: {"blockTag": 36513266}
 * @return {issuer} 
 */
 export async function DeedGrainAddrToIssur(address, overrides) {
    let issuer = await DID.DIDContract.deedGrainAddrToIssur(address, overrides==undefined?{}:overrides);
    return issuer;
}
