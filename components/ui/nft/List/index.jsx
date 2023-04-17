import { Box, Container, Typography } from "@mui/material";
import React from "react";
import NftItem from "../Item";
// import metaData from "../../content/meta.json";
import { useListedNfts } from "@hooks/web3";

const NftList = () => {
  const { listedNft } = useListedNfts();

  return (
    <Container>
      <Box textAlign={"center"} my={5}>
        <Typography variant="h4" component={"div"}>
          Amazing Creatures NFTs
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Mint a NFT to get unlimited ownership forever!
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        {listedNft?.data?.map((value, index) => {
          return <NftItem data={value} key={index} buyNft={listedNft.buyNft} />;
        })}
      </Box>
    </Container>
  );
};

export default NftList;
