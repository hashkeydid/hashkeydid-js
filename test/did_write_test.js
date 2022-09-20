import * as DID from "../contract/did/didContract.js";
import * as did from "../api/did.js"

describe("DID write test", async() => {
    let signer;
    let didName;
    let tokenId;
    let authorizedAddr;

    before(async () => {
        signer = DID.wallet;
        tokenId = 13756;
        didName = "herro.key";
        authorizedAddr = "0xa060C1C3807059027Ca141EFb63f19E12e0cBF0c";
    })
    
    // it("Claim DID", async () => {
    //     let result = await did.Claim("nightyNine.key");
    //     console.log(result);
    // }).timeout(10000);
    
    // it("Add authorized address", async () => {
    //     let result = await did.AddAuth(tokenId, authorizedAddr);
    //     console.log(result);
    // }).timeout(10000);

    // it("Add authorized address", async () => {
    //     let result = await did.AddAuth(tokenId, authorizedAddr);
    //     console.log(result);
    // }).timeout(10000);
})
