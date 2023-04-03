import { useWeb3 } from "@provider/web3";
import { BaseLayout, NftList } from "@ui";

export default function Home() {
  const { provider } = useWeb3();

  const getAccounts = async () => {
    const account = await provider.listAccounts();
    console.log("Account: ", account[0]);
  };

  if (provider) {
    getAccounts();
  }

  return (
    <BaseLayout>
      <NftList />
    </BaseLayout>
  );
}
