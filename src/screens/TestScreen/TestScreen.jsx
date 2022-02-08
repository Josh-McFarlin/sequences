import React from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { createSequence } from "../../utils/sequence";
import { songs, useSong } from "../../utils/music";
import { useIntervalIndex } from "../../utils/timer";
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
  const song = useSong(songs.instrumental[0]);
  const [playMemorization, setPlayMemorization] = React.useState(
    Math.random() < 0.5
  );
  const [playRecall, setPlayRecall] = React.useState(Math.random() < 0.5);
  const { index, running, handleStart, handleRestart } = useIntervalIndex(
    0,
    sequenceLength - 1,
    1,
    timeBetweenNumbers
  );

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
    if (index >= sequenceLength) {
      setRecall(true);
    }
  }, [index]);

  const handleSubmit = async () => {
    await router.replace(urls.debrief);
  };

  const handleForgot = () => {
    handleRestart();
    setSequence(createSequence(sequenceLength));
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
      {running ? (
        <h1>{sequence[index]}</h1>
      ) : (
        <button onClick={handleStart}>Press When Ready</button>
      )}
    </div>
  );
};

export default TestScreen;
