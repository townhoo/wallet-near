const nearAPI = require("near-api-js");
const fs = require('fs')

const { connect,keyStores, KeyPair} = nearAPI;
const keyStore = new keyStores.InMemoryKeyStore();
const PRIVATE_KEY =
    "PRIVATEKEY";

const config = {
    networkId: "mainnet",
    keyStore,
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://wallet.mainnet.near.org",
    helperUrl: "https://helper.mainnet.near.org",
    explorerUrl: "https://explorer.mainnet.near.org",
};

var i ;

async function get_account(i) {
    const keyPair = KeyPair.fromString(PRIVATE_KEY);
    await keyStore.setKey("mainnet", 'monstopia.near', keyPair);
    const near = await connect(config);
    const account = await near.account('monstopia.near');
    const newKeyPair = KeyPair.fromRandom('ed25519');
    const publicKey = newKeyPair.publicKey.toString();
    const secretKey = newKeyPair.secretKey
    const name_account = `monstest${i}.monstopia.near`
    console.log(secretKey);
    const datasecret = `ชื่อaccount ${name_account} secretkey ${secretKey} \n`
    await fs.appendFile("myFile/monstest.txt",datasecret,err=>{
        if (err) return console.log(err);
    })
    const id = await account.createAccount(
        name_account,
        publicKey,
        "3000000000000000000000"
    );
        return id
}


async function start() {
    for (i=1; i<=1; i++) {
        console.log(await get_account(i));
    } 
}
start().finally