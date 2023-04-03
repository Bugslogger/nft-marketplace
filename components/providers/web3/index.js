import React, { createContext, useContext, useEffect, useState } from "react";
import { createDefaultState } from "./utiles";
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

      const web3Connect = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(web3Connect);
      setweb3api({
        ethereum: web3Connect,
        contract: null,
        isLoading: true,
        provider,
      });
    };
    initWeb3();
  }, []);
  return (
    <Web3Context.Provider value={web3api}>{children}</Web3Context.Provider>
  );
};

export function useWeb3() {
  return useContext(Web3Context);
}

export default Web3Provider;
