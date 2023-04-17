import { BaseLayout } from "@ui";
import {
  Box,
  Card,
  CardContent,
  Container,
  ListItemText,
  Grid,
  ListItem,
  CardMedia,
  Tab,
  Button,
  List,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useOwnedNfts } from "@hooks/web3";
// import data from "@/components/ui/content/meta.json";

const Profile = () => {
  const [value, setValue] = React.useState(0);
  const { ownedNfts } = useOwnedNfts();
  const [singleNft, setsingleNft] = React.useState();

  useEffect(() => {
    if (ownedNfts?.data && ownedNfts?.data?.length > 0) {
      setsingleNft(ownedNfts?.data[0]);
      console.log(ownedNfts);
      return;
    }
    setsingleNft();
  }, [ownedNfts?.data]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BaseLayout>
      <Grid container marginTop={5} px={5}>
        <Grid xs={8}>
          <Container>
            <Box>
              <Typography variant="h4" fontWeight={600} component={"div"}>
                Your NFTs
              </Typography>
            </Box>
            <Box sx={{ width: "100%", bgcolor: "background.paper", mt: 3 }}>
              <Tabs value={value} onChange={handleChange}>
                <Tab label="Your Collection" />
              </Tabs>
            </Box>
            <Container
              fixed
              maxWidth=""
              sx={{ display: "flex", flexWrap: "wrap" }}
            >
              {ownedNfts?.data?.map((image) => (
                <Card
                  onClick={() => setsingleNft(image)}
                  sx={{
                    maxWidth: 200,
                    my: 4,
                    mr: 2,
                    cursor: "pointer",
                    border:
                      image.tokenURI === singleNft?.tokenURI
                        ? "4px solid purple"
                        : "4px solid transparent",
                  }}
                >
                  <CardMedia
                    sx={{ height: 200, width: 200 }}
                    image={image.meta.image}
                    title={image.meta.name}
                  />
                </Card>
              ))}
            </Container>
          </Container>
        </Grid>
        <Grid container xs={4}>
          {singleNft && (
            <Container>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <Box mx={"auto"}>
                  <CardMedia
                    sx={{ height: 350, width: 350, mt: 2, borderRadius: 2 }}
                    image={singleNft?.meta?.image}
                  />
                </Box>
                <CardContent>
                  <Typography
                    sx={{ fontWeight: "600" }}
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {singleNft?.meta?.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={"bold"}
                    color="text.secondary"
                  >
                    {singleNft?.meta?.description}
                  </Typography>
                  <List sx={{ mt: 2 }}>
                    <Typography
                      variant="h6"
                      component={"div"}
                      fontWeight={600}
                      borderBottom={1}
                      borderColor={"dimgray"}
                      py={1}
                    >
                      Information
                    </Typography>
                    {singleNft?.meta?.attributes.map((value, index) => {
                      // console.log(singleNft);
                      return (
                        <ListItem
                          key={index}
                          sx={{ borderBottom: "1px solid grey" }}
                          secondaryAction={value?.value}
                        >
                          <ListItemText>{value?.trait_type}</ListItemText>
                        </ListItem>
                      );
                    })}
                  </List>
                  <Grid container sx={{ pt: 2 }}>
                    <Grid xs={5} mx={"auto"}>
                      <Button variant="contained" fullWidth sx={{ px: 4 }}>
                        Download
                      </Button>
                    </Grid>
                    <Grid xs={5} mx={"auto"}>
                      <Button
                        disabled={singleNft.isListed}
                        variant="outlined"
                        onClick={() =>
                          ownedNfts?.ListNft(
                            singleNft.tokenURI,
                            singleNft.price
                          )
                        }
                        fullWidth
                        sx={{ px: 4 }}
                      >
                        {singleNft.isListed ? "Listed" : "List Nft"}
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Container>
          )}
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

export default Profile;
