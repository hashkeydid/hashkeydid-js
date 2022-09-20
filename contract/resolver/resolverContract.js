import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { ResolverAbi } from "./resolverAbi.js"
import * as setting from "../../config.js"
dotenv.config();

const provider = new ethers.providers.JsonRpcProvider(setting.DefaultPlatONUrl);
// contract for query
export const DIDResolverContract = new ethers.Contract(setting.DefaultDIDResolverContractAddr, ResolverAbi, provider);
// signer fro transaction
export let wallet = new ethers.Wallet(process.env.platon_pri, provider);
export const DIDResolverSigner = DIDResolverContract.connect(wallet);
