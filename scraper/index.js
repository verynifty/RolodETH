const { ethers } = require("ethers");
const proxyDetection = require('evm-proxy-detection');

function RoloScraper(rpcUrl) {
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
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

RoloScraper.prototype.scrapeBlocks = async function (rolodeth, fromBlock, toBlock) {
    // console.log(await  this.requestFunc("eth_getBlockByNumber",[1]))

    let addresses = await this.getAddressesInBlocks(fromBlock, toBlock);
    for (const address of addresses) {
        const code = await this.provider.getCode(address);
        
        console.log("https://etherscan.io/address/" + address, code != "0x")
        const lookup = await this.provider.lookupAddress(address);
        if (lookup) {
            rolodeth.addProperty(address, "ens", lookup);
        } else {
            rolodeth.removeProperty(address, "ens");
        }
        console.log(lookup)
        if (code == "0x") {
            rolodeth.addTag(address, "eoa");
        } else {
            rolodeth.addTag(address, "contract");
            let provider = this.provider
            const requestFunc = ({ method, params }) => provider.send(method, params)
            const target = await proxyDetection.default(
                address,
                requestFunc,
                "latest"
            )
            if (target != null) {
                rolodeth.addTag(address, "proxy");
                rolodeth.addProperty(address, "proxy", target);
            }
            console.log(target)
            continue;
        }
    }
}

module.exports = RoloScraper;