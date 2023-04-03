import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function NftItem({ data }) {
  return (
    <Card sx={{ maxWidth: 340, mx: 2 }}>
      <CardMedia sx={{ height: 340 }} image={data.image} title="green iguana" />
      <CardContent sx={{ px: 4 }}>
        <Typography mb={0.5} fontSize={"small"} color="blue">
          Creatures NFT
        </Typography>
        <Typography
          sx={{ fontWeight: "600" }}
          gutterBottom
          variant="h6"
          component="div"
        >
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
        <CardActions sx={{ mt: 1.5, p: 0, mb: 1 }}>
          <Box mr={2}>
            <Typography sx={{ fontWeight: "800" }} color={""}>
              100ETH
            </Typography>
            <Typography
              sx={{ display: "flex", justifyContent: "center" }}
              variant="body2"
              color="text.secondary"
              fontWeight={"bold"}
            >
              price
              <img
                width={"20px"}
                src="https://raw.githubusercontent.com/Jerga99/nft-marketplace/main/public/images/small-eth.webp"
                alt="eth"
              />
            </Typography>
          </Box>
          {data.attributes.map((value) => {
            return (
              <Box key={value.value} mr={1}>
                <Typography sx={{ fontWeight: "800" }}>
                  {value.value}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={"bold"}
                >
                  {value["trait_type"]}
                </Typography>
              </Box>
            );
          })}
        </CardActions>
        <Box mt={3}>
          <Button
            variant="contained"
            sx={{ marginRight: 2, textTransform: "capitalize" }}
            size="medium"
          >
            Buy
          </Button>
          <Button
            variant="outlined"
            size="medium"
            sx={{ textTransform: "capitalize" }}
          >
            Preview
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
