import * as DIDResolver from "../contract/resolver/resolverContract.js";
import * as resolver from "../api/resolver.js"

describe("DIDResolver write test", async() => {
    let signer;
    let tokenId;

    before(async () => {
        signer = DIDResolver.wallet;
        tokenId = 13756;
    })
    
    it("Set reverse value", async () => {
        await resolver.SetReverse(signer.address, true);
    }).timeout(10000);

    it("Set blockchain address", async () => {
        await resolver.SetBlockChainAddress(tokenId, 1, "0xb45c5eac26af321dd9c02693418976f52e1219b6");
    }).timeout(10000);

    it("Set content value", async () => {
        await resolver.SetContentHash(tokenId, "0x1234");
    }).timeout(10000);

    it("Set public key", async () => {
        await resolver.SetPubkey(tokenId, "0x0000000000000000000000000000000000000000000000000000000000000001", "0x0000000000000000000000000000000000000000000000000000000000000002");
    }).timeout(10000);

    it("Set key/value", async () => {
        await resolver.SetText(tokenId, "name", "herro");
    }).timeout(10000);
})
