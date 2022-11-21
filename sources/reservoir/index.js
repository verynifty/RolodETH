const axios = require("axios");

const sleep = ms => new Promise(r => setTimeout(r, ms));
function reservoir(address) {
    this.name = "JSONImporter_" + address + "_" + Date.now();
    this.address = address;
}

reservoir.prototype.addTo = async function (RolodETH) {
    let requests = 701;
    let continuation = true;
    let url = 'https://api.reservoir.tools/collections/v5?includeTopBid=false&sortBy=allTimeVolume&limit=20'
    while (continuation) {
        let resp = await axios.get(url);
        let collections = resp.data.collections;
        for (const collection of collections) {
            let address = collection.id;
            RolodETH.addProperty(address, "name", collection.name);
            RolodETH.addProperty(address, "imageUrl", collection.image);
            RolodETH.addProperty(address, "externalUrl", collection.externalUrl);
            RolodETH.addProperty(address, "discordUrl", collection.discordUrl);
            RolodETH.addProperty(address, "twitterUsername", collection.twitterUsername);
            RolodETH.addProperty(address, "description", collection.description);
            RolodETH.addTag(address, "nft")
            console.log(collection)
            if (collection.openseaVerificationStatus) {
                RolodETH.addTag(address, "opensea_verified")
            }
        }
        if (resp.data.continuation != null) {
            url = "https://api.reservoir.tools/collections/v5?includeTopBid=false&sortBy=allTimeVolume&limit=20&continuation=" + resp.data.continuation
        } else {
            continuation = false;
        }
        console.log("requests:", requests++)
        await sleep(1000); // sleep 1 sec for rate limit
    }
}

module.exports = reservoir;