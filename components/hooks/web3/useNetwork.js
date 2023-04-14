import useSWR from "swr";

const NETWORKS = {
  1: "Ethereum Main Network",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  42: "Kovan Test Network",
  56: "Binance Smart Chain",
  1337: "Ganache",
};

const targetId = process.env.NEXT_PUBLIC_TARGET_CHAIN_ID;
const TargetNetwork = NETWORKS[targetId];

/**
 *
 * @param {any} deps
 * @returns {(String|Promise)}
 */
export const hookFactory = (deps) => () => {
  const { provider, isLoading } = deps;
  const { data, isValidating, ...swr } = useSWR(
    provider ? "web3/useNetworks" : null,
    async () => {
      const chainId = (await provider?.getNetwork()).chainId;

      if (!chainId) {
        throw "Cannot retreive network. Please, refresh browser or connect to other one.";
      }

      return NETWORKS[chainId];
    },
    {
      revalidateOnFocus: false,
    }
  );
  return {
    ...swr,
    data,
    TargetNetwork,
    isSupported: data === TargetNetwork,
    isValidating,
    isLoading: isLoading,
  };
};

/**
 * @param {any} param
 */
export const useNetworkHook = hookFactory({ ethereum: null, provider: null });
console.warn("n3", useNetworkHook);
