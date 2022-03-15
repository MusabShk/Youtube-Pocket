import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { Grid, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import AuthUser from "../context";
import Chips from "../utils/Chips";
import Spinner from "../utils/Spinner";
import Banner from "../banner/Banner";
import Cards from "../utils/Card";

const useStyles = makeStyles(() => {
  return {
    banner_text: {
      fontFamily: "Fredoka",
      fontWeight: 500,
      fontSize: "18px",
      textAlign: "center",
    },
  };
});

const SugBar = () => {
  //   const [load, setLoad] = useState(true);
  const classes = useStyles();

  const ctx = useContext(AuthUser);

  const key = "AIzaSyBe4RL8bK1mY1yDJ2C2YNtK4nb7k_sp788";

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: "#fff", marginTop: "20px" }}
      >
        <Container maxWidth="lg">
          <Grid container justifyContent="center" spacing={2}>
            {ctx.categories.map((cat, index) => (
              <Grid item key={index}>
                <Chips category={cat.category} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </AppBar>
    </>
  );
};

export default SugBar;
