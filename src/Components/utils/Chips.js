import React, { useContext, useState } from "react";
import Chip from "@mui/material/Chip";
import AuthUser from "../context";

const Chips = (props) => {
  const ctx = useContext(AuthUser);
  const key = "AIzaSyBe4RL8bK1mY1yDJ2C2YNtK4nb7k_sp788";

  const handleClick = (category) => {
    sessionStorage.removeItem("youtubeSearch");

    ctx.setLoading(true);
    ctx.setYoutubeSearch(category);
    // ctx.setLocation(search);
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${category}&type=video&key=${key}`
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
        sessionStorage.setItem("youtubeSearch", category);

        ctx.setLoading(false);
      })
      .catch((err) => {});
  };

  return (
    <>
      <Chip
        label={props.category}
        variant="outlined"
        onClick={() => handleClick(props.category)}
      />
    </>
  );
};

export default Chips;
