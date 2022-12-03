const nearAPI = require("near-api-js");

const { connect } = nearAPI;

const config = {
  networkId: "mainnet",
  nodeUrl: "https://rpc.mainnet.near.org",
  walletUrl: "https://wallet.mainnet.near.org",
  helperUrl: "https://helper.mainnet.near.org",
  explorerUrl: "https://explorer.mainnet.near.org",
};

async function get_balance(accountID) {
    const near = await connect(config);
    const account = await near.account(accountID);
    const money = await account.getAccountBalance();
    return money
}

async function get_detail(accountID) {
    const near = await connect(config);
    const account = await near.account(accountID);
    const money = await account.getAccountDetails();
    return money
}


async function start(account) {
    console.log(await get_detail(account));
    console.log(await get_balance(account));
}

start('name.near')