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
import Main from "./Main";

const useStyles = makeStyles(() => {
  return {
    banner_text: {
      fontFamily: "Fredoka",
      fontWeight: 500,
      fontSize: "18px",
      textAlign: "center",
    },
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

const Home = () => {
  const key = "AIzaSyBe4RL8bK1mY1yDJ2C2YNtK4nb7k_sp788";

  const classes = useStyles();
  const ctx = useContext(AuthUser);
  // console.log(ctx.categories);
  // console.log(ctx.searchResult);

  // useEffect(() => {
  //   if (
  //     ctx.youtubeSearch === "" &&
  //     localStorage.getItem("youtubeSearch").length > 0
  //   ) {
  //     // ctx.setLoading(true);
  //     // localStorage.setItem("youtubeSearch", search.trim());
  //     // ctx.setLocation(search);
  //     fetch(
  //       `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${localStorage.getItem(
  //         "youtubeSearch"
  //       )}&type=video&key=${key}`
  //     )
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         console.log(data);
  //         const arr = [];
  //         for (let i = 0; i < data.items.length; i++) {
  //           arr.push({
  //             vidId: data.items[i].id.videoId,
  //             channelName: data.items[i].snippet.channelTitle,
  //             postTime: data.items[i].snippet.publishTime,
  //             title: data.items[i].snippet.title,
  //             thumbnail: data.items[i].snippet.thumbnails.high.url,
  //             description: data.items[i].snippet.description,
  //           });
  //         }
  //         ctx.setSearchResult(arr);
  //         ctx.setLoading(false);
  //         ctx.setYoutubeSearch(localStorage.setItem("youtubeSearch"));
  //       })
  //       .catch((err) => {});
  //   }
  // }, []);

  useEffect(() => {
    if (sessionStorage.getItem("youtubeSearch")) {
      // console.log("1");
      fetch(
        `https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=${key}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          const arr1 = [];
          for (
            let i = Math.floor(Math.random() * (10 - 0 + 1) + 0);
            i < Math.floor(Math.random() * (20 - 11 + 1) + 11);
            i++
          ) {
            arr1.push({
              category: data.items[i].snippet.title,
            });
          }
          // console.log(arr);
          ctx.setCategories(arr1);
          // setLoad(false);
        })
        .catch((err) => {});

      fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${sessionStorage
          .getItem("youtubeSearch")
          .trim()}&type=video&key=${key}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const arr = [];
          for (let i = 0; i < data.items.length; i++) {
            arr.push({
              vidId: data.items[i].id.videoId,
              channelName: data.items[i].snippet.channelTitle,
              postTime: data.items[i].snippet.publishTime,
              title: data.items[i].snippet.title,
              thumbnail: data.items[i].snippet.thumbnails.high.url,
              description: data.items[i].snippet.description,
            });
          }
          ctx.setSearchResult(arr);
          ctx.setLoading(false);
        })
        .catch((err) => {});
    } else {
      // console.log("2");

      fetch(
        `https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=${key}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          const arr1 = [];
          for (
            let i = Math.floor(Math.random() * (10 - 0 + 1) + 0);
            i < Math.floor(Math.random() * (20 - 11 + 1) + 11);
            i++
          ) {
            arr1.push({
              category: data.items[i].snippet.title,
            });
          }
          // console.log(arr);
          ctx.setCategories(arr1);
          ctx.setLoading(false);

          // setLoad(false);
        })
        .catch((err) => {});
    }
  }, []);
  return (
    <>
      {ctx.searchResult.length > 0 && ctx.loading === false ? (
        <>
          <Container>
            <SugBar />
          </Container>
          <Container>
            <Main />
          </Container>
        </>
      ) : (
        <>
          {sessionStorage.getItem("youtubeSearch") ? (
            <>
              {ctx.loading ? (
                <>
                  <Spinner />
                </>
              ) : (
                <>
                  <Container>
                    <SugBar />
                  </Container>
                  <Container>
                    <Main />
                  </Container>
                </>
              )}
            </>
          ) : (
            <>
              {ctx.loading ? (
                <>
                  <Container>
                    <SugBar />
                  </Container>
                  <Spinner />
                </>
              ) : (
                <>
                  <Container>
                    <SugBar />
                  </Container>
                  <Container>
                    <Grid container justifyContent="center">
                      <Grid item>
                        <Banner />
                      </Grid>
                    </Grid>
                    <Grid container justifyContent="center">
                      <Grid item>
                        <Typography className={classes.banner_text}>
                          Enjoy Your YouTube Content Here
                        </Typography>
                      </Grid>
                    </Grid>
                  </Container>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
