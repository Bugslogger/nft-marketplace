import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import React from "react";

const settings = [
  { name: "Profile", link: "/profile", current: true },
  { name: "Logout", link: "/", current: false },
];

const Index = ({ connect, isLoading, isInstalled, account }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  if (isLoading) {
    return <Button variant="contained">Loading...</Button>;
  }

  if (account) {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="https://eincode.mypinata.cloud/ipfs/QmaQYCrX9Fg2kGijqapTYgpMXV7QPPzMwGrSRfV9TvTsfM/Creature_1.png" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{account.slice(0,5)}...{account.slice(-4)}</Typography>
          </MenuItem>
          {settings.map((setting) => (
            <Link key={setting.name} href={setting.link}>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting.name}</Typography>
              </MenuItem>
            </Link>
          ))}
        </Menu>
      </Box>
    );
  }

  if (!isInstalled) {
    return (
      <Button
        onClick={() => window.open("https://metamask.io")}
        variant="contained"
      >
        No Wallet
      </Button>
    );
  } else {
    <Button onClick={connect} variant="contained">
      Connect
    </Button>;
  }
};

export default Index;

{
  /* {isConnected ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <Link key={setting.name} href={setting.link}>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          {setting.name}
                        </Typography>
                      </MenuItem>
                    </Link>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Button onClick={account.connect} variant="contained">
                Connect
              </Button>
            )} */
}
