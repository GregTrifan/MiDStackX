<div style="background-color:black; padding:20px;">
<img src="packages/frontend/public/logo.png"/>
</div>
###  🏗 WIP 🏗

**MiDStackX** is a decentralized platform for publishing and accessing content built on the Ethereum blockchain. Inspired by the growing interest in NFTs, our goal is to provide creators with a new way to monetize and distribute their content. Our platform enables NFT-gated access to articles stored off-chain in IPFS, allowing users to purchase or obtain NFTs that grant them access to the corresponding articles.

We built MiDStackX using Solidity smart contracts and the ERC721 token standard to manage the creation and ownership of NFTs. Throughout development, we encountered various challenges, such as optimizing gas usage and implementing efficient IPFS integrations. However, we persevered and created a functional dapp that provides a new way for creators to share their content with the world.

Through building MiDStackX, we gained a great deal of knowledge and experience in smart contract development, NFTs, and IPFS integrations. We are excited to continue exploring these technologies and finding new ways to leverage NFTs for content monetization and distribution.

Looking forward, we plan to expand the platform to support a wider range of content types and to foster a community of creators and users who are passionate about sharing and accessing quality content.


#### Currently:
* Contract implementation & tests are ready for MVP, used for checking user access to a creator's content stream,
  Contract avalaible currently on 5ire chain at ```0xA33675D082ec4F4330ef3e08D55Bf96d28104411```
* Currently the articles/notes are going to be stored in a centralized manner (latency purposes)

### Running locally
```bash
# install packages
yarn
# run local chain
yarn chain
# deploy contract
yarn deploy
# start UI, should be avalaible at http://localhost:3000/
yarn start
```
