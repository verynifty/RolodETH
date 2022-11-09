const RolodETH = new (require("./RolodETH"))("./db_test/", 1);

const UniswapTokenList = require("./sources/UniswapTokenList");
const OpenSeaAPI = require("./sources/OpenSeaAPI");

const CoingeckoTokenList = new UniswapTokenList("https://tokens.coingecko.com/uniswap/all.json");
const MyCryptoTokenList = new UniswapTokenList("https://uniswap.mycryptoapi.com/");
const UniswapPairsList = new UniswapTokenList("https://raw.githubusercontent.com/jab416171/uniswap-pairtokens/master/uniswap_pair_tokens.json");

(async () => {
    let OS = new OpenSeaAPI();
   // await OS.addTo(RolodETH);
   // RolodETH.toString()
    await CoingeckoTokenList.addTo(RolodETH)
    RolodETH.toString()


    return;
    console.log(RolodETH.count())
    await MyCryptoTokenList.addTo(RolodETH)
    console.log(RolodETH.count())
    await UniswapPairsList.addTo(RolodETH)
    console.log(RolodETH.count())
    RolodETH.toFile("latest.json")
})();