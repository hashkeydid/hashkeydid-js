import { expect } from "chai";
import * as did from "../did.js"

describe("DID test", async() => {
    let signer;
    let address
    let didName;
    let tokenId;
    let authorizedAddr;

    before(async () => {
        signer = new did.DIDSigner("f3db6526e98e79c7bd1dcadfa15a01e1de5c7293669608f90b9230581047cbc4");
        // signer = new did.GetDIDSigner("");
        tokenId = 13756;
        didName = "herro.key";
        authorizedAddr = "0xa060C1C3807059027Ca141EFb63f19E12e0cBF0c";
        address = signer.DIDSigner.signer.address;
    })

    it("Claim DID", async () => {
        let result = await signer.Claim("nighty.key");
        console.log(result.hash);
    }).timeout(10000);

    it("Add authorized address", async () => {
        let result = await signer.AddAuth(tokenId, "0xc6642B7980A5a702732B243b0C21655e82e80189");
        console.log(result.hash);
    }).timeout(10000);

    it("Get addr by DID name", async () => {
        let addr = await did.GetAddrByDIDName(didName);
        expect(addr).equal(address);
    }).timeout(100000);

    it("Verify did format", async () => {
        let did1 = "xxx.key1"
        let result = await did.VerifyDIDFormat(did1);
        expect(result).false;
    }).timeout(100000);

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
        let result = await did.AddrClaimed(authorizedAddr);
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
})
