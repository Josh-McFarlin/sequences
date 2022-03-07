import React from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { sequences } from "../../utils/sequence";
import { songs, useSong } from "../../utils/music";
import YoutubePlayer from "../../components/YoutubePlayer";
import urls from "../../utils/urls";
import classes from "./TestScreen.module.scss";

const sequenceLength = 4;
const testTime = 2 * 60 * 60; // 2 minutes

const TestScreen = () => {
  const router = useRouter();
  const song = useSong(songs.instrumental[0]);
  // 0 = waiting, 1 = memorization, 2 = recall
  const [stage, setStage] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
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

  const handleStart = () => {
    if (playMemorization) {
      setPlaying(true);
    }

    setRunning(true);

    timer.current = setTimeout(() => {
      if (!playRecall) {
        setPlaying(false);
      } else if (!playMemorization) {
        setPlaying(true);
      }

      setStage(2);
    }, testTime);
  };

  const handleSubmit = async () => {
    await router.replace(urls.debrief);
  };

  const handleForgot = () => {
    handleRestart();
    setSequence(createSequence(sequenceLength));
    setRecall(false);
  };

  return (
    <div className={clsx(classes.root)}>
      <YoutubePlayer
        url={"https://www.youtube.com/watch?v=1prweT95Mo0"}
        playing={playing}
      />
      {stage === 0 && (
        <>
          <button onClick={handleStart}>Press When Ready</button>
        </>
      )}
      {stage === 1 && (
        <>
          {sequences.map((sequence) => (
            <h1 key={sequence}>{sequence}</h1>
          ))}
        </>
      )}
      {stage === 2 && (
        <>
          <h2>Recall</h2>
          <h3>Please type the sequence in the order it appeared.</h3>
          <input inputMode="numeric" />
          <div className={classes.row}>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleForgot}>I Forgot</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TestScreen;
