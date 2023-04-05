import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, providers } from "ethers";
import { ethers } from "ethers";
import { setupHooks } from "@hooks";
//debugger;
export const createDefaultState = () => {
  return {
    ethereum: null,
    provider: null,
    contract: null,
    isLoading: true,
    hooks: setupHooks({}),
  };
};
//debugger;

/**
 *
 * @param {MetaMaskInpageProvider} ethereum
 * @param {providers.Web3Provider} provider
 * @param {Contract} contract
 * @param {Boolean} isLoading
 * @returns {Object}
 */
//debugger;
export const createWeb3State = (ethereum, provider, contract, isLoading) => {
  return {
    ethereum,
    provider,
    contract,
    isLoading,
    hooks: setupHooks({ ethereum, provider, contract }),
  };
};
//debugger;

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;
//debugger;

/**
 *
 * @param {String} name
 * @param {String} provider
 * @returns {Promise}
 */
export const loadContract = async (name, provider) => {
  //debugger;
  console.log("contract3: ", name, provider);
  //debugger;
  if (!NETWORK_ID) {
    console.log("Network ID not defined: ", NETWORK_ID);
    return Promise.reject("Network ID not defined");
  }
  //debugger;
  console.log("contract4: ", name, provider);
  //debugger;
  const res = await fetch(`/contracts/${name}.json`);
  console.log("contract5: ", res);
  //debugger;
  const Artifact = await res.json();
  console.log("contract6: ", Artifact);
  console.log("contract7: ", Artifact.networks);
  //debugger;
  if (Artifact.networks[NETWORK_ID].address) {
    const contract = new ethers.Contract(
      Artifact.networks[NETWORK_ID].address,
      Artifact.abi,
      provider
    );
    console.log("contract8: ", contract);
    //debugger;
    return contract;
  } else {
    //debugger;
    return Promise.reject(`Contract ${name}: contract is not loaded.`);
  }
};
//debugger;
