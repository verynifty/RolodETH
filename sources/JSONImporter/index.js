const axios = require("axios");

function JSONImporter(address) {
    this.name = "JSONImporter_"+ address + "_" + Date.now();
    this.address = address;
}

JSONImporter.prototype.addTo = async function (RolodETH) {
    let resp = await axios.get(this.address);
    let labels = resp.data;
    for (const address in labels) {
        if (Object.hasOwnProperty.call(labels, address)) {
            const label = labels[address];
            console.log(label)
            if (label.name != null && label.name != "") {
                RolodETH.addProperty(address, "name", label.name);
            }
            for (const tag of label.labels) {
                RolodETH.addTag(address, tag);
            }
        }
    }
   
}

module.exports = JSONImporter;