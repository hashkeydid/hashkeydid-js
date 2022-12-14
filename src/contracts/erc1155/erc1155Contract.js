import { ethers } from "ethers";
import { erc1155Abi } from "./erc1155.js"

export function ERC1155Contract(rpc, address) {
    let provider = new ethers.providers.JsonRpcProvider(rpc);
    let erc1155Contract = new ethers.Contract(address, erc1155Abi, provider);
    return erc1155Contract;
}
