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
  Avatar,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import React, { useState } from "react";
import { Box } from "@mui/joy";
import axios from "axios";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Image from "next/image";
import { useWeb3 } from "@provider";

const label = { inputProps: { "aria-label": "Switch demo" } };

const create = () => {
  const { ethereum } = useWeb3();
  const [toggle, settoggle] = useState(false);
  const [nftMeta, setnftMeta] = useState({
    name: "",
    description: "",
    image: "",
    attributes: [
      { trait_type: "attack", value: "0" },
      { trait_type: "health", value: "0" },
      { trait_type: "speed", value: "0" },
    ],
  });

  const ChangeForm = () => {
    settoggle(!toggle);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setnftMeta({ ...nftMeta, [name]: value });
  };

  const CreateNft = async () => {
    try {
      const messageToSign = await axios.get("/api/verify");
      const accounts = await ethereum?.request({
        method: "eth_requestAccounts",
      });

      const account = accounts[0];

      const signedData = await ethereum?.request({
        method: "personal_sign",
        params: [
          JSON.stringify(messageToSign.data),
          account,
          messageToSign.data.id,
        ],
      });

      await axios.post("/api/verify", {
        address: account,
        signature: signedData,
        nft: nftMeta,
      });

      console.log(signedData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAttributeChange = (e) => {
    const { name, value } = e.target;

    const attributeIdx = nftMeta.attributes.findIndex(
      (attr) => attr.trait_type === name
    );

    nftMeta.attributes[attributeIdx].value = value;

    setnftMeta({
      ...nftMeta,
      attributes: nftMeta.attributes,
    });
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
                    name="name"
                    value={nftMeta.name}
                    onChange={handleChange}
                    variant="outlined"
                  />
                  <Typography>Description</Typography>
                  <Textarea
                    disabled={false}
                    onChange={handleChange}
                    sx={{ my: 1 }}
                    value={nftMeta.description}
                    name="description"
                    minRows={4}
                    placeholder="Some NFT description"
                    size="md"
                    variant="outlined"
                  />
                  <Typography>Brief description of NFT</Typography>
                  <Typography sx={{ mt: 2, mb: 1 }}>Cover Photo</Typography>
                  {true ? (
                    <Box
                      fullWidth
                      height={200}
                      border={"1px dashed rgba(80,80,80,0.3)"}
                      borderRadius={8}
                      onClick={() =>
                        document.getElementById("uploadImage").click()
                      }
                      value={nftMeta.image}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        cursor: "pointer",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                      id="outlined-basic"
                      label="NFT Name"
                      name="image"
                      variant="outlined"
                    >
                      <AddPhotoAlternateIcon
                        color="disabled"
                        sx={{ fontSize: "40px" }}
                      />
                      <Typography color={"rgba(80,80,80,0.5)"}>
                        Upload Nft Image
                      </Typography>
                      <input
                        id="uploadImage"
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                      />
                    </Box>
                  ) : (
                    <Box
                      fullWidth
                      height={200}
                      my={4}
                      borderRadius={8}
                      // onChange={handleChange}
                      value={nftMeta.image}
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                      id="outlined-basic"
                      label="NFT Name"
                      name="image"
                      variant="outlined"
                    >
                      <Image
                        style={{ borderRadius: "4px" }}
                        width={200}
                        height={200}
                        alt="Creature_1.png"
                        src="/Creature_1.png"
                      />
                    </Box>
                  )}
                  <Grid
                    spacing={0}
                    container
                    direction={"row"}
                    sx={{ flexGrow: 1, my: 1 }}
                  >
                    {/* <Grid xs={3} sx={{ mt: 1 }}>
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
                    </Grid> */}
                    {nftMeta.attributes.map((value) => {
                      return (
                        <Grid xs={3} marginX={1} sx={{ mt: 1 }}>
                          <Typography sx={{ textTransform: "capitalize" }}>
                            {value.trait_type}
                          </Typography>
                          <TextField
                            fullWidth
                            onChange={handleAttributeChange}
                            sx={{ my: 1 }}
                            id="outlined-basic"
                            name={value.trait_type}
                            label={value.trait_type}
                            variant="outlined"
                          />
                        </Grid>
                      );
                    })}
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
                  onClick={CreateNft}
                  sx={{ textTransform: "capitalize" }}
                >
                  List
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
