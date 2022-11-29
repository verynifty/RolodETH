const Scraper = require('./scraper')
const RolodETH = new (require("./RolodETH"))("./data/", 1);

const rpcs = [
    
  ]

const scraper = new Scraper("https://eth-mainnet.g.alchemy.com/v2/YViRFlzFSftOMSgTV6oTNTOcDH3EnD2a");

(async () => {
    let latestBlock = await scraper.provider.getBlockNumber();
    console.log(latestBlock)
    await scraper.scrapeBlocks(RolodETH, latestBlock - 2, latestBlock)

})();