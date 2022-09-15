import fetch from "node-fetch";

// GetMetadata returns the Metadata by tokenId
export async function GetMetadata(tokenId) {
    let MetadataUrl = `https://api.hashkey.id/did/api/nft/metadata/${tokenId}`;
    let response = await fetch(MetadataUrl);
    let resJson = await response.json();
    return resJson;
}

// GetMetadataImage returns the image url in metadata by tokenId
export async function GetMetadataImage(tokenId) {
	let metadata = await GetMetadata(tokenId);
	if (metadata.image == undefined) {
		return "";
	}
	return metadata.image;
}

// GetMetadataName returns the name in metadata by tokenId
export async function GetMetadataName(tokenId) {
	let metadata = await GetMetadata(tokenId);
	if (metadata.name == undefined) {
		return "";
	}
	return metadata.name;
}

// GetMetadataDescription returns the description in metadata by tokenId
export async function GetMetadataDescription(tokenId) {
	let metadata = await GetMetadata(tokenId);
	if (metadata.description == undefined) {
		return "";
	}
	return metadata.description;
}
