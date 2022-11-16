const { ethers } = require("ethers");

function ERC721Minters(rpcUrl, address, tags) {
    this.name = "ERC721Minters_" + address + "_" + Date.now();
    this.address = address;
    this.tags = tags;
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    this.contract = new ethers.Contract(address, [
        { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }
    ], this.provider);
}

ERC721Minters.prototype.getEvents = async function (fromBlock, toBlock) {
    console.log(fromBlock, toBlock)
    try {
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
        return (await this.provider.getLogs(filter));
    } catch (error) {
        let newToBlock =
            toBlock == "latest" ? await this.provider.getBlockNumber("latest") : toBlock;
        const result = await Promise.all([
            this.getEvents(
                fromBlock,
                fromBlock + parseInt((newToBlock - fromBlock) / 2)
            ),
            this.getEvents(
                fromBlock + parseInt((newToBlock - fromBlock) / 2) + 1,
                newToBlock
            ),
        ]);
        return ([...result[0], ...result[1]]);
    }
}

ERC721Minters.prototype.addTo = async function (RolodETH, fromBlock = 0, toBlock = "latest") {
    const events = await this.getEvents(0, "latest")
    console.log(events)
    let addresses = {}
    for (const event of events) {
        let address = ethers.utils.hexDataSlice(event.topics[2], 12, 32)
        addresses[address] = true;
    }
    for (const address of Object.keys(addresses)) {
        for (const tag of this.tags) {
            RolodETH.addTag(address, tag)
        }
    }
    console.log("DONE", this.address)
}

module.exports = ERC721Minters;
