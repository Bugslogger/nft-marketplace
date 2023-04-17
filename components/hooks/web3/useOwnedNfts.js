import { ethers } from "ethers";
import useSWR from "swr";

/**
 *
 * @param {any} deps
 * @returns {(String|Promise)}
 */
export const hookFactory = (deps) => () => {
  const { contract } = deps;

  const { data, ...swr } = useSWR(
    contract ? "web3/useOwnedNfts" : null,
    async () => {
      const nft = [];
      const coreNfts = await contract?.getOwnedNfts();
      for (let i = 0; i < coreNfts.length; i++) {
        const item = coreNfts[i];
        const tokenURI = await contract?.tokenURI(item.tokenId);

        const metaResponse = await fetch(tokenURI);
        const meta = await metaResponse.json();

        nft.push({
          price: ethers.utils.formatEther(item.price),
          tokenURI: item.tokenId.toNumber(),
          creator: item.creator,
          isListed: item.isListed,
          meta,
        });
      }
      return nft;
    }
  );

  return {
    ...swr,
    data,
  };
};

/**
 * @param {any} param
 */
export const useOwnedNfts = hookFactory({ ethereum: null, provider: null });
