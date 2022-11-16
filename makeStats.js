const RolodETH = new (require("./RolodETH"))("./data/", 1);


(async () => {
    const addresses = RolodETH.getFiles();
    const tags = {};
    for (const address of addresses) {
        let record = RolodETH.get(address);
        for (const tag of record.tags) {
            if (tags[tag] == null) {
                tags[tag] = 1;
            } else
            {
                tags[tag]++
            }
        }
    }
    console.log(tags)
    console.log("Total records", addresses.length)
})();