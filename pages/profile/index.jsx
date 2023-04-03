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
import React from "react";
import data from "@/components/ui/content/meta.json";

const Profile = () => {
  const [value, setValue] = React.useState(0);

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
              {data.map((image) => (
                <Card sx={{ maxWidth: 200, my: 4, mr: 2 }}>
                  <CardMedia
                    sx={{ height: 200, width: 200 }}
                    image={image.image}
                    title="my-NFT"
                  />
                </Card>
              ))}
            </Container>
          </Container>
        </Grid>
        <Grid container xs={4}>
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
                  sx={{ height: 350, width: 350, mt: 3, borderRadius: 2 }}
                  image="https://eincode.mypinata.cloud/ipfs/QmaQYCrX9Fg2kGijqapTYgpMXV7QPPzMwGrSRfV9TvTsfM/Creature_1.png"
                />
              </Box>
              <CardContent>
                <Typography
                  sx={{ fontWeight: "600" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Eincode Creature #1
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={"bold"}
                  color="text.secondary"
                >
                  Fierce violet creature. Very durable and tanky.
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
                  <ListItem
                    sx={{ borderBottom: "1px solid grey" }}
                    secondaryAction="100"
                  >
                    <ListItemText>Health</ListItemText>
                  </ListItem>
                  <ListItem
                    secondaryAction="100"
                    sx={{ borderBottom: "1px solid grey" }}
                  >
                    <ListItemText>Attack</ListItemText>
                  </ListItem>
                  <ListItem
                    sx={{ borderBottom: "1px solid grey" }}
                    secondaryAction="100"
                  >
                    <ListItemText>Speed</ListItemText>
                  </ListItem>
                </List>
                <Grid container sx={{ pt: 2 }}>
                  <Grid xs={5} mx={"auto"}>
                    <Button variant="contained" fullWidth sx={{ px: 4 }}>
                      Download
                    </Button>
                  </Grid>
                  <Grid xs={5} mx={"auto"}>
                    <Button variant="outlined" fullWidth sx={{ px: 4 }}>
                      Tranfer
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Container>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

export default Profile;
