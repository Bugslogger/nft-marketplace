import React, { createContext, useContext, useEffect, useState } from "react";
import { createDefaultState, createWeb3State, loadContract } from "./utiles";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { setupHooks } from "@hooks";

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
      const contract = await loadContract("NftMarket", provider);

      console.log("contract2: ", contract);
      debugger;
      setweb3api(createWeb3State(window.ethereum, provider, contract, false));
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
