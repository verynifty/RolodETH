
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

RolodETH.prototype.addProperty = async function (address, propertyName, value) {
    if (value == null || value == "") {
        return;
    }
    const nAddress = this.normalizeAddress(address);
    const existing = this.kfs[nAddress];
    if (existing == null) {
        this.kfs[nAddress] = {
            propertyName: value,
        }
    } else {
        existing[propertyName] = value;
        this.kfs[nAddress] = existing;
    }

}

RolodETH.prototype.addTag = function (address, tagName) {
    if (tagName == null || tagName == "") {
        return;
    }
    const nAddress = this.normalizeAddress(address);

   // this.createIfNotExists(address);
   // this.v[nAddress].tags.push(tagName);
}

RolodETH.prototype.count = function () {

}

RolodETH.prototype.toString = async function () {


}

RolodETH.prototype.vacuum = async function () {
}

RolodETH.prototype.toFile = function(path) {

}

module.exports = RolodETH;
