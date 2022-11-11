
const KFS = require("key-file-storage").default;

function RolodETH(filename, chainID) {
    console.log(KFS)
    this.chainID = chainID;
    this.kfs = KFS(filename)
}

RolodETH.prototype.createIfNotExists = function (address) {
    const nAddress = this.normalizeAddress(address);
    if (this.v[nAddress] == null) {
        this.v[nAddress] = {
            tags: []
        }
    }
}

RolodETH.prototype.normalizeAddress = function (address) {
    return address.toLowerCase()
}

RolodETH.prototype.get = function (address) {
    let nAddress = this.normalizeAddress(address);
    return (this.kfs[nAddress]);
}

RolodETH.prototype.addProperty = async function (address, propertyName, value) {
    if (value == null || value == "") {
        return;
    }
    const nAddress = this.normalizeAddress(address);
    const existing = this.kfs[nAddress];
    if (existing == null) {
        let obj = {
            tags: []
        };
        obj[propertyName] = value;
        this.kfs[nAddress] = obj;
    } else {
        existing[propertyName] = value;
        this.kfs[nAddress] = existing;
    }

}

RolodETH.prototype.removeProperty = async function (address, propertyName) {
    const nAddress = this.normalizeAddress(address);
    const existing = this.kfs[nAddress];
    if (existing == null) {
    } else {
        existing[propertyName] = null;
        this.kfs[nAddress] = existing;
    }
}

RolodETH.prototype.addTag = function (address, tagName) {
    if (tagName == null || tagName == "") {
        return;
    }
    const nAddress = this.normalizeAddress(address);
    const existing = this.kfs[nAddress];
    if (existing == null) {
        this.kfs[nAddress] = {
            tags: [tagName]
        }
    } else {
        if (existing.tags.indexOf(tagName) == -1) {
            existing.tags.push(tagName);
            this.kfs[nAddress] = existing;
        }
    }
}

module.exports = RolodETH;
