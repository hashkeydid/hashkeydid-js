import fetch from "node-fetch";
import * as DID from "../contract/did/DIDContract.js";
import * as DIDResolver from "../contract/resolver/resolverContract.js";
import { ERC721Contract } from "../contract/erc721/erc721Contract.js";
import { ERC1155Contract } from "../contract/erc1155/erc1155Contract.js";
import { Error } from "../error/errors.js";
import * as setting from "../config.js";

/**
 * GetMetadataAvatarByDIDName returns the image url in metadata queried by did name
 *
 * @param {didName} string eg: herro.key
 * @param {overrides} object Note block number, eg: {"blockTag": 36513266}
 * @return {avatarUrl} return avatar url
 */
export async function GetMetadataImageByDIDName(didName, overrides) {
    let res = await DID.DIDContract.didClaimed(didName, overrides==undefined?{}:overrides);
    if (!res) {
        return Error.ErrDidNotClaimed;
    }
    let tokenId = await DID.DIDContract.did2TokenId(didName, overrides==undefined?{}:overrides);
    let imageUrl = await GetMetadataImage(tokenId);
    return imageUrl;
}

/**
 * GetMetadataAvatarByTokenId returns the image url in metadata queried by tokenId
 *
 * @param {tokenId} number eg: 1
 * @param {overrides} object Note block number, eg: {"blockTag": 36513266}
 * @return {metadataAvatarUrl} return metadata avatar url
 */
export async function GetMetadataImageByTokenId(tokenId, overrides) {
    let totalSupply = await DID.DIDContract.totalSupply(overrides==undefined?{}:overrides);
    if (tokenId > totalSupply) {
        return Error.ErrTokenIdNotMinted;
    }
    let metadataImageUrl = await GetMetadataImage(tokenId);
    return metadataImageUrl;
}

/**
 * GetAvatarByDIDName returns the image url in resolver text queried by did name
 *
 * @param {didName} string eg: herro.key
 * @param {chainList} object eg: {"1": {"network": "Ethereum", "RPC": "https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7"}}
 * @param {overrides} object Note block number, eg: {"blockTag": 36513266}
 * @return {metadataAvatarUrl} return metadata avatar url
 */
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
	let avatarUrl = await AvatarFormatText2AvatarUrl(avatarText, chainList);
    return avatarUrl;
}

/**
 * GetAvatarByTokenId returns the image url in resolver text queried by tokenId
 *
 * @param {tokenId} number eg: 1
 * @param {chainList} object eg: {"1": {"network": "Ethereum", "RPC": "https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7"}}
 * @param {overrides} object Note block number, eg: {"blockTag": 36513266}
 * @return {avatarUrl} return avatar url
 */
export async function GetAvatarByTokenId(tokenId, chainList, overrides) {
	let totalSupply = await DID.DIDContract.totalSupply(overrides==undefined?{}:overrides);
    if (tokenId > totalSupply) {
        return Error.ErrTokenIdNotMinted;
    }
	let avatarText = await DIDResolver.DIDResolverContract.text(tokenId, "avatar", overrides==undefined?{}:overrides);
	if (avatarText == "") {
		return Error.ErrAvatarNotSet;
	}
	let avatarUrl = await AvatarFormatText2AvatarUrl(avatarText, chainList);
    return avatarUrl;
}

/**
 * AvatarFormatText2AvatarUrl convert avatar format text in resolver to an image url
 *
 * @param {formatText} string eg: nft:1:721:0x394E3d3044fC89fCDd966D3cb35Ac0B32B0Cda91:8619
 * @param {chainList} object eg: {"1": {"network": "Ethereum", "RPC": "https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7"}}
 * @return {image} return image url
 */
export async function AvatarFormatText2AvatarUrl(formatText, chainList) {
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

/**
 * getImageFromTokenURI parses tokenURI's info to get the image url
 *
 * @param {tokenURI} number eg: 1
 * @return {image} return image url
 */
 export async function getImageFromTokenURI(tokenURI) {
    try{
        let response = await fetch(tokenURI);
        let resJson = await response.json();
        return resJson.image;
    } catch (e) {
        return Error.ErrInvalidTokenURI;
    }
}

/**
 * GetMetadata returns the Metadata by tokenId
 *
 * @param {tokenURI} number eg: 1
 * @return {resJson} response json format
 */
export async function GetMetadata(tokenId) {
    let MetadataUrl = `https://api.hashkey.id/did/api/nft/metadata/${tokenId}`;
    let response = await fetch(MetadataUrl);
    let resJson = await response.json();
    return resJson;
}

/**
 * GetMetadataImage returns the image url in metadata by tokenId
 *
 * @param {tokenURI} number eg: 1
 * @return {image} return metadata image url
 */
export async function GetMetadataImage(tokenId) {
	let metadata = await GetMetadata(tokenId);
	if (metadata.image == undefined) {
		return "";
	}
	return metadata.image;
}

/**
 * GetMetadataName returns the name in metadata by tokenId
 *
 * @param {tokenId} number eg: 1
 * @return {name} return metadata name
 */
export async function GetMetadataName(tokenId) {
	let metadata = await GetMetadata(tokenId);
	if (metadata.name == undefined) {
		return "";
	}
	return metadata.name;
}

/**
 * GetMetadataDescription returns the description in metadata by tokenId
 *
 * @param {tokenId} number eg: 1
 * @return {description} return metadata description
 */
export async function GetMetadataDescription(tokenId) {
	let metadata = await GetMetadata(tokenId);
	if (metadata.description == undefined) {
		return "";
	}
	return metadata.description;
}
