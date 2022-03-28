// https://eth-ropsten.alchemyapi.io/v2/qYIQ5qzGrRMXRbnU7KdM03JPR3jZK5U-

require('@nomiclabs/hardhat-waffle');
require('dotenv').config()

const alchemyUrl = process.env.ALCHEMY_URL
const maskAccount = process.env.METAMASK_ACC

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: alchemyUrl,
      accounts: [ maskAccount ]
    }
  }
}