import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import contract from "../../public/contracts/NftMarket.json";
import { ethers } from "ethers";
import * as util from "ethereumjs-util";

const targetNetwork = process.env.NEXT_PUBLIC_NETWORK_ID;
export const contractAddress = contract["networks"][targetNetwork]["address"];
const abi = contract.abi;

// PINATA KEYS
export const pinataApiKey = process.env.PINATA_API_KEY;
export const pinataApiSecretKey = process.env.PINATA_API_SECRET_KEY;
export const JWTtoken = process.env.JWT;

/**
 *
 * @param {any} handler
 * @returns
 */
export function withSession(handler) {
  return withIronSessionApiRoute(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "nft-auth-session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  });
}

export const addressCheckMiddleware = (req, res) => {
  return new Promise(async (resolve, reject) => {
    const message = req.session["message-session"];
    const provider = new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:7545"
    );
    const contract = new ethers.Contract(contractAddress, abi, provider);

    let nonce =
      "\x19Ethereum Signed Message:\n" +
      JSON.stringify(message).length +
      JSON.stringify(message);
    nonce = util.keccak(Buffer.from(nonce, "utf-8"));
    const { v, r, s } = util.fromRpcSig(req.body.signature);
    const pubKey = util.ecrecover(util.toBuffer(nonce), v, r, s);
    const addrBuffer = util.pubToAddress(pubKey);
    const address = util.bufferToHex(addrBuffer);

    console.log(address);
    if (address === req.body.address) {
      resolve("Correct Address");
    } else {
      reject("Wrong Address");
    }
  });
};
