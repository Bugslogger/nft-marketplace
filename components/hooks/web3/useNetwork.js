import useSWR from "swr";

/**
 *
 * @param {any} deps
 * @returns {(String|Promise)}
 */
export const hookFactory = (deps) => () => {
  const { provider, isLoading } = deps;

  const { data, isValidating, ...swr } = useSWR(
    provider ? "web3/useNetwork" : null,
    async () => {
      return "Testing Network";
    },
    {
      revalidateOnFocus: false,
    }
  );

  return {
    data,
    ...swr,
    isValidating,
    isLoading: isLoading || isValidating,
  };
};

/**
 * @param {any} param
 */
export const useNetworkHook = hookFactory({ ethereum: null, provider: null });
