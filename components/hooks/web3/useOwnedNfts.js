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

  const _contract = contract;
  const ListNft = useCallback(async (tokenId, price) => {
    try {
      const result = await _contract?.placeNftOnSale(
        tokenId,
        ethers.utils.parseEther(price.toString()),
        {
          value: ethers.utils.parseEther((0.025).toString()),
        }
      );

      await result?.wait();

      alert("Nft is listed.");
    } catch (e) {
      console.error(e.message);
    }
  }, [_contract]);

  return {
    ...swr,
    data,
    ListNft,
  };
};

/**
 * @param {any} param
 */
export const useOwnedNfts = hookFactory({ ethereum: null, provider: null });
