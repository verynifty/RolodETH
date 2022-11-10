const axios = require("axios");

function OpenSeaAPI(address) {
    this.name = "OpenSeaAPI_" + Date.now();
}

OpenSeaAPI.prototype.addTo = async function (RolodETH) {
    let hasMore = true;
    const limit = 300
    let offset = 0;
    while (hasMore) {
        let resp = await axios.get("https://api.opensea.io/api/v1/collections?offset=" + offset + "&limit=" + limit);
        let collections = resp.data.collections;
        for (const collection of collections) {
            console.log(collection)
            if (collection.primary_asset_contracts != null && collection.primary_asset_contracts[0] != null && collection.name != null && collection.external_url != null && collection.stats.num_owners > 100) {
                const address = collection.primary_asset_contracts[0].address;
                RolodETH.addProperty(address, "name", collection.name)
                RolodETH.addProperty(address, "erc721_symbol", collection.primary_asset_contracts[0].symbol)
                if(collection.external_url != null) {
                    RolodETH.addProperty(address, "url", collection.external_url)
                }
                RolodETH.addTag(address, collection.primary_asset_contracts[0].schema_name)
            }
        }
        hasMore = collections.length == limit;
        offset += limit
    }
   
}

module.exports = OpenSeaAPI;