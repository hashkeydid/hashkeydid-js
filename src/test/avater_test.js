import { expect } from "chai";
import * as avatar from "../api/avatar.js"

describe("DID avatar test", async() => {
    let didName;
    let tokenId;
    let nft721;
    let nft1155;

    before(async () => {
        didName = "herro.key";
        tokenId = 13756;
        nft721 = "nft:1:721:0x394E3d3044fC89fCDd966D3cb35Ac0B32B0Cda91:8619";
        nft1155 = "nft:1:1155:0xf4dd946d1406e215a87029db56c69e1bcf3e1773:1";
    })
    
    it("Get DID metadata avatar by did", async () => {
        let avatarUrl = await avatar.GetMetadataImageByDIDName(didName);
        expect(avatarUrl).equal("https://api.hashkey.id/did/api/file/avatar_3619b3aa-7979-4d10-a1ea-e6725ab8096e.png");
    }).timeout(10000);
    
    it("Get DID metadata avatar by tokenId", async () => {
        let avatarUrl = await avatar.GetMetadataImageByTokenId(tokenId);
        expect(avatarUrl).equal("https://api.hashkey.id/did/api/file/avatar_3619b3aa-7979-4d10-a1ea-e6725ab8096e.png");
    }).timeout(10000);

    it("Get DID avatar by did", async () => {
        let result = await avatar.GetAvatarByDIDName(didName);
        expect(result).equal("https://arweave.net/qMWNCxhao7TGWnj8axed0YzLU1gx8-5yP1W1gBHNVFg");
    }).timeout(10000);

    it("Get DID avatar by tokenId", async () => {
        let result = await avatar.GetAvatarByTokenId(tokenId);
        expect(result).equal("https://arweave.net/qMWNCxhao7TGWnj8axed0YzLU1gx8-5yP1W1gBHNVFg");
    }).timeout(10000);
    
    it("Get avatar by url", async () => {
        let result = await avatar.AvatarFormatText2AvatarUrl(nft721)
        expect(result).equal("https://nfts.renga.app/nfts/public/images/8619.jpeg");
    }).timeout(10000);
})