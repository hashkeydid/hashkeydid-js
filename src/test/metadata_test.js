import { expect } from "chai";
import * as metadata from "../api/metadata.js"

describe("DID metadata test", async() => {
   let tokenId;

    before(async () => {
        tokenId = 1;
    })
    
    it("Get metadata by tokenId", async () => {
        let result = await metadata.GetMetadata(tokenId);
        expect(result.description).equal("Your Passport in the Web3");
        expect(result.image).equal("https://static.hashkey.id/resources/images/nft/hashkey_did_default.png");
        expect(result.name).equal("QPassport: steemit.qp");
    }).timeout(10000);

    it("Get metadata image by tokenId", async () => {
        let result = await metadata.GetMetadataImage(tokenId);
        expect(result).equal("https://static.hashkey.id/resources/images/nft/hashkey_did_default.png");
    }).timeout(10000);

    it("Get metadata name by tokenId", async () => {
        let result = await metadata.GetMetadataName(tokenId);
        expect(result).equal("QPassport: steemit.qp");
    }).timeout(10000);

    it("Get metadata description by tokenId", async () => {
        let result = await metadata.GetMetadataDescription(tokenId);
        expect(result).equal("Your Passport in the Web3");
    }).timeout(10000);
})
