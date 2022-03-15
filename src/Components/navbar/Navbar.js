import React, { useContext, useState } from "react";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import AuthUser from "../context";

const useStyles = makeStyles(() => {
  return {
    nav: {
      backgroundColor: "#FFF",
      color: "#000",
    },
    menu_heading: {
      fontFamily: "Fredoka",
      fontWeight: 500,
    },
    menu_icon: {
      marginRight: 15,
    },
  };
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  backgroundColor: "#EFEFEF",
  opacity: "0.5",
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "16ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

const Navbar = () => {
  const key = "AIzaSyBe4RL8bK1mY1yDJ2C2YNtK4nb7k_sp788";
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const ctx = useContext(AuthUser);

  const searchChangeHandler = (event) => {
    // ctx.setYoutubeSearch(event.target.value);
    setSearch(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    sessionStorage.removeItem("youtubeSearch");
    ctx.setLoading(true);
    ctx.setYoutubeSearch(search.trim());
    // localStorage.setItem("youtubeSearch", search.trim());
    // ctx.setLocation(search);
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${search.trim()}&type=video&key=${key}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
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
        sessionStorage.setItem("youtubeSearch", search.trim());
        ctx.setLoading(false);
      })
      .catch((err) => {});
  };

  return (
    <>
      <AppBar position="static" className={classes.nav} elevation={2}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* <img src="/youtube.png" /> */}
            <Avatar
              src="youtube.png"
              className={classes.menu_icon}
              onClick={() => (
                sessionStorage.setItem("youtubeSearch", ""),
                ctx.setSearchResult("")
                // ctx.setYoutubeSearch(""),
                // setSearch("")
              )}
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              className={classes.menu_heading}
            >
              Youtube Pocket
            </Typography>
            <form onSubmit={submitHandler}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: "#A8A8A8" }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search Youtube…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={searchChangeHandler}
                  value={search}
                  required
                />
              </Search>
            </form>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
