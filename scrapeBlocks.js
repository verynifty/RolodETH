const Scraper = require('./scraper')
const { SuperProvider }  = require("ethers-super-provider")
const RolodETH = new (require("./RolodETH"))("./data/", 1);

const scraper = new Scraper("https://rpc.flashbots.net/");

(async () => {
    console.log(SuperProvider)
    let latestBlock = await scraper.provider.getBlockNumber();
    console.log(latestBlock)
    await scraper.scrapeBlocks(RolodETH, latestBlock - 50, latestBlock)

})();