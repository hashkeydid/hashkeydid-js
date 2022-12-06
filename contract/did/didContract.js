import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { DIDAbi } from "./didAbi.js"
import * as setting from "../../config.js"
dotenv.config();

const provider = new ethers.providers.JsonRpcProvider(setting.DefaultPlatONUrl);
// contract for query
export const DIDContract = new ethers.Contract(setting.DefaultDIDContractAddr, DIDAbi, provider);
// signer fro transaction
export let wallet = new ethers.Wallet(process.env.Private, provider);
export const DIDSigner = DIDContract.connect(wallet);
