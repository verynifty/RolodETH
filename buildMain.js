const RolodETH = new (require("./RolodETH"))("./data/", 1);

const UniswapTokenList = require("./sources/UniswapTokenList");
const OpenSeaAPI = require("./sources/OpenSeaAPI");
const JSONImporter = require("./sources/JSONImporter");
const reservoir = require("./sources/reservoir");

const CoingeckoTokenList = new UniswapTokenList("https://tokens.coingecko.com/uniswap/all.json");
const MyCryptoTokenList = new UniswapTokenList("https://uniswap.mycryptoapi.com/");
const UniswapPairsList = new UniswapTokenList("https://raw.githubusercontent.com/jab416171/uniswap-pairtokens/master/uniswap_pair_tokens.json");

const MyEtherWalletDarkListLabels = new JSONImporter("https://raw.githubusercontent.com/MyEtherWallet/ethereum-lists/master/src/addresses/addresses-darklist.json");
const estherscanLabels = new JSONImporter("https://raw.githubusercontent.com/brianleect/etherscan-labels/main/combined/combinedLabels.json");
const OS = new OpenSeaAPI();
const Reservoir = new reservoir();


(async () => {

    await MyEtherWalletDarkListLabels.addTo(RolodETH);
    return;
    await CoingeckoTokenList.addTo(RolodETH)
    await estherscanLabels.addTo(RolodETH);
    await Reservoir.addTo(RolodETH);

    return;

    await OS.addTo(RolodETH);
    return;
    // await OS.addTo(RolodETH);
    // RolodETH.toString()
    RolodETH.toString()


    return;
    console.log(RolodETH.count())
    await MyCryptoTokenList.addTo(RolodETH)
    console.log(RolodETH.count())
    await UniswapPairsList.addTo(RolodETH)
    console.log(RolodETH.count())
    RolodETH.toFile("latest.json")
})();