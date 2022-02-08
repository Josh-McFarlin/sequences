import React from "react";

export const songs = {
  instrumental: ["both-of-us-14037.mp3"],
};

export const useSong = (song) => {
  const audio = React.useRef(null);

  React.useEffect(() => {
    if (song == null) {
      audio.current = null;
    } else {
      try {
        audio.current = new Audio("/music/" + song);
      } catch (e) {
        console.error(e);
      }
    }

    return () => {
      if (audio.current) {
        audio.current.pause();
      }
    };
  }, [song]);

  return {
    play: () => {
      if (audio.current) {
        audio.current.play();
      }
    },
    pause: () => {
      if (audio.current) {
        audio.current.pause();
      }
    },
  };
};
