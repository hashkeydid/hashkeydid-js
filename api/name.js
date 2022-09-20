import * as DID from "../contract/did/DIDContract.js";
import * as DIDResolver from "../contract/resolver/resolverContract.js";
import { Error } from "../error/errors.js";

// GetDIDNameByAddr returns the did name by address when user set reverse
export async function GetDIDNameByAddr(address, overrides) {
    let isClaimed = await DID.DIDContract.addrClaimed(address, overrides==undefined?{}:overrides);
    if (!isClaimed) {
        return Error.ErrAddrNotClaimed;
    }
    let did = await DIDResolver.DIDResolverContract.name(address, overrides==undefined?{}:overrides);
    return did;
}

// GetDIDNameByAddrForce returns the did name by address
export async function GetDIDNameByAddrForce(address, overrides) {
    let isClaimed = await DID.DIDContract.addrClaimed(address, overrides==undefined?{}:overrides);
    if (!isClaimed) {
        return Error.ErrAddrNotClaimed;
    }
    let tokenId = await DID.DIDContract.tokenOfOwnerByIndex(address, 0, overrides==undefined?{}:overrides);
    let did = await DID.DIDContract.tokenId2Did(tokenId, overrides==undefined?{}:overrides);
    return did;
}

// SetReverse sets the reverse status for address
export async function SetReverse(address, status) {
    let isClaimed = await DID.DIDContract.addrClaimed(address);
    if (!isClaimed) {
        return Error.ErrAddrNotClaimed;
    }
    let tx = await DIDResolver.DIDResolverSigner.setReverse(address, status);
    return tx;
}
