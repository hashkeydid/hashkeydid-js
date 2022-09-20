import { expect } from "chai";
import * as DID from "../contract/did/didContract.js";
import * as did from "../api/did.js"

describe("DID read test", async() => {
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
    
    it("Verify did format", async () => {
        let did1 = "xxx.key1"
        let result = await did.VerifyDIDFormat(did1);
        expect(result).false;
    }).timeout(10000);

    it("Get did authorized addresses", async () => {
        let result = await did.GetAuthorizedAddrs(tokenId);
        expect(result[0]).equal(authorizedAddr);
    }).timeout(10000);
   
    it("Check did authorized address", async () => {
        let result = await did.IsAddrAuthorized(tokenId, authorizedAddr);
        expect(result).true;
    }).timeout(10000);

    it("Get KYC information", async () => {
        let token = 5945;
        let KYCProvider = "0x0FC1021d0B7111f2170d1183367AAcaC26c68888";
        let KYCId = 2;
        let result = await did.GetKYCInfo(token, KYCProvider, KYCId);
        expect(result[0]).true;
        expect(result[1].toNumber()).equal(1642193640);
        expect(result[2].toNumber()).equal(1705265640);
    }).timeout(10000);

    it("Check if did has already claimed", async () => {
        let result = await did.DidClaimed(didName);
        expect(result).true;
    }).timeout(10000);

    it("Check if address has already claimed", async () => {
        let result = await did.AddrClaimed(signer.address);
        expect(result).true;
    }).timeout(10000);

    it("Get tokenId by did", async () => {
        let result = await did.TokenId2Did(tokenId);
        expect(result).equal(didName);
    }).timeout(10000);

    it("Get did by tokenId", async () => {
        let result = await did.Did2TokenId(didName);
        expect(result.toNumber()).equal(tokenId);
    }).timeout(10000);
    
    it("Get issuer address by deedgrain address", async () => {
        let result = await did.DeedGrainAddrToIssur(signer.address);
        expect(result).equal("0x0000000000000000000000000000000000000000");
    }).timeout(10000);
})
