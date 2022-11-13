const { ethers } = require("ethers");

function ERC721Minters(rpcUrl, address, tag) {
    this.name = "ERC721Minters_" + address + "_" + Date.now();
    this.address = address;
    this.tag = tag;
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    this.contract = new ethers.Contract(address, [
        { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }
    ], this.provider);
}

ERC721Minters.prototype.addTo = async function (RolodETH, fromBlock = 0, toBlock = "latest") {
    let filter = {
        fromBlock: fromBlock,
        toBlock: toBlock,
        address: this.address,
        topics: [
            ethers.utils.id("Transfer(address,address,uint256)"),
            ethers.utils.hexZeroPad("0x0000000000000000000000000000000000000000", 32),
            null
        ]
    };
    let events = await this.provider.getLogs(filter)
    let addresses = {}
    for (const event of events) {
        let address = ethers.utils.hexDataSlice(event.topics[2], 12, 32)
        addresses[address] = true;
    }
    for (const address of Object.keys(addresses)) {
        RolodETH.addTag(address, this.tag)
    }
}

module.exports = ERC721Minters;
