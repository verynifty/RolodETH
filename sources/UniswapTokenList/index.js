const axios = require("axios");
function UniswapTokenList(address) {
    this.name = "UniswapTokenList_" + address + "_" + Date.now();
    this.address = address;
}

UniswapTokenList.prototype.addTo = async function(RolodETH) {
    const result = {};
    let resp = await axios.get(this.address);
    let tokenList = resp.data.tokens
    // console.log(resp.data.tokens.length)
    for (const token of tokenList) {
        const address = token.address;
        RolodETH.addProperty(address, "name", token.name)
        RolodETH.addProperty(address, "erc20_symbol", token.symbol)
        RolodETH.addProperty(address, "erc20_decimals", token.decimals)
        RolodETH.addProperty(address, "imageURL", token.logoURI)
        RolodETH.addTag(address, "erc20")
    }
}

module.exports = UniswapTokenList;