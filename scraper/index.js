const { ethers } = require("ethers");
const { SuperProvider } = require("ethers-super-provider")
const proxyDetection = require('evm-proxy-detection');
const AbiFunctions = require("abi-decode-functions");
function RoloScraper(rpcUrl) {
    if (Array.isArray(rpcUrl)) {
        this.provider = new SuperProvider(rpcUrl.map((url) => new ethers.providers.JsonRpcProvider(url)))
    } else {
        this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    }
}

RoloScraper.prototype.getAddressesInBlocks = async function (fromBlock, toBlock) {
    let blocksPromises = [];
    for (let index = fromBlock; index < toBlock; index++) {
        blocksPromises.push(this.provider.getBlockWithTransactions(index));
    }
    const blocks = await Promise.all(blocksPromises);
    let addresses = {}
    for (const b of blocks) {
        for (const t of b.transactions) {
            addresses[t.from] = true;
            addresses[t.to] = true;
        }
    }
    return Object.keys(addresses);
}

RoloScraper.prototype.arrayContainsFunction = function (array, funcsig) {
    return (
        array.indexOf(ethers.utils.id(funcsig).substring(0, 10)) > -1
    );
};

RoloScraper.prototype.detectERC = async function (address, bytecode) {
    let result = []
    const decoder = new AbiFunctions.default(bytecode);
    const functionIds = decoder.getFunctionIds();
    /* Check if erc721 funcs are there */
    if (this.arrayContainsFunction(
        functionIds,
        "setApprovalForAll(address,bool)"
    ) &&
        this.arrayContainsFunction(functionIds, "ownerOf(uint256)") &&
        (this.arrayContainsFunction(functionIds, "transfer(address,uint256)") ||
            this.arrayContainsFunction(
                functionIds,
                "transferFrom(address,address,uint256)"
            )) &&
        this.arrayContainsFunction(functionIds, "approve(address,uint256)")) {
        result.push("erc721")
    }
    /* Check if erc20 funcs are there */
    else if (this.arrayContainsFunction(functionIds, "totalSupply()") &&
        this.arrayContainsFunction(functionIds, "balanceOf(address)") &&
        this.arrayContainsFunction(functionIds, "transfer(address,uint256)") &&
        this.arrayContainsFunction(
            functionIds,
            "transferFrom(address,address,uint256)"
        ) &&
        this.arrayContainsFunction(functionIds, "approve(address,uint256)") &&
        this.arrayContainsFunction(functionIds, "allowance(address,address)")) {
        result.push("erc20")
    }
    /* Check if erc1155 funcs are there */
    else if (this.arrayContainsFunction(
        functionIds,
        "safeTransferFrom(address,address,uint256,uint256,bytes)"
    ) &&
        this.arrayContainsFunction(
            functionIds,
            "safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)"
        ) &&
        this.arrayContainsFunction(
            functionIds,
            "balanceOfBatch(address[],uint256[])"
        )) {
        result.push("erc1155");
    }
    return result;
}

RoloScraper.prototype.scrapeAddress = async function (rolodeth, address) {
    const code = await this.provider.getCode(address);

    console.log("https://etherscan.io/address/" + address, code != "0x")
    try {
        const lookup = await this.provider.lookupAddress(address);
        if (lookup) {
            rolodeth.addProperty(address, "ens", lookup);
        } else {
            rolodeth.removeProperty(address, "ens");
        }
        console.log(lookup)
    } catch (error) {

    }

    if (code == "0x") {
        //  rolodeth.addTag(address, "eoa");
    } else {
        rolodeth.addTag(address, "contract");
        let detected = await this.detectERC(address, code);
        for (const tag of detected) {
            rolodeth.addTag(address, tag);
        }
        console.log(detected)
        let provider = this.provider
        const requestFunc = ({ method, params }) => provider.send(method, params)
        const target = await proxyDetection.default(
            address,
            requestFunc,
            "latest"
        )
        if (target != null && address != "0x0000000000000000000000000000000000000000") {
            rolodeth.addTag(address, "proxy");
            rolodeth.addProperty(address, "proxy", target);
        }
        console.log(target)
    }
}

RoloScraper.prototype.scrapeBlocks = async function (rolodeth, fromBlock, toBlock) {
    // console.log(await  this.requestFunc("eth_getBlockByNumber",[1]))
    let addresses = await this.getAddressesInBlocks(fromBlock, toBlock);
    let promises = []
    for (const address of addresses) {
        promises.push(this.scrapeAddress(rolodeth, address))
    }
    console.log("PROMISE BEFORE")
    await Promise.all(promises);
    console.log("PROMISE AFTER")

}

module.exports = RoloScraper;