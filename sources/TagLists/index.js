const { ethers } = require("ethers");

function TagList(tagname) {
    this.name = "TagList_" + tagname + "_" + Date.now();
    this.tagname = tagname;
}


TagList.prototype.addTo = async function (RolodETH, fromBlock = 0, toBlock = "latest") {
    let t = require("./" + this.tagname)
    for (const address of t) {
        RolodETH.addTag(address, this.tagname)
    }
}

module.exports = TagList;
