import { BaseLayout } from "@ui";
import {
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Switch,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import React, { useState } from "react";
import { Box } from "@mui/joy";

const label = { inputProps: { "aria-label": "Switch demo" } };

const create = () => {
  const [toggle, settoggle] = useState(false);

  const ChangeForm = () => {
    settoggle(!toggle);
  };

  return (
    <BaseLayout>
      <Grid container mt={5} spacing={1}>
        <Grid item xs={4}>
          <Container maxWidth="sm">
            <Link
              underline="always"
              fontSize={16}
              fontWeight={600}
              color={"inherit"}
            >
              Do you have metadata already?
              <Switch onChange={ChangeForm} {...label} sx={{ ml: 2 }} />
            </Link>
            {!toggle ? (
              <Box marginTop={2}>
                <Typography variant="h5" component={"div"}>
                  Create NFT Metadata
                </Typography>
                <Typography
                  fontSize={13}
                  color={"text.secondary"}
                  variant="body1"
                  component={"div"}
                >
                  This information will be displayed publicly so be careful what
                  you share.
                </Typography>
              </Box>
            ) : (
              <Box marginTop={2}>
                <Typography variant="h5" component={"div"}>
                  List NFT
                </Typography>
                <Typography
                  fontSize={13}
                  color={"text.secondary"}
                  variant="body1"
                  component={"div"}
                >
                  This information will be displayed publicly so be careful what
                  you share.
                </Typography>
              </Box>
            )}
          </Container>
        </Grid>
        <Grid item xs={8}>
          <Container>
            <Card>
              {!toggle ? (
                <CardContent>
                  <Typography>Name</Typography>
                  <TextField
                    fullWidth
                    sx={{ my: 1 }}
                    id="outlined-basic"
                    label="NFT Name"
                    variant="outlined"
                  />
                  <Typography>Description</Typography>
                  <Textarea
                    disabled={false}
                    sx={{ my: 1 }}
                    minRows={4}
                    placeholder="Some NFT description"
                    size="md"
                    variant="outlined"
                  />
                  <Typography>Brief description of NFT</Typography>
                  <Typography sx={{ mt: 2, mb: 1 }}>Cover Photo</Typography>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="NFT Name"
                    variant="outlined"
                  />
                  <Grid
                    spacing={0}
                    container
                    direction={"row"}
                    sx={{ flexGrow: 1, my: 1 }}
                  >
                    <Grid xs={3} sx={{ mt: 1 }}>
                      <Typography>Health</Typography>
                      <TextField
                        fullWidth
                        sx={{ my: 1 }}
                        id="outlined-basic"
                        label="Health"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid xs={3} marginX={3} sx={{ mt: 1 }}>
                      <Typography>Attack</Typography>
                      <TextField
                        fullWidth
                        sx={{ my: 1 }}
                        id="outlined-basic"
                        label="Attack"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid xs={3} sx={{ mt: 1 }}>
                      <Typography>Speed</Typography>
                      <TextField
                        fullWidth
                        sx={{ my: 1 }}
                        id="outlined-basic"
                        label="Speed"
                        variant="outlined"
                      />
                    </Grid>
                    <Typography
                      fontWeight={600}
                      fontSize={14}
                      color={"text.secondary"}
                    >
                      Choose value from 0 to 100
                    </Typography>
                  </Grid>
                </CardContent>
              ) : (
                <CardContent>
                  <Typography>URI link</Typography>
                  <TextField
                    fullWidth
                    sx={{ my: 1 }}
                    id="outlined-basic"
                    //   label="NFT Name"
                    placeholder="https://link.com/data.json"
                    variant="outlined"
                  />
                  <Typography sx={{ mt: 2, mb: 1 }}>Price (ETH)</Typography>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    //   label="NFT Name"
                    placeholder="0.8"
                    variant="outlined"
                  />
                </CardContent>
              )}
              <CardContent sx={{ textAlign: "end" }}>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ textTransform: "capitalize" }}
                >
                  Save
                </Button>
              </CardContent>
            </Card>
          </Container>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

export default create;
