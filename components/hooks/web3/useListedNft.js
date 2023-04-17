import { ethers } from "ethers";
import { useCallback } from "react";
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

  const _contract = contract;
  const buyNft = useCallback(
    async (tokenId, value) => {
      let Nftvalue = value.toString();
      const price = ethers.utils.parseEther(Nftvalue).toString();
      console.log(typeof price, price);
      try {
        const result = await _contract?.buyNft(tokenId, {
          value: price,
        });

        await result?.wait();

        alert("You have bought Nft. See profile page.");
      } catch (e) {
        console.error(e.message);
      }
    },
    [_contract]
  );

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
