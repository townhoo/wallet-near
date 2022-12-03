const nearAPI = require("near-api-js");
const fs = require('fs')

const { connect,keyStores, KeyPair} = nearAPI;
const keyStore = new keyStores.InMemoryKeyStore();
const PRIVATE_KEY =
    "PRIVATEKEY";

const config = {
    networkId: "testnet",
    keyStore,
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org"
};

var i ;

async function get_account(i) {
    const keyPair = KeyPair.fromString(PRIVATE_KEY);
    await keyStore.setKey("testnet", 'mutu.testnet', keyPair);
    const near = await connect(config);
    const account = await near.account('mutu.testnet');
    const newKeyPair = KeyPair.fromRandom('ed25519');
    const publicKey = newKeyPair.publicKey.toString();
    const secretKey = newKeyPair.secretKey
    const name_account = `sub${i}.mutu.testnet`
    console.log(secretKey);
    const datasecret = `ชื่อaccount ${name_account} secretkey ${secretKey} \n`
    await fs.appendFile("myFile/Datasecrettest.txt",datasecret,err=>{
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
    for (i=1; i<=2; i++) {
        console.log(await get_account(i));
    } 
}
start().finally