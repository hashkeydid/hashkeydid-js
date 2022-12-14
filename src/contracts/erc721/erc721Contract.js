import { ethers } from "ethers";
import { erc721Abi } from "./erc721Abi.js"

export function ERC721Contract(rpc, address) {
    let provider = new ethers.providers.JsonRpcProvider(rpc);
    let erc721Contract = new ethers.Contract(address, erc721Abi, provider);
    return erc721Contract;
}
