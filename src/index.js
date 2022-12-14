import {GetDIDSigner} from "./did.js"
import {VerifyDIDFormat} from "./did.js"
import {GetAuthorizedAddrs} from "./did.js"
import {IsAddrAuthorized} from "./did.js"
import {GetKYCInfo} from "./did.js"
import {DidClaimed} from "./did.js"
import {AddrClaimed} from "./did.js"
import {TokenId2Did} from "./did.js"
import {Did2TokenId} from "./did.js"
import {DeedGrainAddrToIssur} from "./did.js"
import {GetAddrByDIDName} from "./did.js"

import {GetMetadataImageByDIDName} from "./avatar.js"
import {GetMetadataImageByTokenId} from "./avatar.js"
import {GetAvatarByDIDName} from "./avatar.js"
import {GetAvatarByTokenId} from "./avatar.js"
import {AvatarFormatText2AvatarUrl} from "./avatar.js"
import {getImageFromTokenURI} from "./avatar.js"
import {GetMetadata} from "./avatar.js"
import {GetMetadataImage} from "./avatar.js"
import {GetMetadataName} from "./avatar.js"
import {GetMetadataDescription} from "./avatar.js"

import {GetResolverSigner} from "./resolver.js"
import {GetDIDNameByAddr} from "./resolver.js"
import {GetDIDNameByAddrForce} from "./resolver.js"
import {GetBlockChainAddress} from "./resolver.js"
import {GetContentHash} from "./resolver.js"
import {GetPublicKey} from "./resolver.js"
import {Text} from "./resolver.js"

export {
    GetDIDSigner,
    VerifyDIDFormat,
    GetAuthorizedAddrs,
    IsAddrAuthorized,
    GetKYCInfo,
    DidClaimed,
    AddrClaimed,
    TokenId2Did,
    Did2TokenId,
    DeedGrainAddrToIssur,
    GetAddrByDIDName,

    GetMetadataImageByDIDName,
    GetMetadataImageByTokenId,
    GetAvatarByDIDName,
    GetAvatarByTokenId,
    AvatarFormatText2AvatarUrl,
    getImageFromTokenURI,
    GetMetadata,
    GetMetadataImage,
    GetMetadataName,
    GetMetadataDescription,

    GetResolverSigner,
    GetDIDNameByAddr,
    GetDIDNameByAddrForce,
    GetBlockChainAddress,
    GetContentHash,
    GetPublicKey,
    Text
}
