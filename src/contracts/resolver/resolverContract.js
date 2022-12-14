import { ethers } from "ethers";
import { ResolverAbi } from "./resolverAbi.js"
import * as setting from "../../config.js"

const provider = new ethers.providers.JsonRpcProvider(setting.DefaultPlatONUrl);
// contract for query
export const DIDResolverContract = new ethers.Contract(setting.DefaultDIDResolverContractAddr, ResolverAbi, provider);
