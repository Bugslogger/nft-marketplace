import { useWeb3 } from "@provider/web3";
import { BaseLayout, NftList } from "@ui";

export default function Home() {
  // const { provider, contract } = useWeb3();

  // console.log("contract: ", contract);
  // console.log("provider: ", provider);

  // const getNftInfo = async () => {
  //   const name = await contract.name();
  //   const symbol = await contract.symbol();
  //   console.log("name: ", name, symbol);
  // };

  // const getAccounts = async () => {
  //   const account = await provider?.listAccounts();
  // };

  // if (provider) {
  //   getAccounts();
  //   getNftInfo();
  // }

  return (
    <BaseLayout>
      <NftList />
    </BaseLayout>
  );
}
