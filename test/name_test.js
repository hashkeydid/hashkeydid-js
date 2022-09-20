import { expect } from "chai";
import * as DIDResolver from "../contract/resolver/resolverContract.js";
import * as name from "../api/name.js"
import { Error } from "../error/errors.js";


describe("NameTest", async() => {
    let signer;

    before(async () => {
        signer = DIDResolver.wallet;
    })
    
    it("Get DID name when reverse is false", async () => {
        try {
            expect(await name.GetDIDNameByAddr(signer.address));
        }
        catch (e) {
            expect(e.reason).equal(Error.ErrAddrNotSetReverse);
        }
    }).timeout(10000);

    it("Get DID name force when reverse is false", async () => {
        let result = await name.GetDIDNameByAddrForce(signer.address);
        expect(result).equal("herro.key");
    }).timeout(10000);

    it("Get DID name force when reverse is false, and set block height", async () => {
        let overrides = {"blockTag": 36513266};
        let result = await name.GetDIDNameByAddrForce(signer.address, overrides)
        expect(result).equal("herro.key");
        
        overrides = {"blockTag": 36513265};
        result = await name.GetDIDNameByAddrForce(signer.address, overrides);
        expect(result).equal(Error.ErrAddrNotClaimed);
    }).timeout(10000);

    it("Set reverse true", async () => {
        name.SetReverse(signer.address, true);
        let result = await name.GetDIDNameByAddr(signer.address);
        expect(result).equal("herro.key");
    }).timeout(10000);
})
