import { useHooks } from "@/components/providers/web3";

export const useAccount = () => {
  const hooks = useHooks();
  const swrRes = hooks?.useAccount();
  console.warn("a5", swrRes);

  return {
    account: swrRes,
  };
};

export const useNetwork = () => {
  const hooks = useHooks();
  const swrRes = hooks?.useNetwork();
  console.warn("n6", swrRes);

  return {
    network: swrRes,
  };
};
