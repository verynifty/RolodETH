const { ethers } = require("ethers");

function TagList(tagname) {
    this.name = "TagList_" + tagname + "_" + Date.now();
    this.tagname = tagname;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
TagList.prototype.addTo = async function (RolodETH, fromBlock = 0, toBlock = "latest") {
    let t = require("./" + this.tagname)
    let i = 0;
    for (const address of t) {
        RolodETH.addTag(address, this.tagname)
        if (i++ % 10000 == 0) {
            console.log(i)
            await sleep(2000)
        }
    }
}

module.exports = TagList;
