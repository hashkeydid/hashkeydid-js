import * as DIDResolver from "../contract/resolver/resolverContract.js";
import * as name from "./name.js";

// SetReverse sets the reverse status for address
export async function SetReverse(address, status) {
    let tx = await name.SetReverse(address, status);
    return tx;
}

// GetDIDNameByAddr returns the did name by address when user set reverse true
export async function GetDIDNameByAddr(address, overrides) {
    let did = await name.GetDIDNameByAddr(address, overrides);
    return did;
}

// SetBlockChainAddress sets blockchain addresses
export async function SetBlockChainAddress(tokenId, coinType, address) {
    let tx = await DIDResolver.DIDResolverSigner.setAddr(tokenId, coinType, address);
    return tx;
}

// GetBlockChainAddress returns blockchain address according by coinType
export async function GetBlockChainAddress(tokenId, coinType) {
    let address = await DIDResolver.DIDResolverContract.addr(tokenId, coinType);
    return address;
}

// SetContentHash sets tokenId's cid
export async function SetContentHash(tokenId, url) {
    let tx = await DIDResolver.DIDResolverSigner.setContentHash(tokenId, url);
    return tx;
}

// GetContentHash returns tokenId's cid
export async function GetContentHash(tokenId) {
    let url = await DIDResolver.DIDResolverContract.contentHash(tokenId);
    return url;
}

// SetPubkey sets tokenId's public key
export async function SetPubkey(tokenId, x, y) {
    let tx = await DIDResolver.DIDResolverSigner.setPubkey(tokenId, x, y);
    return tx;
}

// GetPublicKey returns tokenId's public key
export async function GetPublicKey(tokenId) {
    let publicKey = await DIDResolver.DIDResolverContract.pubkey(tokenId);
    return publicKey;
}

// SetText sets key/value pairs
export async function SetText(tokenId, key, value) {
    let tx = await DIDResolver.DIDResolverSigner.setText(tokenId, key, value);
    return tx;
}

// Text returns value according by key
export async function Text(tokenId, key) {
    let value = await DIDResolver.DIDResolverContract.text(tokenId, key);
    return value;
}
