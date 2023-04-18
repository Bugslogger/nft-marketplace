import { withIronSessionApiRoute } from "iron-session/next";
import contract from "../../public/contracts/NftMarket.json";

const targetNetwork = process.env.NEXT_PUBLIC_NETWORK_ID;
debugger;
export const contractAddress = contract["networks"][targetNetwork]["address"];
debugger;

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
