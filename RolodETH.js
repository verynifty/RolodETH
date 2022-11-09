function RolodETH(chainID) {
    this.chainID = chainID;
    this.v = {}
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

RolodETH.prototype.addProperty = function (address, propertyName, value) {
    const nAddress = this.normalizeAddress(address);
    this.createIfNotExists(address);
    this.v[nAddress][propertyName] = value;
}

RolodETH.prototype.addTag = function (address, tagName) {
    const nAddress = this.normalizeAddress(address);

    this.createIfNotExists(address);
    this.v[nAddress].tags.push(tagName);
}

RolodETH.prototype.count = function () {
    return Object.keys(this.v).length;
}

RolodETH.prototype.toString = function () {
    console.log(this.v)
}

module.exports = RolodETH;
