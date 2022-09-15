import * as name from "../name.js"
import { expect } from "chai";

describe("Test name", async() => {
    it("set reverse false", async () => {
        name.SetReverse('0xa060C1C3807059027Ca141EFb63f19E12e0cBF0c', true);
    })

    // it("get reverse name", async () => {
    //     // await name.SetReverse('0xB45c5Eac26AF321dd9C02693418976F52E1219b6', false);
    //     expect(await name.GetDIDNameByAddr('0xB45c5Eac26AF321dd9C02693418976F52E1219b6')).equal("herro.key");
    // })

    it("get did force", async () => {
        expect(await name.GetDIDNameByAddr('0xa060C1C3807059027Ca141EFb63f19E12e0cBF0c')).equal("lucas.key");
    })
})
