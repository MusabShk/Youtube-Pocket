import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const Banner = () => {
  return (
    <Card elevation={0}>
      <CardMedia component="img" alt="green iguana" image="banner.png" />
    </Card>
  );
};

export default Banner;