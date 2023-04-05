import useSWR from "swr";

/**
 *
 * @param {any} deps
 * @returns {(String|Promise)}
 */
export const hookFactory = (deps) => (params) => {
  const swrRes = useSWR("web3/useAccounts", () => {
    console.log(deps);
    console.log(params);
    return "Test User";
  });

  return swrRes;
};

/**
 * @param {any} param 
 */
export const useAccounts = hookFactory({ ethereum: null, provider: null });
