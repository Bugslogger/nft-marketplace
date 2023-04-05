import { hookFactory as createAccount, useAccounts } from "./useAccounts";

export const web3Hooks = {
  useAccounts,
};

/**
 *
 * @param {web3Hooks} deps
 * @returns
 */
export const setupHooks = (deps) => {
  return {
    useAccount: createAccount(deps),
  };
};
