import React from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { createSequence } from "../../utils/sequence";
import { songs, useSong } from "../../utils/music";
import urls from "../../utils/urls";
import classes from "./TestScreen.module.scss";

const sequenceLength = 4;
const timeBetweenNumbers = 750; // msec

const TestScreen = () => {
  const router = useRouter();
  const [recall, setRecall] = React.useState(false);
  const [sequence, setSequence] = React.useState(
    createSequence(sequenceLength)
  );
  const [seqIndex, setSeqIndex] = React.useState(-1);
  const timer = React.useRef(0);
  const song = useSong(songs.instrumental[0]);
  const [playMemorization, setPlayMemorization] = React.useState(
    Math.random() < 0.5
  );
  const [playRecall, setPlayRecall] = React.useState(Math.random() < 0.5);

  React.useEffect(() => {
    return () => {
      clearInterval(timer.current);
      song.pause();
    };
  }, []);
  

  React.useEffect(() => {
    if (!recall && playMemorization) {
      song.play();
    } else if (recall && playRecall) {
      song.play();
    } else {
      song.pause();
    }
  }, [recall, playMemorization, playRecall]);

  React.useEffect(() => {
    if (seqIndex >= sequenceLength) {
      clearInterval(timer.current);
      setRecall(true);

      if (!playRecall) {
        song.pause();
      }
    }
  }, [seqIndex, playRecall]);

  const handleStart = React.useCallback(() => {
    setSeqIndex(0);

    timer.current = setInterval(
      () => setSeqIndex((prevIndex) => prevIndex + 1),
      timeBetweenNumbers
    );
  }, []);

  const handleSubmit = async () => {
    await router.replace(urls.debrief);
  };

  const handleForgot = () => {
    const newSequence = createSequence(sequenceLength);
    setSequence(newSequence);
    setSeqIndex(-1);
    setRecall(false);
  };

  if (recall) {
    return (
      <div className={clsx(classes.root)}>
        <h2>Recall</h2>
        <h3>Please type the sequence in order</h3>
        <input />
        <div className={classes.row}>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleForgot}>I Forgot</button>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(classes.root)}>
      {seqIndex < 0 ? (
        <button onClick={handleStart}>Press When Ready</button>
      ) : (
        <h1>{sequence[seqIndex]}</h1>
      )}
    </div>
  );
};

export default TestScreen;
