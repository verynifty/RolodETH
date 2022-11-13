const { ethers } = require("ethers");

function ERC721Minters(rpcUrl, address, tag) {
    this.name = "ERC721Minters_" + address + "_" + Date.now();
    this.address = address;
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    this.contract = new ethers.Contract(address, [
        { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }
    ], this.provider);
}

ERC721Minters.prototype.addTo = async function (RolodETH) {
    let filter = {
        address: this.address,
        topics: [
            ethers.utils.id("Transfer(address,address,uint256)"),
            ethers.utils.hexZeroPad("0x0000000000000000000000000000000000000000", 32),
            null
        ]
    };
    console.log(filter)
    let events = await this.provider.getLogs(filter)
    console.log(events)
}

module.exports = ERC721Minters;
