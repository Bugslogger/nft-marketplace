import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Header from "../Header";

const BaseLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Box padding={1}>
        {/* <Container maxWidth="sm"> */}
        {children}
        {/* </Container> */}
      </Box>
    </>
  );
};

export default BaseLayout;
