import * as DID from "./contract/did/DIDContract.js";
import * as DIDResolver from "./contract/resolver/resolverContract.js";

// GetDIDNameByAddr returns the did name by address when user set reverse
export async function GetDIDNameByAddr(address) {
    let did = await DIDResolver.DIDResolverContract.name(address);
    return did;
}

// GetDIDNameByAddrForce returns the did name by address
export async function GetDIDNameByAddrForce(address) {
    let tokenId = await DID.DIDContract.tokenOfOwnerByIndex(address,0);
    let did = await DID.DIDContract.tokenId2Did(tokenId);
    return did;
}

// SetReverse sets the reverse status for address
export async function SetReverse(address, status) {
    await DIDResolver.DidResolverSigner.setReverse(address, status);
}
