import { Box, Container, Typography } from "@mui/material";
import React from "react";
import NftItem from "../Item";
import metaData from "../../content/meta.json";

const NftList = () => {
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
      <Box sx={{display: "flex"}}>
        {metaData.map((value, index) => {
          return <NftItem data={value} key={index} />;
        })}
      </Box>
    </Container>
  );
};

export default NftList;
