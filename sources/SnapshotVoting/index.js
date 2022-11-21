const axios = require("axios");

function SnapshotVoting() {
    this.name = "SnapshotVoting_" + Date.now();
}

SnapshotVoting.prototype.spaceToName = function(spaceName) {
    if (spaceName == "jntaoli.eth") {
        return "zkSync DAO"
    }
    return spaceName.toLowerCase().replace(".eth", "");
}

SnapshotVoting.prototype.addTo = async function (RolodETH) {
    let cont = true;
    let skip = 400000;
    let returnSize = 1000
    let voters = {}
    while (cont) {
        try {
            let resp = await axios.post("https://hub.snapshot.org/graphql", {
                query: `query {
                messages (
                  first: ${returnSize}
                  skip: ${skip}
                  where: { type: "vote" }
                  orderBy: "timestamp"
                  orderDirection: desc
                ) {
                  address
                  space
                }
              }
            `
            }
    
            );
            let votes = resp.data.data.messages;
            for (const vote of votes) {
                RolodETH.addTag(vote.address, "snapshot-voter-" + this.spaceToName(vote.space));
            }
            skip += returnSize
            console.log(votes.length, skip)
            if (votes.length < returnSize) {
                cont = false;
            }
        } catch (error) {
            console.log("ERROR")
        }
       
    }

}

module.exports = SnapshotVoting;