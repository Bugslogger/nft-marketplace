import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Link from "next/link";
import { useAccount, useNetwork } from "@hooks/web3";
import { WalletBar } from "@ui";

import Chip from "@mui/material/Chip";

const pages = [
  { name: "Marketplace", link: "/", current: true },
  { name: "Create", link: "/nft/create", current: false },
];

const HeaderTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function Header() {
  const { network } = useNetwork();
  const { account } = useAccount();

  // const { data } = hooks.useAccount("this is test.");
  console.log("Loading: ", network?.data, account);

  //debugger

  //debugger
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <ThemeProvider theme={HeaderTheme}>
      <AppBar position="static" enableColorOnDark color="inherit">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#000",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                // color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <Link key={page.name} href={page.link}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link key={page.name} href={page.link}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "#000", display: "block" }}
                  >
                    {page.name}
                  </Button>
                </Link>
              ))}
            </Box>

            <Chip
              variant="outlined"
              color="success"
              label={
                network.isLoading
                  ? "Loading..."
                  : account.isInstalled
                  ? network.data
                  : "Install Web3 Wallet"
              }
              sx={{ padding: "5px 10px", marginX: "10px" }}
              avatar={
                <Typography
                  sx={{
                    width: "10px !important",
                    height: "10px !important",
                    borderRadius: "50%",
                    padding: "0px",
                    background: "green",
                  }}
                  className=""
                ></Typography>
              }
            />

            <WalletBar
              connect={account.connect}
              isLoading={account.isLoading}
              isInstalled={account.isInstalled}
              account={account?.data}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default Header;
