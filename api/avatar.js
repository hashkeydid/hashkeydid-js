import fetch from "node-fetch";
import * as DID from "../contract/did/DIDContract.js";
import * as DIDResolver from "../contract/resolver/resolverContract.js";
import { ERC721Contract } from "../contract/erc721/erc721Contract.js";
import { ERC1155Contract } from "../contract/erc1155/erc1155Contract.js";
import { Error } from "../error/errors.js";
import * as metadata from "./metadata.js";
import * as setting from "../config.js";

// GetMetadataAvatarByDIDName returns the image url in metadata queried by did name
export async function GetMetadataAvatarByDIDName(didName, overrides) {
    let res = await DID.DIDContract.didClaimed(didName, overrides==undefined?{}:overrides);
    if (!res) {
        return Error.ErrDidNotClaimed;
    }
    let tokenId = await DID.DIDContract.did2TokenId(didName, overrides==undefined?{}:overrides);
    let avatarUrl = await metadata.GetMetadataImage(tokenId);
    return avatarUrl;
}

// GetMetadataAvatarByTokenId returns the image url in metadata queried by tokenId
export async function GetMetadataAvatarByTokenId(tokenId, overrides) {
    let totalSupply = await DID.DIDContract.totalSupply(overrides==undefined?{}:overrides);
    if (tokenId > totalSupply) {
        return Error.ErrTokenIdNotMinted;
    }
    let avatarUrl = await metadata.GetMetadataImage(tokenId);
    return avatarUrl;
}

// GetAvatarByDIDName returns the image url in resolver text queried by did name
export async function GetAvatarByDIDName(didName, chainList, overrides) {
	let res = await DID.DIDContract.didClaimed(didName, overrides==undefined?{}:overrides);
    if (!res) {
        return Error.ErrDidNotClaimed;
    }
    let tokenId = await DID.DIDContract.did2TokenId(didName, overrides==undefined?{}:overrides);
	let avatarText = await DIDResolver.DIDResolverContract.text(tokenId, "avatar", overrides==undefined?{}:overrides);
	if (avatarText == "") {
		return Error.ErrAvatarNotSet;
	}
    // console.log(avatarText);
	let avatarUrl = await avatarFormatText2AvatarUrl(avatarText, chainList);
    return avatarUrl;
}

// GetAvatarByTokenId returns the image url in resolver text queried by tokenId
export async function GetAvatarByTokenId(tokenId, chainList, overrides) {
	let totalSupply = await DID.DIDContract.totalSupply(overrides==undefined?{}:overrides);
    if (tokenId > totalSupply) {
        return Error.ErrTokenIdNotMinted;
    }
	let avatarText = await DIDResolver.DIDResolverContract.text(tokenId, "avatar", overrides==undefined?{}:overrides);
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
			return Error.ErrInvalidAvatarText;
		}
		if (chainList == undefined) {
			chainList = setting.ChainList;
		}
        let tokenURI;
		switch (texts[2]) {
		case "721":
			let nft721 = ERC721Contract(chainList[texts[1]].RPC, texts[3]);
			tokenURI = await nft721.tokenURI(texts[4]);
            break;
		case "1155":
            let nft1155 = ERC1155Contract(chainList[texts[1]].RPC, texts[3]);
			tokenURI = await nft1155.uri(texts[4]);
            break;
		default:
			return Error.ErrInvalidAvatarText;
		}
		let image = await getImageFromTokenURI(tokenURI)
        if (image == "") {
            return Error.ErrInvalidTokenURI;
        }
        return image;
    default:
        return formatText;
    }
}

// getImageFromTokenURI parses tokenURI's info to get the image url
async function getImageFromTokenURI(tokenURI) {
    try{
        let response = await fetch(tokenURI);
        let resJson = await response.json();
        return resJson.image;
    } catch (e) {
        return Error.ErrInvalidTokenURI;
    }
}
