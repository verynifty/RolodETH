const RolodETH = new (require("./RolodETH"));

const UniswapTokenList = require("./sources/UniswapTokenList/index.js");

const CoingeckoTokenList = new UniswapTokenList("https://tokens.coingecko.com/uniswap/all.json");
const MyCryptoTokenList = new UniswapTokenList("https://uniswap.mycryptoapi.com/");
const UniswapPairsList = new UniswapTokenList("https://raw.githubusercontent.com/jab416171/uniswap-pairtokens/master/uniswap_pair_tokens.json");

(async () => {
    console.log(CoingeckoTokenList)

    await CoingeckoTokenList.addTo(RolodETH)
    console.log(RolodETH.count())
    await MyCryptoTokenList.addTo(RolodETH)
    console.log(RolodETH.count())
    await UniswapPairsList.addTo(RolodETH)
    console.log(RolodETH.count())
    RolodETH.toFile("latest.json")
})();