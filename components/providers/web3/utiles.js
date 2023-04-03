// import { MetaMaskInpageProvider } from "@metamask/providers";
// import { Provider, Contract } from "ethers";

export const createDefaultState = () => {
  return {
    ethereum: null,
    provider: null,
    contract: null,
    isLoading: true,
  };
};
