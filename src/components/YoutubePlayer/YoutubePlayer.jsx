import React from "react";
import ReactPlayer from "react-player/youtube";

const YoutubePlayer = ({ url, playing = false }) => (
  <ReactPlayer url={url} playing={playing} />
);

export default YoutubePlayer;
