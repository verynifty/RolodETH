const Scraper = require('./scraper')
const RolodETH = new (require("./RolodETH"))("./data/", 1);

const scraper = new Scraper("https://rpc.flashbots.net/");



(async () => {

    await scraper.scrapeBlocks(RolodETH, 15635081, 15635151)
    
})();