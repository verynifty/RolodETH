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
const PudgyPinguinMinters = new ERC721Minters("https://rpc.flashbots.net/", "0xbd3531da5cf5857e7cfaa92426877b022e612cf8", ["pudgy-pinguin-minter"]);
const HashMaskMinters = new ERC721Minters("https://rpc.flashbots.net/", "0xc2c747e0f7004f9e8817db2ca4997657a7746928", ["hashmask-minter"]);
const AutoglyphMinters = new ERC721Minters("https://rpc.flashbots.net/", "0xd4e4078ca3495de5b1d4db434bebc5a986197782", ["autoglyph-minter"]);
const CyberKongzMinters = new ERC721Minters("https://rpc.flashbots.net/", "0x57a204aa1042f6e66dd7730813f4024114d74f37", ["cyber-kong-minter"]);
const MeebitsMinters = new ERC721Minters("https://rpc.flashbots.net/", "0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7", ["meebit-minter"]);
const CrypToadzMinters = new ERC721Minters("https://rpc.flashbots.net/", "0x1cb1a5e65610aeff2551a50f76a87a7d3fb649c6", ["cryptoadz-minter"]);
const VeeFriendsMinters = new ERC721Minters("https://rpc.flashbots.net/", "0xa3aee8bce55beea1951ef834b99f3ac60d1abeeb", ["veefriend-minter"]);
const CloneXMinters = new ERC721Minters("https://rpc.flashbots.net/", "0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b", ["clonex-minter"]);
const WorldOfWomenMinters = new ERC721Minters("https://rpc.flashbots.net/", "0xe785e82358879f061bc3dcac6f0444462d4b5330", ["wow-minter"]);
const GolbinTownMinters = new ERC721Minters("https://rpc.flashbots.net/", "0xbce3781ae7ca1a5e050bd9c4c77369867ebc307e", ["goblin-town-minter"]);

const NFTMinters = [
    BAYCMinters,
    AzukiMinters,
    MoonBirdMinters,
    DoodleMinters,
    CoolcatMinters,
    LootMinters,
    PudgyPinguinMinters,
    HashMaskMinters,
    AutoglyphMinters,
    CyberKongzMinters,
    MeebitsMinters,
    CrypToadzMinters,
    VeeFriendsMinters,
    CloneXMinters,
    WorldOfWomenMinters,
    GolbinTownMinters
];

(async () => {

    await Reservoir.addTo(RolodETH);
    return;

    for (const m of NFTMinters) {
        await m.addTo(RolodETH);
    }
    return;
    await MyEtherWalletDarkListLabels.addTo(RolodETH);
    await CoingeckoTokenList.addTo(RolodETH)
    await estherscanLabels.addTo(RolodETH);

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