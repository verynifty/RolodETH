const RolodETH = new (require("./RolodETH"))("./data/", 1);

const UniswapTokenList = require("./sources/UniswapTokenList");
const OpenSeaAPI = require("./sources/OpenSeaAPI");
const JSONImporter = require("./sources/JSONImporter");
const reservoir = require("./sources/reservoir");
const ERC721Minters = require("./sources/ERC721Minters");

const CoingeckoTokenList = new UniswapTokenList("https://tokens.coingecko.com/uniswap/all.json");
const MyCryptoTokenList = new UniswapTokenList("https://uniswap.mycryptoapi.com/");
const UniswapPairsList = new UniswapTokenList("https://raw.githubusercontent.com/jab416171/uniswap-pairtokens/master/uniswap_pair_tokens.json");

const MyEtherWalletDarkListLabels = new JSONImporter("https://raw.githubusercontent.com/MyEtherWallet/ethereum-lists/master/src/addresses/addresses-darklist.json");
const estherscanLabels = new JSONImporter("https://raw.githubusercontent.com/brianleect/etherscan-labels/main/combined/combinedLabels.json");
const OS = new OpenSeaAPI();
const Reservoir = new reservoir();

const BAYCMinters = new ERC721Minters("https://rpc.flashbots.net/", "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d", ["bayc-minter"]);
const AzukiMinters = new ERC721Minters("https://rpc.flashbots.net/", "0xed5af388653567af2f388e6224dc7c4b3241c544", ["azuki-minter"]);
const MoonBirdMinters = new ERC721Minters("https://rpc.flashbots.net/", "0x23581767a106ae21c074b2276d25e5c3e136a68b", ["moonbird-minter"]);
const DoodleMinters = new ERC721Minters("https://rpc.flashbots.net/", "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e", ["doodle-minter"]);
const CoolcatMinters = new ERC721Minters("https://rpc.flashbots.net/", "0x1a92f7381b9f03921564a437210bb9396471050c", ["coolcat-minter"]);
const LootMinters = new ERC721Minters("https://rpc.flashbots.net/", "0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7", ["loot-minter"]);
const PudgyPinguinMinters = new ERC721Minters("https://rpc.flashbots.net/", "0xbd3531da5cf5857e7cfaa92426877b022e612cf8", ["pudgypinguin-minter"]);
const HashMaskMinters = new ERC721Minters("https://rpc.flashbots.net/", "0xc2c747e0f7004f9e8817db2ca4997657a7746928", ["hashmask-minter"]);


const NFTMinters = [
    BAYCMinters,
    AzukiMinters,
    MoonBirdMinters,
    DoodleMinters,
    CoolcatMinters,
    LootMinters,
    PudgyPinguinMinters,
    HashMaskMinters
];

(async () => {

    for (const m of NFTMinters) {
        await m.addTo(RolodETH);
    }
    return;
    await MyEtherWalletDarkListLabels.addTo(RolodETH);
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