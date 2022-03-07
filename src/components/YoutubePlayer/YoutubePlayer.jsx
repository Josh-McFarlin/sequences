import React from "react";
import ReactPlayer from "react-player/youtube";

const YoutubePlayer = ({ url, playing = false }) => (
  <ReactPlayer
    url={url}
    playing={playing}
    style={{
      width: 1,
      height: 1,
      position: "absolute",
      bottom: 1,
      right: 1,
    }}
    width={1}
    height={1}
  />
);

export default YoutubePlayer;
