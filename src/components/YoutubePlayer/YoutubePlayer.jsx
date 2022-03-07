import React from "react";
import ReactPlayer from "react-player/youtube";
import classes from "./YoutubePlayer.module.scss";

const YoutubePlayer = ({ url, playing = false }) => (
  <ReactPlayer
    className={classes.root}
    url={url}
    playing={playing}
    width={1}
    height={1}
  />
);

export default YoutubePlayer;
