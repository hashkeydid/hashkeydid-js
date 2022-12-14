import fetch from "node-fetch";
import * as DID from "./contracts/did/DIDContract.js";
import * as DIDResolver from "./contracts/resolver/resolverContract.js";
import { ERC721Contract } from "./contracts/erc721/erc721Contract.js";
import { ERC1155Contract } from "./contracts/erc1155/erc1155Contract.js";
import { Error } from "./error/errors.js";
import * as setting from "./config.js";

/**
 * GetMetadataImageByDIDName returns the image url in metadata queried by did name
 *
 * @param {string} didName eg: herro.key
 * @param {Object} [overrides] Note block number, eg: {"blockTag": 36513266}
 * @return {(Error | promise<string>)} return avatar url or Error
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
 * GetMetadataImageByTokenId returns the image url in metadata queried by tokenId
 *
 * @param {number} tokenId eg: 1
 * @param {object} [overrides] Note block number, eg: {"blockTag": 36513266}
 * @return {(Error | promise<string>)} return metadata avatar url
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
 * @param {string} didName eg: herro.key
 * @param {object} [chainList] eg: {"1": {"network": "Ethereum", "RPC": "https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7"}}
 * @param {object} [overrides] Note block number, eg: {"blockTag": 36513266}
 * @return {(Error|promise<string>)} return metadata avatar url
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
	let avatarUrl = await AvatarFormatText2AvatarUrl(avatarText, chainList);
    return avatarUrl;
}

/**
 * GetAvatarByTokenId returns the image url in resolver text queried by tokenId
 *
 * @param {number} tokenId eg: 1
 * @param {Object} [chainList] eg: {"1": {"network": "Ethereum", "RPC": "https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7"}}
 * @param {Object} [overrides] Note block number, eg: {"blockTag": 36513266}
 * @return {(Error|promise<string>)} return avatar url
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
 * @param {string} formatText eg: nft:1:721:0x394E3d3044fC89fCDd966D3cb35Ac0B32B0Cda91:8619
 * @param {Object} [chainList] eg: {"1": {"network": "Ethereum", "RPC": "https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7"}}
 * @return {(Error|promise<string>)} return image url
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
		let image = await GetImageFromTokenURI(tokenURI)
        if (image == "") {
            return Error.ErrInvalidTokenURI;
        }
        return image;
    default:
        return formatText;
    }
}

/**
 * GetImageFromTokenURI parses tokenURI's info to get the image url
 *
 * @param {number} tokenURI eg: 1
 * @return {(Error|promise<string>)} return image url
 */
 export async function GetImageFromTokenURI(tokenURI) {
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
 * @param {number} tokenId eg: 1
 * @return {promise<Object>} response json format
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
 * @param {number} tokenId eg: 1
 * @return {promise<string>} return metadata image url
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
 * @param {number} tokenId eg: 1
 * @return {promise<string>} return metadata name
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
 * @param {number} tokenId eg: 1
 * @return {promise<string>} return metadata description
 */
export async function GetMetadataDescription(tokenId) {
	let metadata = await GetMetadata(tokenId);
	if (metadata.description == undefined) {
		return "";
	}
	return metadata.description;
}
