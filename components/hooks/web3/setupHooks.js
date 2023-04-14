import { hookFactory as createAccount, useAccountHook } from "./useAccounts";
import { hookFactory as createNetwork, useNetworkHook } from "./useNetwork";

export const web3Hooks = {
  useAccounts: useAccountHook,
  useNetwork: useNetworkHook,
};

console.warn("a4", useAccountHook);
console.warn("n4", useNetworkHook);

/**
 *
 * @param {web3Hooks} deps
 * @returns
 */
export const setupHooks = (deps) => {
console.warn("n5", deps);
  
  return {
    useAccount: createAccount(deps),
    useNetwork: createNetwork(deps),
  };
};
