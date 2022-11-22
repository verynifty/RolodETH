# RolodETH
An open source and open data Rolodex for Ethereum addresses. You can see an example of data [here](https://raw.githubusercontent.com/verynifty/RolodETH/main/data/0x5c891d76584b46bc7f1e700169a76569bb77d2db) or [here](https://raw.githubusercontent.com/verynifty/RolodETH/main/data/0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45).

All code and data is released by the [Muse DAO](https://twitter.com/NiftyMuseum) under the MIT license.
# Data sources

Data are sourced from a variety of providers listed here:
* [Uniswap token lists](https://tokenlists.org/) Currated token lists from Coingecko, Uniswap and MyEtherWallet.
* [reservoir.tools](https://reservoir.tools/) API for NFT collections metadata.
* [Snapshot voters](https://snapshot.org/) API to get list of voters for all DAO using Snapshot
* Popular NFT collection minters from ERC721 on chain transfers such as: bayc, azuki, moonbird, doodle, coolcat, loot..
* Uniswap V3 LP providers from ERC721 on chain transfers
* [MyEtherWallet](https://github.com/MyEtherWallet/ethereum-lists/blob/master/src/addresses/addresses-darklist.json) scam darklist
* [Etherscan labels](https://github.com/brianleect/etherscan-labels)
* Some personal tags by [@grand_marquis](https://twitter.com/grands_marquis).

# Usage

You can use sources adapters to create your own RolodETH database. The open public repository is located [here](https://github.com/verynifty/RolodETH/tree/main/data). You can host your own API by cloning the repo or use direct Github access:
```
https://raw.githubusercontent.com/verynifty/RolodETH/main/data/[ADDRESS IN LOWERCASE]
```

# Contribute

To add your data, open a pull request or contact [@grand_marquis](https://twitter.com/grands_marquis) on twitter.
# Installation

```
npm install
```

You can run your own API:

```
node ./api/index.js
```



