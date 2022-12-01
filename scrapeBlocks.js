const Scraper = require('./scraper')
const RolodETH = new (require("./RolodETH"))("./data/", 1);

const rpcs = [
    
  ]

const scraper = new Scraper("http://localhost:3000");

(async () => {
  latestBlock = 6000000

  while(true) {
    //let latestBlock = await scraper.provider.getBlockNumber();
    console.log(latestBlock)
    await scraper.scrapeBlocks(RolodETH, latestBlock - 20, latestBlock)
    latestBlock += 30
  }


})();