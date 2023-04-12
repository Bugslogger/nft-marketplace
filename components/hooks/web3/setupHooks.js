import { hookFactory as createAccount, useAccountHook } from "./useAccounts";
import { hookFactory as createNetwork, useNetworkHook } from "./useNetwork";

export const web3Hooks = {
  useAccounts: useAccountHook,
  useNetwork: useNetworkHook,
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
  };
};
