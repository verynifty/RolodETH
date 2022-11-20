const axios = require("axios");

function SnapshotVoting() {
    this.name = "SnapshotVoting_" + Date.now();
}

SnapshotVoting.prototype.addTo = async function (RolodETH) {
    let cont = true;
    let skip = 0;
    let returnSize = 1000
    let voters = {}
    while (cont) {
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
            if (voters[vote.address.toLowerCase()] == null) {
                voters[vote.address.toLowerCase()] = {
                    spaces: {}
                }
            }
            voters[vote.address.toLowerCase()].spaces[vote.space] = true
        }
        console.log(Object.keys(voters).length)
        skip += returnSize
        console.log(votes.length, skip)
    }

}

module.exports = SnapshotVoting;