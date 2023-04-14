import { useEffect } from "react";
import useSWR from "swr";

/**
 *
 * @param {any} deps
 * @returns {(String|Promise)}
 */
export const hookFactory = (deps) => () => {
  const { provider, ethereum, isLoading } = deps;
  console.warn("a1", deps);

  const { data, mutate, isValidating, ...swr } = useSWR(
    provider ? "web3/useAccounts" : null,
    async () => {
      const accounts = await provider?.listAccounts();
      const account = accounts[0];
      console.warn("a2", provider);

      if (!account) {
        throw "Connot retreive account! Please connect to wallet.";
      }

      return account;
    },
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  useEffect(() => {
    ethereum?.on("accountsChanged", handleAcountChanged);

    return () => {
      ethereum?.removeListener("accountsChanged", handleAcountChanged);
    };
  });

  /**
   *
   * @param  {unknown[]} args
   */
  const handleAcountChanged = (...args) => {
    const accounts = args[0];

    if (accounts.length === 0) {
      console.error("Please, connect to web3 wallet");
    } else if (accounts[0] !== data) {
      mutate(accounts[0]);
    }
  };

  const connect = async () => {
    try {
      ethereum?.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.error("Account Request Error: ", error);
    }
  };
  return {
    ...swr,
    data,
    mutate,
    isValidating,
    connect,
    isLoading: isLoading,
    isInstalled: ethereum?.isMetaMask || false,
  };
};

/**
 * @param {any} param
 */
export const useAccountHook = hookFactory({ ethereum: null, provider: null });
