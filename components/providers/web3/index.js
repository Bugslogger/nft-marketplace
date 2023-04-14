import React, { createContext, useContext, useEffect, useState } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { createDefaultState, createWeb3State, loadContract } from "./utiles";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

const Web3Context = createContext(createDefaultState());

const Web3Provider = ({ children }) => {
  const [web3api, setweb3api] = useState(createDefaultState());

  useEffect(() => {
    const initWeb3 = async () => {
      const web3modal = new Web3Modal({
        cacheProvider: false,
      });

      try {
        const web3Connect = await web3modal.connect();

        // console.log(web3Connect);
        const provider = new ethers.providers.Web3Provider(web3Connect);

        const contract = await loadContract("NftMarket", provider);
        setGlobalListneres(window.ethereum);
        setweb3api(createWeb3State(window.ethereum, provider, contract, false));
      } catch (error) {
        console.error("Please, install web3 wallet");
        setweb3api((api) => {
          console.log("api: ", api);
          createWeb3State(api.ethereum, api.provider, api.contract, false);
        });
      }
    };
    initWeb3();

    return () => {
      removeGlobalListneres(window.ethereum);
    };
  }, []);

  const pageReload = () => {
    window.location.reload();
  };

  /**
   *
   * @param {MetaMaskInpageProvider} ethereum
   */
  const handleAccounts = async (ethereum) => {
    const isLocked = await ethereum._metamask.isUnlocked();

    if (!isLocked) {
      pageReload();
    }
  };

  /**
   *
   * @param {MetaMaskInpageProvider} ethereum
   */
  const setGlobalListneres = (ethereum) => {
    ethereum.on("chainChanged", pageReload);
    ethereum.on("accountsChanged", () => handleAccounts(ethereum));
  };

  /**
   *
   * @param {MetaMaskInpageProvider} ethereum
   */
  const removeGlobalListneres = (ethereum) => {
    ethereum?.removeListener("chainChanged", pageReload);
    ethereum?.removeListener("chainChaccountsChangedanged", () =>
      handleAccounts(ethereum)
    );
  };

  return (
    <Web3Context.Provider value={web3api}>{children}</Web3Context.Provider>
  );
};

export function useWeb3() {
  return useContext(Web3Context);
}

export const useHooks = () => {
  const data = useWeb3();
  // debugger;
  return data?.hooks;
};

export default Web3Provider;
