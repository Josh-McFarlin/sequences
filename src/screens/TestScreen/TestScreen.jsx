import React from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { sequences } from "../../utils/sequence";
import { songs, useSong } from "../../utils/music";
import { useIntervalIndex } from "../../utils/timer";
import urls from "../../utils/urls";
import classes from "./TestScreen.module.scss";

const sequenceLength = 4;
const testTime = 2 * 60 * 60; // 2 minutes

const TestScreen = () => {
  const router = useRouter();
  const song = useSong(songs.instrumental[0]);
  // 0 = waiting, 1 = memorization, 2 = recall
  const [stage, setStage] = React.useState(0);
  const [playMemorization, setPlayMemorization] = React.useState(false);
  const [playRecall, setPlayRecall] = React.useState(false);
  const timer = React.useRef(0);

  React.useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  React.useEffect(() => {
    const params = router.query || {};

    const memEnabled = params.mem === "true" || Math.random() < 0.5;
    const recallEnabled = params.recall === "true" || Math.random() < 0.5;

    setPlayMemorization(memEnabled);
    setPlayRecall(recallEnabled);
  }, [router]);

  React.useEffect(() => {
    if (running && playMemorization) {
      song.play();
    } else if (recall && playRecall) {
      song.play();
    } else {
      song.pause();
    }
  }, [stage, playMemorization, playRecall]);

  const handleStart = () => {
    setRunning(true);

    timer.current = setTimeout(() => setStage(2), testTime);
  };

  const handleSubmit = async () => {
    await router.replace(urls.debrief);
  };

  const handleForgot = () => {
    handleRestart();
    setSequence(createSequence(sequenceLength));
    setRecall(false);
  };

  if (stage === 0) {
    return <button onClick={handleStart}>Press When Ready</button>;
  }

  if (stage === 1) {
    return (
      <div className={clsx(classes.root)}>
        {sequences.map((sequence) => (
          <h1 key={sequence}>{sequence}</h1>
        ))}
      </div>
    );
  }

  return (
    <div className={clsx(classes.root)}>
      <h2>Recall</h2>
      <h3>Please type the sequence in the order it appeared.</h3>
      <input inputMode="numeric" />
      <div className={classes.row}>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleForgot}>I Forgot</button>
      </div>
    </div>
  );
};

export default TestScreen;
