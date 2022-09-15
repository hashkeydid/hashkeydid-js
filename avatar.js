import * as DID from "./contract/did/DIDContract.js";
import * as DIDResolver from "./contract/resolver/resolverContract.js";
import { ERC721Rpc } from "./contract/erc721/erc721Contract.js";
import { ERC1155Rpc } from "./contract/erc1155/erc1155Contract.js";
import { Error } from "./errors.js";
import * as metadata from "./metadata.js";
import * as setting from "./config.js";

// GetMetadataAvatarByDIDName returns the image url in metadata queried by did name
export async function GetMetadataAvatarByDIDName(didName) {
    let res = await DID.DIDContract.didClaimed(didName);
    if (!res) {
        return Error.ErrDidNotClaimed;
    }
    let tokenId = await DID.DIDContract.did2TokenId(didName);
    let avatarUrl = await metadata.GetMetadataImage(tokenId);
    return avatarUrl;
}

// GetMetadataAvatarByTokenId returns the image url in metadata queried by tokenId
export async function GetMetadataAvatarByTokenId(tokenId) {
    let totalSupply = await DID.DIDContract.totalSupply();
    if (tokenId > totalSupply) {
        return Error.ErrDidNotClaimed;
    }
    let avatarUrl = await metadata.GetMetadataImage(tokenId);
    return avatarUrl;
}

// GetAvatarByDIDName returns the image url in resolver text queried by did name
export async function GetAvatarByDIDName(didName, chainList) {
	let res = await DID.DIDContract.didClaimed(didName);
    if (!res) {
        return Error.ErrDidNotClaimed;
    }
    let tokenId = await DID.DIDContract.did2TokenId(didName);
	let avatarText = await DIDResolver.DIDResolverContract.text(tokenId, "avatar");
	if (avatarText == "") {
		return Error.ErrAvatarNotSet;
	}
    // console.log(avatarText);
	let avatarUrl = await avatarFormatText2AvatarUrl(avatarText, chainList);
    return avatarUrl;
}

// GetAvatarByTokenId returns the image url in resolver text queried by tokenId
export async function GetAvatarByTokenId(tokenId, chainList) {
	let totalSupply = await DID.DIDContract.totalSupply();
    if (tokenId > totalSupply) {
        return Error.ErrDidNotClaimed;
    }
	let avatarText = await DIDResolver.DIDResolverContract.text(tokenId, "avatar");
	if (avatarText == "") {
		return Error.ErrAvatarNotSet;
	}
	let avatarUrl = await avatarFormatText2AvatarUrl(avatarText, chainList);
    return avatarUrl;
}

// avatarFormatText2AvatarUrl convert avatar format text in resolver to an image url
export async function avatarFormatText2AvatarUrl(formatText, chainList) {
    let texts = formatText.split(":");
    if (texts.length < 2) {
		return Error.ErrInvalidAvatarText;
	}
	switch(texts[0]) {
	case "nft":
		// nft:chainId:type(721/1155):contractAddr:tokenId
		if (texts.length != 5) {
			return ErrInvalidAvatarText;
		}
		if (chainList == undefined) {
			chainList = setting.ChainList;
		}
        let tokenURI;
		switch (texts[2]) {
		case "721":
			let nft721 = ERC721Rpc(texts[3], chainList[texts[1]].RPC);
			tokenURI = nft721.tokenURI(tokenId);
            break;
		case "1155":
            let nft1155 = ERC1155Rpc(texts[3], chainList[texts[1]].RPC);
			tokenURI = nft1155.uri(tokenId);
            break;
		default:
			return Error.ErrInvalidAvatarText;
		}
		 getImageFromTokenURI(tokenURI)
         .then(image => {
            if (image == "") {
                return Error.ErrInvalidTokenURI;
            }
            return image;
        });
    default:
        return formatText;
    }
}

// getImageFromTokenURI parses tokenURI's info to get the image url
async function getImageFromTokenURI(tokenURI) {
    let response = await fetch(tokenURI);
    let resJson = await response.json();
    return resJson.image;
}
