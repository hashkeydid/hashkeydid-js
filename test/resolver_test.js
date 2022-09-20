import { expect } from "chai";
import * as DIDResolver from "../contract/resolver/resolverContract.js";
import * as resolver from "../api/resolver.js"

describe("DIDReadTest", async() => {
    let signer;
    let tokenId;

    before(async () => {
        signer = DIDResolver.wallet;
        tokenId = 13756;
        didName = "herro.key";
        authorizedAddr = "0xa060C1C3807059027Ca141EFb63f19E12e0cBF0c";
    })
    
    it("Get DID name when reverse is true", async () => {
        let did = await resolver.GetDIDNameByAddr(signer.address);
        expect(did).equal("herro.key");
        // console.log(did);
    }).timeout(10000);

    it("Get blockchain address", async () => {
        let result = await resolver.GetBlockChainAddress(tokenId, 1);
        expect(result).equal("0xb45c5eac26af321dd9c02693418976f52e1219b6");
        // console.log(result);
    }).timeout(10000);

    it("Get content value", async () => {
        let result = await resolver.GetContentHash(tokenId);
        expect(result).equal("0x1234");
        // console.log(result);
    }).timeout(10000);

    it("Get public key", async () => {
        let result = await resolver.GetPublicKey(tokenId);
        expect(result[0]).equal("0x0000000000000000000000000000000000000000000000000000000000000001");
        expect(result[1]).equal("0x0000000000000000000000000000000000000000000000000000000000000002");
        // console.log(result);
    }).timeout(10000);

    it("Get value by key", async () => {
        let result = await resolver.Text(tokenId, "name");
        expect(result).equal("herro");
        // console.log(result);
    }).timeout(10000);
})
