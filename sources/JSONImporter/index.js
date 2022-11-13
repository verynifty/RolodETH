const axios = require("axios");

function JSONImporter(address) {
    this.name = "JSONImporter_" + address + "_" + Date.now();
    this.address = address;
}

JSONImporter.prototype.addTo = async function (RolodETH) {
    let resp = await axios.get(this.address);
    let labels = resp.data;
    if (Array.isArray(labels)) {
        for (const label of labels) {
            let address = label.address;
            if (label.comment != null && label.comment != "") {
                console.log(label.comment)
                RolodETH.addProperty(address, "name", label.comment);
            }
        }
    } else {
        for (const address in labels) {
            if (Object.hasOwnProperty.call(labels, address)) {
                const label = labels[address];
                if (label.name != null && label.name != "") {
                    RolodETH.addProperty(address, "name", label.name);
                }
                if (label.labels != null) {
                    for (const tag of label.labels) {
                        RolodETH.addTag(address, tag);
                    }
                }
                if (label.tags != null) {
                    for (const tag of label.tags) {
                        RolodETH.addTag(address, tag);
                    }
                }
            }
        }
    }
}

module.exports = JSONImporter;