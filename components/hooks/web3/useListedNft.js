import { ethers } from "ethers";
import useSWR from "swr";

/**
 *
 * @param {any} deps
 * @returns {(String|Promise)}
 */
export const hookFactory = (deps) => () => {
  const { contract } = deps;
  //   console.warn("a1", deps);

  const { data, ...swr } = useSWR(
    contract ? "web3/useListedNfts" : null,
    async () => {
      const nft = [];
      const coreNfts = await contract?.getAllNftsOnSale();

      for (let i = 0; i < coreNfts.length; i++) {
        const item = coreNfts[i];
        const tokenURI = await contract?.tokenURI(item.tokenId);

        const metaResponse = await fetch(tokenURI);
        const meta = await metaResponse.json();

        nft.push({
          price: parseFloat(ethers.utils.formatEther(item.price)),
          tokenURI: item.tokenId.toNumber(),
          creator: item.creator,
          isListed: item.isListed,
          meta,
        });
      }

      return nft;
    }
  );

  /**
   *
   * @param {number} tokenId
   * @param {number} value
   */

  const buyNft = async (tokenId, value) => {
    const price = ethers.utils.parseEther(value.toString())
    console.log(typeof price, price);
    try {
      await contract?.buyNft(tokenId, {
        value: price,
      });

      alert("You have bought Nft. See profile page.");
    } catch (e) {
      console.error(e.message);
    }
  };

  return {
    ...swr,
    data: data || [],
    buyNft,
  };
};

/**
 * @param {any} param
 */
export const useListedNftHook = hookFactory({ ethereum: null, provider: null });
