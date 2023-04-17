import { hookFactory as createAccount, useAccountHook } from "./useAccounts";
import { hookFactory as createNetwork, useNetworkHook } from "./useNetwork";
import { hookFactory as createOwnedNfts, useOwnedNfts } from "./useOwnedNfts";
import {
  hookFactory as createListedNft,
  useListedNftHook,
} from "./useListedNft";

export const web3Hooks = {
  useAccounts: useAccountHook,
  useNetwork: useNetworkHook,
  useListedNft: useListedNftHook,
  useOwnedNft: useOwnedNfts,
};

/**
 *
 * @param {web3Hooks} deps
 * @returns
 */
export const setupHooks = (deps) => {
  return {
    useAccount: createAccount(deps),
    useNetwork: createNetwork(deps),
    useListedNfts: createListedNft(deps),
    useOwnedNft: createOwnedNfts(deps),
  };
};
