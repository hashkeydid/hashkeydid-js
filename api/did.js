import * as DID from "../contract/did/DIDContract.js";

// Claim mints did
export async function Claim(didName) {
    let tx = await DID.DIDSigner.claim(didName);
    return tx;
}

// Mint mints did with address
export async function Mint(address, didName) {
    let tx = await DID.DIDSigner.mint(address, didName);
    return tx;
}

// AddAuth adds address to tokenId authorized address list
export async function AddAuth(tokenId, address) {
    let tx = await DID.DIDSigner.addAuth(tokenId, address);
    return tx;
}

// RemoveAuth removes address from tokenId authorized address list
export async function RemoveAuth(tokenId, address) {
    let tx = await DID.DIDSigner.removeAuth(tokenId, address);
    return tx;
}

// AddKYC adds KYC information for did
export async function AddKYC(tokenId, KYCProvider, KYCId, status, updateTime, expireTime, evidence) {
    let tx = await DID.DIDSigner.addKYC(tokenId, KYCProvider, KYCId, status, updateTime, expireTime, evidence);
    return tx;
}

// SetTokenSupply sets DeedGrain(erc1155) supply number of each tokenId
export async function SetTokenSupply(DGAddr, tokenId, supply) {
    let tx = await DID.DIDSigner.setTokenSupply(DGAddr, tokenId, supply);
    return tx;
}

// MintDG mints DeedGrain contract(erc1155) NFT for addresses
export async function MintDG(DGAddr, tokenId, addrs) {
    let tx = await DID.DIDSigner.mintDG(DGAddr, tokenId, addrs);
    return tx;
}

// ClaimDG mints DeedGrain contract(erc1155) NFT
export async function ClaimDG(DGAddr, tokenId, evidence) {
    let tx = await DID.DIDSigner.claimDG(DGAddr, tokenId, evidence);
    return tx;
}

// IssueDG issues DeedGrain contract(erc1155)
export async function IssueDG(_name, _symbol, _baseUri, _evidence, _transferable) {
    let tx = await DID.DIDSigner.issueDG(_name, _symbol, _baseUri, _evidence, _transferable);
    return tx;
}

// VerifyDIDFormat returns checking result about DID format
export async function VerifyDIDFormat(didName) {
    let flag = await DID.DIDContract.verifyDIDFormat(didName);
    return flag;
}

// GetAuthorizedAddrs returns DID authorized addresses
export async function GetAuthorizedAddrs(tokenId, overrides) {
    let addresses = await DID.DIDContract.getAuthorizedAddrs(tokenId, overrides==undefined?{}:overrides);
    return addresses;
}

// IsAddrAuthorized returns checking result about DID authorized addresses
export async function IsAddrAuthorized(tokenId, address, overrides) {
    let flag = await DID.DIDContract.isAddrAuthorized(tokenId, address, overrides==undefined?{}:overrides);
    return flag;
}

// GetKYCInfo returns DID KYC information
export async function GetKYCInfo(tokenId, KYCProvider, KYCId, overrides) {
    let results = await DID.DIDContract.getKYCInfo(tokenId, KYCProvider, KYCId, overrides==undefined?{}:overrides);
    return results;
}

// DidClaimed returns checking result about DID registered information
export async function DidClaimed(didName, overrides) {
    let result = await DID.DIDContract.didClaimed(didName, overrides==undefined?{}:overrides);
    return result;
}

// AddrClaimed returns checking result about address registered information
export async function AddrClaimed(address, overrides) {
    let result = await DID.DIDContract.addrClaimed(address, overrides==undefined?{}:overrides);
    return result;
}

// TokenId2Did returns DID by tokenId
export async function TokenId2Did(tokenId, overrides) {
    let didName = await DID.DIDContract.tokenId2Did(tokenId, overrides==undefined?{}:overrides);
    return didName;
}

// Did2TokenId returns tokenId by DID 
export async function Did2TokenId(didName, overrides) {
    let tokenId = await DID.DIDContract.did2TokenId(didName, overrides==undefined?{}:overrides);
    return tokenId;
}

// DeedGrainAddrToIssur returns issuer address by address
export async function DeedGrainAddrToIssur(address, overrides) {
    let issuer = await DID.DIDContract.deedGrainAddrToIssur(address, overrides==undefined?{}:overrides);
    return issuer;
}
