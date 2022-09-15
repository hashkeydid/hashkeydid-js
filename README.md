# Reverse resolution

## Abstract

We are familiar with DNS resolution which is to resolve the domain name to the IP address, through the domain name of the website can be resolved to the website IP address, further access to the website content. Contrary to the DNS resolution, DNS reverse obtains the domain name or host address through the IP address. The reverse resolution of DID is similar to the reverse resolution of DNS in that it supports associating human-readable names with blockchain addresses and resolving machine-readable identifiers to human-readable identifiers.

## Implement

DID reverse resolution information are stored in the DID registry contract.When a user registers DID, the mapping relationship between DID and user address will be recorded in the 'tokenId2Did' mapping table. Although we retain the mapping relationship, it is up to the user to decide whether to use the reverse resolution. When the user needs to protect his or her privacy, he or she can call the 'setReverse(addr,false)' function in the Resolver contract to turn off the reverse resolution function, which is unavailable by default. To use the reverse resolution function, you only need to call the 'name(addr)' function in the Resolver contract.

## Application

In some apps, when some users or data are found by the address, the DID name displayed on the APP page is more readable than the address.



# Avatar resolution

## Abstract

With the advent of WEB3.0 era, more and more applications will start to use DID as one of the user login methods. To make the page more user-friendly, we support storing the avatar metadata of the DID in the DID Resolver to share the avatar information between different applications. This article defines the DID retrieval process for the avatar 'URI', the definition scheme for the avatar metadata 'URI' field, and how these schemes should be interpreted by clients who want to display the user's avatar.

## Specification

#### Avatar

Avatars are common image formats such as  `image/jpeg`、`image/png`、 `image/jpg` in MIME types, and can also be other image types supported by the client.

#### URI

Currently, the client needs to support the following URI types.

- HTTP: If you provide an HTTP URI, it should be able to parse directly into an avatar image, rather than a traditional HTML page, metadata, or other content.

- IPFS: If an IPFS URI is provided, it should be able to parse directly into an avatar image. Clients without built-in IPFS support can rewrite the URI as an HTTPS URL referencing the IPFS gateway before parsing. As described in [this document](https://docs.ipfs.io/how-to/address-ipfs-on-web/).

- NFT: NFT can also be used as the profile picture of DID. When setting the profile picture URI, you need to follow the following standards:

  ```shell
  nft://chainid:tokentype:contractAddress:tokenId
  ```

  - nft: prefix, eg: `HTTP, IPFS`
  - chainid: chain ID
  - tokentype: token type, eg: `721/1155`
  - contractAddress: contract address
  - tokenId: NFT's tokenId

## Resolve

There are two ways to retrieve the avatar URI, depending on whether the client starts with a blockchain address or a DID name.

#### DID/Address resolve

- DID

  To get the avatar URI of a DID name, the client needs to query the tokenId associated with this DID in the DID registry, and then call the Resolver contract `text(tokenId, avatar)`function to retrieve the avatar URI of this DID.

- address

  After the client enters the user address, the corresponding tokenId is resolved in the Resolver contract, and then the Resolver contract `text(tokenId, avatar)` function is called to retrieve the avatar URI of this address.

Any failure at any step in this process must be treated by the client as a failure to find a valid avatar URI.

#### URI resolve

URI with HTTP/IPFS format can directly access the URI to get the profile picture data. To parse an NFT-format URI, you need to use a resolver. Calling the `resolverAvatar(URI)` method returns the image or a link to the image.

