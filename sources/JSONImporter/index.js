const axios = require("axios");

function JSONImporter(address) {
    this.name = "JSONImporter_"+ address + "_" + Date.now();
    this.address = address;
}

JSONImporter.prototype.addTo = async function (RolodETH) {
    let resp = await axios.get(this.address);
    let labels = resp.data;
    if (Array.isArray(labels)) {
        for (const label of labels) {
            let address = label.address;
            console.log(address)
            if (label.comment != null && label.comment != "") {
                console.log(label.comment)
                RolodETH.addProperty(address, "name", label.comment);
            }
        }
    } else {
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
}

module.exports = JSONImporter;