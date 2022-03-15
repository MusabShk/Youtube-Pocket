import { Grid, Toolbar, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Container } from "@mui/material";
import Cards from "../utils/Card";
import { makeStyles } from "@mui/styles";
import AuthUser from "../context";
import SugBar from "../suggestionBar/SugBar";
import Spinner from "../utils/Spinner";
import NotFound from "../not found/NotFound";
import Banner from "../banner/Banner";

const useStyles = makeStyles(() => {
  return {
    nav: {
      backgroundColor: "#000",
      color: "#FFF",
    },
    notfound_text: {
      fontFamily: "Fredoka",
      fontWeight: 300,
    },
    menu_heading: {
      fontFamily: "Fredoka",
      fontWeight: 300,
    },
    menu_icon: {
      marginRight: 15,
    },
  };
});

const Main = () => {
  const classes = useStyles();

  const ctx = useContext(AuthUser);

  return (
    <>
      {ctx.searchResult.length > 0 ? (
        <Container sx={{ marginTop: 5 }}>
          <Grid container spacing={5}>
            {ctx.searchResult.map((result, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Cards
                  vidId={result.vidId}
                  channelName={result.channelName}
                  postTime={result.postTime}
                  title={result.title}
                  thumbnail={result.thumbnail}
                  description={result.description}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : (
        <Container>
          <Grid container justifyContent="center">
            <Grid item>
              <NotFound />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography className={classes.notfound_text}>
                No Videos Found !
              </Typography>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Main;
