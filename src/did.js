import * as DID from "./contracts/did/DIDContract.js";
import { ethers } from "ethers";

export class DIDSigner {
    constructor(privateKey){
        let wallet = new ethers.Wallet(privateKey, DID.provider);
        this.DIDSigner = DID.DIDContract.connect(wallet);
    }

    /**
     * Claim mints did
     *
     * @param {string} didName eg: xxxxx.key
     * @return {promise<Object>} transaction details
     */
    async Claim(didName) {
        let tx = await this.DIDSigner.claim(didName);
        return tx;
    }

    /**
     * Mint mints did with address
     *
     * @param {string} address eg: 20-hex address
     * @param {string} didName eg: xxxxx.key
     * @return {promise<Object>} transaction details
     */
    async Mint(address, didName) {
        let tx = await this.DIDSigner.mint(address, didName);
        return tx;
    }

    /**
     * AddAuth adds address to tokenId authorized address list
     *
     * @param {number} tokenId eg: 12
     * @param {string} address eg: 20-hex address
     * @return {promise<Object>} transaction details
     */
    async AddAuth(tokenId, address) {
        let tx = await this.DIDSigner.addAuth(tokenId, address);
        return tx;
    }

    /**
     * RemoveAuth removes address from tokenId authorized address list
     *
     * @param {number} tokenId eg: 12
     * @param {string} address eg: 20-hex address
     * @return {promise<Object>} transaction details
     */
    async RemoveAuth(tokenId, address) {
        let tx = await this.DIDSigner.removeAuth(tokenId, address);
        return tx;
    }

    /**
     * AddKYC adds KYC information for did
     *
     * @param {number} tokenId eg: 12
     * @param {string} KYCProvider eg: 20-hex address
     * @param {number} KYCId eg: 1
     * @param {boolean} status eg: true/false
     * @param {number} updateTime eg: 16342343423
     * @param {number} expireTime eg: 16342343423
     * @param {string} evidence eg: 32-hex string
     * @return {promise<Object>} transaction details
     */
    async AddKYC(tokenId, KYCProvider, KYCId, status, updateTime, expireTime, evidence) {
        let tx = await this.DIDSigner.addKYC(tokenId, KYCProvider, KYCId, status, updateTime, expireTime, evidence);
        return tx;
    }

    /**
     * SetTokenSupply sets DeedGrain(erc1155) supply number of each tokenId
     *
     * @param {string} DGAddr eg: 20-hex address
     * @param {number} tokenId eg: 1
     * @param {number} supply eg: 16342343423
     * @return {promise<Object>} transaction details
     */
    async SetTokenSupply(DGAddr, tokenId, supply) {
        let tx = await this.DIDSigner.setTokenSupply(DGAddr, tokenId, supply);
        return tx;
    }

    /**
     * MintDG1 mints DeedGrain contract(erc1155) NFT for addresses
     *
     * @param {string} DGAddr eg: 20-hex address
     * @param {number} tokenId eg: 1
     * @param {string[]} addrs eg: [20-hex address...]
     * @return {promise<Object>} transaction details
     */
    async MintDGV1(DGAddr, tokenId, addrs) {
        return this.DIDSigner.mintDGV1(DGAddr, tokenId, addrs);
    }

    /**
     * MintDG2 mints DeedGrain contract(erc1155) NFT for addresses
     *
     * @param {string} DGAddr eg: 20-hex address
     * @param {number} tokenId eg: 1
     * @param {string[]} addrs eg: [20-hex address...]
     * @param {string} data eg: ""
     * @return {promise<Object>} transaction details
     */
    async MintDGV2(DGAddr, tokenId, addrs, data) {
        return this.DIDSigner.mintDGV2(DGAddr, tokenId, addrs, data);
    }

    /**
     * ClaimDG mints DeedGrain contract(erc1155) NFT
     *
     * @param {string} DGAddr eg: 20-hex address
     * @param {number} tokenId eg: 1
     * @param {string} evidence eg: 32-hex string
     * @return {promise<Object>} transaction details
     */
    async ClaimDG(DGAddr, tokenId, evidence) {
        let tx = await this.DIDSigner.claimDG(DGAddr, tokenId, evidence);
        return tx;
    }

    /**
     * IssueDG issues DeedGrain contract(erc1155)
     *
     * @param {string} _name
     * @param {string} _symbol
     * @param {string} _baseUri
     * @param {string} _evidence eg: 32-hex string
     * @param {boolean} _transferable eg: true/false
     * @return {promise<Object>} transaction details
     */
    async IssueDG(_name, _symbol, _baseUri, _evidence, _transferable) {
        let tx = await this.DIDSigner.issueDG(_name, _symbol, _baseUri, _evidence, _transferable);
        return tx;
    }

    /**
     * SetNFTSupply Only issuer can set NFT supply
     *
     * @param {string} NFTAddr
     * @param {number} supply
     * @return {promise<Object>} transaction details
     */
    async SetNFTSupply(NFTAddr, supply) {
        return this.DIDSigner.setNFTSupply(NFTAddr, supply);
    }

    /**
     * SetNFTBaseUri Only issuer can set NFT's baseuri
     *
     * @param {string} NFTAddr DG NFT contract address
     * @param {string} baseUri All of the NFT's baseuri
     * @return {promise<Object>} transaction details
     */
    async SetNFTBaseUri(NFTAddr, baseUri) {
        return this.DIDSigner.setNFTBaseUri(NFTAddr, baseUri);
    }

    /**
     * MintDGNFT Only issuer can airdrop the nft
     *
     * @param {string} NFTAddr DG NFT contract address
     * @param {number} sid SeriesId
     * @param {string[]} addrs All the users address to airdrop
     * @return {promise<Object>} transaction details
     */
    async MintDGNFT(NFTAddr, sid, addrs) {
        return this.DIDSigner.mintDGNFT(NFTAddr, sid, addrs);
    }

    /**
     * ClaimDGNFT User claim the nft
     *
     * @param {string} NFTAddr DG NFT address
     * @param {number} sid SeriesId
     * @param {string} evidence Signature
     * @return {promise<Object>} transaction details
     */
    async ClaimDGNFT(NFTAddr, sid, evidence) {
        return this.DIDSigner.claimDGNFT(NFTAddr, sid, evidence);
    }
}

/**
 * GetAddrByDIDName returns DID address
 *
 * @param {string} didName
 * @param {Object} [overrides]
 * @return {promise<string>} address
 */
 export async function GetAddrByDIDName(didName, overrides) {
    let tokenId = await Did2TokenId(didName);
    let addr = await DID.DIDContract.ownerOf(tokenId.toNumber(), overrides==undefined?{}:overrides)
    return addr;
}

/**
 * VerifyDIDFormat returns checking result about DID format
 *
 * @param {string} didName
 * @return {promise<boolean>} true/false
 */
export async function VerifyDIDFormat(didName) {
    let flag = await DID.DIDContract.verifyDIDFormat(didName);
    return flag;
}

/**
 * GetAuthorizedAddrs returns DID authorized addresses
 *
 * @param {number} tokenId eg: 12
 * @param {object} [overrides] Note block number, eg: {"blockTag": 36513266}
 * @return {promise<string[]>} return addresses
 */
 export async function GetAuthorizedAddrs(tokenId, overrides) {
    let addresses = await DID.DIDContract.getAuthorizedAddrs(tokenId, overrides==undefined?{}:overrides);
    return addresses;
}

/**
 * IsAddrAuthorized returns checking result about DID authorized addresses
 *
 * @param {number} tokenId eg: 12
 * @param {string} address eg: 20-hex address
 * @param {object} [overrides] Note block number, eg: {"blockTag": 36513266}
 * @return {promise<boolean>} return true/false
 */
 export async function IsAddrAuthorized(tokenId, address, overrides) {
    let flag = await DID.DIDContract.isAddrAuthorized(tokenId, address, overrides==undefined?{}:overrides);
    return flag;
}

/**
 * GetKYCInfo returns DID KYC information
 *
 * @param {number} tokenId eg: 12
 * @param {string} KYCProvider eg: 20-hex address
 * @param {number} KYCId eg: 1
 * @param {object} [overrides] Note block number, eg: {"blockTag": 36513266}
 * @return {promise<Object>} transaction details
 */
 export async function GetKYCInfo(tokenId, KYCProvider, KYCId, overrides) {
    let results = await DID.DIDContract.getKYCInfo(tokenId, KYCProvider, KYCId, overrides==undefined?{}:overrides);
    return results;
}

/**
 * DidClaimed returns checking result about DID registered information
 *
 * @param {string} didName eg: kee.key
 * @param {object} [overrides] Note block number, eg: {"blockTag": 36513266}
 * @return {promise<boolean>} true/false
 */
 export async function DidClaimed(didName, overrides) {
    let result = await DID.DIDContract.didClaimed(didName, overrides==undefined?{}:overrides);
    return result;
}

/**
 * AddrClaimed returns checking result about address registered information
 *
 * @param {string} address eg: 20-hex address
 * @param {object} [overrides] Note block number, eg: {"blockTag": 36513266}
 * @return {promise<boolean>} true/false
 */
 export async function AddrClaimed(address, overrides) {
    let result = await DID.DIDContract.addrClaimed(address, overrides==undefined?{}:overrides);
    return result;
}

/**
 * TokenId2Did returns DID by tokenId
 *
 * @param {number} tokenId eg: 12
 * @param {object} [overrides] Note block number, eg: {"blockTag": 36513266}
 * @return {promise<string>} did name
 */
 export async function TokenId2Did(tokenId, overrides) {
    let didName = await DID.DIDContract.tokenId2Did(tokenId, overrides==undefined?{}:overrides);
    return didName;
}

/**
 * Did2TokenId returns tokenId by DID
 *
 * @param {string} didName eg: hee.key
 * @param {object} [overrides] Note block number, eg: {"blockTag": 36513266}
 * @return {promise<string>} tokenId
 */
 export async function Did2TokenId(didName, overrides) {
    let tokenId = await DID.DIDContract.did2TokenId(didName, overrides==undefined?{}:overrides);
    return tokenId;
}

/**
 * DeedGrainAddrToIssur returns issuer address by address
 *
 * @param {string} address eg: 20-hex address
 * @param {object} [overrides] Note block number, eg: {"blockTag": 36513266}
 * @return {promise<Object>}
 */
 export async function DeedGrainAddrToIssur(address, overrides) {
    let issuer = await DID.DIDContract.deedGrainAddrToIssur(address, overrides==undefined?{}:overrides);
    return issuer;
}
