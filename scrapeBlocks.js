const Scraper = require('./scraper')
const RolodETH = new (require("./RolodETH"))("./data/", 1);

const scraper = new Scraper("https://rpc.flashbots.net/");

(async () => {
    let latestBlock = await scraper.provider.getBlockNumber();
    console.log(latestBlock)
    await scraper.scrapeBlocks(RolodETH, latestBlock - 50, latestBlock)

})();